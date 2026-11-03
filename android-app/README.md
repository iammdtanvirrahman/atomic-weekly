# Atomic Weekly — Android

Native Android shell for the existing Atomic Weekly publication. It keeps the current website and Firebase publishing workflow as the single source of editorial content.

## Open in Android Studio
1. Open the `android-app/` directory in Android Studio.
2. Use JDK 17 and install Android SDK 35 when prompted.
3. Let Gradle sync, then run the `app` configuration on an Android device or emulator.

## Current capabilities
- Native Android application entry point and launcher icon
- Full-screen content surface with the existing mobile-first magazine
- Pull-to-refresh
- Android back navigation through web history
- Native article sharing (long-press the page, or call `AtomicNative.share(title, url)` from web content)
- WebView cache and DOM storage for improved repeat visits
- External links opened in the system browser
- HTTPS-only content loading

## Publishing and data
The app loads https://iammdtanvirrahman.github.io/atomic-weekly/. Articles continue to come from the existing Firebase `publishedArticles` feed. Publish and edit content through the existing Atomic Weekly Admin Panel.

## Build
Use Android Studio's **Build > Build Bundle(s) / APK(s) > Build APK(s)**. The debug APK is generated under `app/build/outputs/apk/debug/`.

## Next release work
Add native offline article downloads, FCM push notifications, reader accounts, deep links and a dedicated native article reader. These require the corresponding website integration and Firebase configuration.
