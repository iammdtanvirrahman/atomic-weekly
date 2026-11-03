package com.atomicweekly.app

import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

class MainActivity : Activity() {
    private lateinit var refresh: SwipeRefreshLayout
    private lateinit var webView: WebView
    private var lastUrl = HOME_URL

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = Color.rgb(5, 5, 5)
        window.navigationBarColor = Color.rgb(5, 5, 5)

        refresh = SwipeRefreshLayout(this).apply {
            setColorSchemeColors(Color.rgb(220, 38, 65))
            setProgressBackgroundColorSchemeColor(Color.rgb(17, 17, 20))
        }

        webView = WebView(this).apply {
            setBackgroundColor(Color.rgb(5, 5, 5))
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.databaseEnabled = true
            settings.cacheMode = WebSettings.LOAD_DEFAULT
            settings.loadsImagesAutomatically = true
            settings.mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            settings.javaScriptCanOpenWindowsAutomatically = false
            settings.setSupportMultipleWindows(false)
            settings.mediaPlaybackRequiresUserGesture = true
            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    val uri = request.url
                    return if (uri.scheme == "https" && uri.host == "iammdtanvirrahman.github.io") {
                        false
                    } else {
                        runCatching { startActivity(Intent(Intent.ACTION_VIEW, uri)) }
                        true
                    }
                }

                override fun onPageStarted(view: WebView?, url: String?, favicon: android.graphics.Bitmap?) {
                    if (url != null) lastUrl = url
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    refresh.isRefreshing = false
                    installNativeShareBridge()
                }
            }
            webChromeClient = WebChromeClient()
            addJavascriptInterface(NativeBridge(), "AtomicNative")
            setOnLongClickListener {
                sharePage()
                true
            }
        }

        refresh.addView(webView)
        refresh.setOnRefreshListener { webView.reload() }
        setContentView(refresh)

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
        } else {
            webView.loadUrl(HOME_URL)
            if (!isOnline()) {
                Toast.makeText(this, "Offline mode: showing cached magazine content when available", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun isOnline(): Boolean {
        val manager = getSystemService(ConnectivityManager::class.java)
        val network = manager.activeNetwork ?: return false
        val capabilities = manager.getNetworkCapabilities(network) ?: return false
        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    private fun installNativeShareBridge() {
        // Web Share is not consistently exposed by Android WebView. Route the site's
        // existing reader share action to Android's native Sharesheet instead.
        val script = """
            (function() {
              if (window.__atomicNativeShareInstalled) return;
              window.__atomicNativeShareInstalled = true;
              try {
                Object.defineProperty(navigator, 'share', {
                  configurable: true,
                  value: function(data) {
                    var payload = data || {};
                    window.AtomicNative.share(
                      String(payload.title || document.title || 'Atomic Weekly'),
                      String(payload.url || window.location.href)
                    );
                    return Promise.resolve();
                  }
                });
              } catch (e) {}
            })();
        """.trimIndent()
        webView.evaluateJavascript(script, null)
    }

    private fun sharePage() {
        shareContent(webView.title ?: "Atomic Weekly", lastUrl)
    }

    private fun shareContent(title: String, url: String) {
        val share = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_SUBJECT, title)
            putExtra(Intent.EXTRA_TEXT, url)
        }
        startActivity(Intent.createChooser(share, "Share Atomic Weekly"))
    }

    inner class NativeBridge {
        @JavascriptInterface
        fun share(title: String, url: String) {
            runOnUiThread {
                val safeUrl = if (url.startsWith("https://iammdtanvirrahman.github.io/")) url else HOME_URL
                shareContent(title.ifBlank { "Atomic Weekly" }, safeUrl)
            }
        }

        @JavascriptInterface
        fun showMessage(message: String) {
            runOnUiThread { Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show() }
        }
    }

    @Deprecated("Deprecated in Android API; retained for consistent back navigation")
    override fun onBackPressed() {
        if (::webView.isInitialized && webView.canGoBack()) webView.goBack() else super.onBackPressed()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        webView.saveState(outState)
        super.onSaveInstanceState(outState)
    }

    override fun onDestroy() {
        if (::webView.isInitialized) {
            webView.removeJavascriptInterface("AtomicNative")
            webView.destroy()
        }
        super.onDestroy()
    }

    companion object {
        private const val HOME_URL = "https://iammdtanvirrahman.github.io/atomic-weekly/"
    }
}
