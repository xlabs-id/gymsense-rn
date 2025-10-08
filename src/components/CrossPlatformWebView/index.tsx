// src/components/CrossPlatformWebView/index.tsx
import { Platform } from 'react-native';

let CrossPlatformWebView: any;

if (Platform.OS === 'web') {
    CrossPlatformWebView = require('./CrossPlatformWebView.web').default;
} else {
    CrossPlatformWebView = require('./CrossPlatformWebView.native').default;
}

export default CrossPlatformWebView;
