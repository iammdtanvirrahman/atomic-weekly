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
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : Activity() {
    private lateinit var refresh: SwipeRefreshLayout
    private lateinit var webView: WebView
    private var lastUrl = HOME_URL
    private var showingOfflineArticle = false

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
                    return if (uri.scheme == "https" && uri.host == "iammdtanvirrahman.github.io") false
                    else { runCatching { startActivity(Intent(Intent.ACTION_VIEW, uri)) }; true }
                }
                override fun onPageStarted(view: WebView?, url: String?, favicon: android.graphics.Bitmap?) {
                    if (url != null && !showingOfflineArticle) lastUrl = url
                }
                override fun onPageFinished(view: WebView?, url: String?) {
                    refresh.isRefreshing = false
                    if (!showingOfflineArticle) installNativeBridgeUi()
                }
            }
            webChromeClient = WebChromeClient()
            addJavascriptInterface(NativeBridge(), "AtomicNative")
        }
        refresh.addView(webView)
        refresh.setOnRefreshListener {
            if (showingOfflineArticle) refresh.isRefreshing = false else webView.reload()
        }
        setContentView(refresh)
        if (savedInstanceState != null) {
            showingOfflineArticle = savedInstanceState.getBoolean(STATE_OFFLINE, false)
            webView.restoreState(savedInstanceState)
        } else {
            webView.loadUrl(HOME_URL)
            if (!isOnline()) Toast.makeText(this, "Your saved stories are available offline", Toast.LENGTH_LONG).show()
        }
    }

    private fun isOnline(): Boolean {
        val manager = getSystemService(ConnectivityManager::class.java)
        val network = manager.activeNetwork ?: return false
        val caps = manager.getNetworkCapabilities(network) ?: return false
        return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    private fun installNativeBridgeUi() {
        val script = """
          (function() {
            if (window.__atomicNativeUiInstalled) return;
            window.__atomicNativeUiInstalled = true;
            var saved = document.createElement('button');
            saved.type = 'button'; saved.textContent = '▣ Saved';
            saved.setAttribute('aria-label','Open saved offline stories');
            saved.style.cssText = 'position:fixed;z-index:99999;right:14px;bottom:calc(82px + env(safe-area-inset-bottom));padding:11px 15px;border:1px solid rgba(240,68,82,.65);border-radius:24px;background:#17131a;color:#fff;font:600 12px system-ui;box-shadow:0 6px 24px #0008';
            saved.onclick = function(){ window.AtomicNative.showSavedArticles(); };
            document.body.appendChild(saved);
            function addSaveButton() {
              var actions = document.querySelector('.reader-actions');
              if (!actions || document.getElementById('atomicNativeSave')) return;
              var button = document.createElement('button');
              button.id = 'atomicNativeSave'; button.type = 'button';
              button.className = 'pill-btn'; button.textContent = '＋ Save offline';
              button.onclick = function() {
                var heading = document.querySelector('#readerContent h1');
                var copy = document.querySelector('#readerContent .article-copy');
                var cover = document.querySelector('#readerContent .reader-cover');
                if (!heading || !copy) return;
                var match = location.hash.match(/^#read\/(.+)$/);
                var id = match ? decodeURIComponent(match[1]) : heading.textContent;
                window.AtomicNative.saveArticle(id, heading.textContent, copy.innerHTML, cover ? cover.src : '', location.href);
                button.textContent = '✓ Saved offline';
              };
              actions.insertBefore(button, actions.firstChild);
            }
            new MutationObserver(addSaveButton).observe(document.body,{childList:true,subtree:true});
            addSaveButton();
          })();
        """.trimIndent()
        webView.evaluateJavascript(script, null)
    }

    private fun savedStore(): JSONArray {
        val raw = getSharedPreferences(PREFS, MODE_PRIVATE).getString(KEY_SAVED, "[]") ?: "[]"
        return runCatching { JSONArray(raw) }.getOrElse { JSONArray() }
    }

    private fun saveArticle(id: String, title: String, html: String, cover: String, url: String) {
        val items = savedStore()
        val key = id.ifBlank { title }
        val saved = JSONObject().apply {
            put("id", key); put("title", title); put("html", html)
            put("cover", if (cover.startsWith("https://")) cover else "")
            put("url", if (url.startsWith("https://iammdtanvirrahman.github.io/")) url else HOME_URL)
        }
        val next = JSONArray()
        for (i in 0 until items.length()) {
            val item = items.optJSONObject(i) ?: continue
            if (item.optString("id") != key) next.put(item)
        }
        next.put(saved)
        getSharedPreferences(PREFS, MODE_PRIVATE).edit().putString(KEY_SAVED, next.toString()).apply()
        Toast.makeText(this, "Saved for offline reading", Toast.LENGTH_SHORT).show()
    }

    private fun showSavedArticles() {
        val items = savedStore()
        if (items.length() == 0) {
            android.app.AlertDialog.Builder(this).setTitle("Saved stories")
                .setMessage("No saved stories yet. Open an article and tap Save offline.")
                .setPositiveButton("OK", null).show()
            return
        }
        val titles = Array(items.length()) { i -> items.optJSONObject(i)?.optString("title", "Untitled story") ?: "Untitled story" }
        android.app.AlertDialog.Builder(this).setTitle("Saved stories (" + items.length() + ")")
            .setAdapter(ArrayAdapter(this, android.R.layout.simple_list_item_1, titles)) { _, which ->
                val item = items.optJSONObject(which) ?: return@setAdapter
                openOfflineArticle(item)
            }
            .setNegativeButton("Close", null)
            .setNeutralButton("Manage") { _, _ -> manageSavedArticles() }
            .show()
    }

    private fun manageSavedArticles() {
        val items = savedStore()
        if (items.length() == 0) return
        val titles = Array(items.length()) { i -> items.optJSONObject(i)?.optString("title", "Untitled story") ?: "Untitled story" }
        android.app.AlertDialog.Builder(this).setTitle("Remove saved story")
            .setItems(titles) { _, which ->
                val next = JSONArray()
                for (i in 0 until items.length()) if (i != which) next.put(items.getJSONObject(i))
                getSharedPreferences(PREFS, MODE_PRIVATE).edit().putString(KEY_SAVED, next.toString()).apply()
                Toast.makeText(this, "Story removed", Toast.LENGTH_SHORT).show()
            }.setNegativeButton("Cancel", null).show()
    }

    private fun openOfflineArticle(item: JSONObject) {
        val title = escapeForHtml(item.optString("title", "Saved story"))
        val html = item.optString("html", "")
        val cover = item.optString("cover", "")
        val image = if (cover.isNotBlank()) "<img src=\"" + escapeForHtml(cover) + "\" alt=\"\">" else ""
        val page = """
          <!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
          <meta name="color-scheme" content="dark"><style>
          *{box-sizing:border-box}body{margin:0;padding:20px 22px 60px;background:#08090d;color:#f4f0ed;font:16px/1.85 system-ui;max-width:760px;margin:auto}
          .top{position:sticky;top:0;background:#08090dee;padding:12px 0;border-bottom:1px solid #333;display:flex;justify-content:space-between;align-items:center}
          button{background:#24141b;color:#fff;border:1px solid #e32645;border-radius:22px;padding:9px 13px}
          h1{font:600 36px/1.12 Georgia,serif;letter-spacing:-1px;margin:32px 0 18px}img{max-width:100%;height:auto;border-radius:14px}
          .copy img{max-width:100%;height:auto}.copy a{color:#ff6879}.copy blockquote{border-left:2px solid #e32645;padding-left:16px;color:#ccc}
          .label{color:#f04452;font-size:11px;letter-spacing:2px;text-transform:uppercase}
          </style></head><body><div class="top"><span class="label">ATOMIC WEEKLY · OFFLINE</span><button onclick="AtomicNative.backToMagazine()">← Magazine</button></div>
          <h1>TITLE_PLACEHOLDER</h1>COVER_PLACEHOLDER<div class="copy">CONTENT_PLACEHOLDER</div></body></html>
        """.trimIndent().replace("TITLE_PLACEHOLDER", title).replace("COVER_PLACEHOLDER", image).replace("CONTENT_PLACEHOLDER", html)
        showingOfflineArticle = true
        webView.loadDataWithBaseURL(HOME_URL, page, "text/html", "UTF-8", null)
    }

    private fun escapeForHtml(value: String): String =
        value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;")

    private fun shareContent(title: String, url: String) {
        val safeUrl = if (url.startsWith("https://iammdtanvirrahman.github.io/")) url else HOME_URL
        val share = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"; putExtra(Intent.EXTRA_SUBJECT, title); putExtra(Intent.EXTRA_TEXT, safeUrl)
        }
        startActivity(Intent.createChooser(share, "Share Atomic Weekly"))
    }

    inner class NativeBridge {
        @JavascriptInterface fun saveArticle(id: String, title: String, html: String, cover: String, url: String) {
            runOnUiThread { saveArticle(id, title, html, cover, url) }
        }
        @JavascriptInterface fun showSavedArticles() { runOnUiThread { showSavedArticles() } }
        @JavascriptInterface fun backToMagazine() {
            runOnUiThread { showingOfflineArticle = false; webView.loadUrl(lastUrl.ifBlank { HOME_URL }) }
        }
        @JavascriptInterface fun share(title: String, url: String) {
            runOnUiThread { shareContent(title.ifBlank { "Atomic Weekly" }, url) }
        }
        @JavascriptInterface fun showMessage(message: String) {
            runOnUiThread { Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show() }
        }
    }

    @Deprecated("Deprecated in Android API; retained for consistent back navigation")
    override fun onBackPressed() {
        if (showingOfflineArticle) {
            showingOfflineArticle = false; webView.loadUrl(lastUrl.ifBlank { HOME_URL })
        } else if (::webView.isInitialized && webView.canGoBack()) webView.goBack()
        else super.onBackPressed()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        outState.putBoolean(STATE_OFFLINE, showingOfflineArticle)
        webView.saveState(outState); super.onSaveInstanceState(outState)
    }

    override fun onDestroy() {
        if (::webView.isInitialized) { webView.removeJavascriptInterface("AtomicNative"); webView.destroy() }
        super.onDestroy()
    }

    companion object {
        private const val HOME_URL = "https://iammdtanvirrahman.github.io/atomic-weekly/"
        private const val PREFS = "atomic_weekly_reader"
        private const val KEY_SAVED = "saved_articles"
        private const val STATE_OFFLINE = "showing_offline_article"
    }
}
