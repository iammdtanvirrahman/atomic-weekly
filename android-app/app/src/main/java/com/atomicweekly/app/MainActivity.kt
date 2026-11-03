package com.atomicweekly.app

import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : Activity() {
    private lateinit var refresh: SwipeRefreshLayout
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Draw behind system bars, but keep the WebView content inside their safe area.
        // This prevents Android's clock/status icons from overlapping the magazine header.
        androidx.core.view.WindowCompat.setDecorFitsSystemWindows(window, false)
        window.statusBarColor = Color.rgb(5, 5, 5)
        window.navigationBarColor = Color.rgb(5, 5, 5)
        refresh = SwipeRefreshLayout(this).apply {
            setColorSchemeColors(Color.rgb(220, 38, 65))
            setProgressBackgroundColorSchemeColor(Color.rgb(17, 17, 20))
            ViewCompat.setOnApplyWindowInsetsListener(this) { view, insets ->
                val systemBars = insets.getInsets(
                    WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout()
                )
                view.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
                insets
            }
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
                    return if (uri.scheme == "https" && uri.host == "iammdtanvirrahman.github.io") false
                    else { runCatching { startActivity(Intent(Intent.ACTION_VIEW, uri)) }; true }
                }
                override fun onPageFinished(view: WebView?, url: String?) {
                    refresh.isRefreshing = false
                }
            }
            webChromeClient = WebChromeClient()
            addJavascriptInterface(NativeBridge(), "AtomicNative")
        }
        refresh.addView(webView)
        refresh.setOnRefreshListener {
            webView.reload()
        }
        setContentView(refresh)
        ViewCompat.requestApplyInsets(refresh)
        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
        } else {
            webView.loadUrl(HOME_URL)
        }
    }

    private fun shareContent(title: String, url: String) {
        val safeUrl = if (url.startsWith("https://iammdtanvirrahman.github.io/")) url else HOME_URL
        val share = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"; putExtra(Intent.EXTRA_SUBJECT, title); putExtra(Intent.EXTRA_TEXT, safeUrl)
        }
        startActivity(Intent.createChooser(share, "Share Atomic Weekly"))
    }

    inner class NativeBridge {
        @JavascriptInterface fun share(title: String, url: String) {
            runOnUiThread { shareContent(title.ifBlank { "Atomic Weekly" }, url) }
        }
        @JavascriptInterface fun showMessage(message: String) {
            runOnUiThread { Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show() }
        }
    }

    @Deprecated("Deprecated in Android API; retained for consistent back navigation")
    override fun onBackPressed() {
        if (::webView.isInitialized && webView.canGoBack()) webView.goBack()
        else super.onBackPressed()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        webView.saveState(outState); super.onSaveInstanceState(outState)
    }

    override fun onDestroy() {
        if (::webView.isInitialized) { webView.removeJavascriptInterface("AtomicNative"); webView.destroy() }
        super.onDestroy()
    }

    companion object {
        private const val HOME_URL = "https://iammdtanvirrahman.github.io/atomic-weekly/"
    }
}
