# Atomic Weekly — Android

A standalone Android Studio project for the Atomic Weekly magazine. The app reuses the existing mobile-first editorial site and Firebase publishing feed, so the website and Android app stay on one publishing source.

## Open in Android Studio
1. Open the `android-app/` directory in Android Studio.
2. Use JDK 17 and install Android SDK 35 when prompted.
3. Let Gradle sync, then run the `app` configuration on an Android device or emulator.

## Included in v1
- Native Android launcher app with custom Atomic icon and dark system bars
- Existing magazine homepage, category navigation, mobile navigation and built-in article reader
- Pull-to-refresh
- Android back navigation through web history
- Native Android Sharesheet wired to the magazine reader's Web Share action
- WebView DOM storage and normal HTTP cache for repeat visits
- HTTPS-only first-party page navigation; external links open in the system browser
- Basic offline detection and cached-content fallback where the WebView has a cached copy

## Publishing and data
The app loads https://iammdtanvirrahman.github.io/atomic-weekly/. Articles continue to come from the existing Firebase `publishedArticles` feed. Publish and edit content through the existing Atomic Weekly Admin Panel.

## Build
In Android Studio choose **Build > Build Bundle(s) / APK(s) > Build APK(s)**. The debug APK is generated under `app/build/outputs/apk/debug/`.

A GitHub Actions workflow also builds the debug APK on pushes and pull requests that touch `android-app/**`.

## Planned follow-up
- Dedicated offline article downloads and a saved-articles library (not yet implemented)
- Firebase Cloud Messaging push notifications (requires the project's Android Firebase app registration and `google-services.json`)
- Native reader enhancements and deep links
- Signed release APK / Android App Bundle for Play Store
