# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

gymsense-rn is a React Native SDK library for the XLabs GymSense fitness platform. It provides three components (`Exercise`, `RecordExercise`, `EditExercise`) that wrap a remote web application inside platform-specific WebViews (react-native-webview on iOS/Android, iframe on web) with a postMessage-based bridge for callbacks and native TTS.

## Commands

```bash
yarn                    # Install dependencies (Yarn workspaces, must use yarn not npm)
yarn typecheck          # TypeScript type checking
yarn lint               # ESLint + Prettier
yarn lint --fix         # Auto-fix lint/formatting issues
yarn test               # Run Jest tests
yarn clean              # Delete lib/ build output
yarn prepare            # Build library with react-native-builder-bob
yarn release            # Publish new version via release-it
```

### Example App (Expo)

```bash
yarn example start      # Start Metro bundler
yarn example android    # Run on Android
yarn example ios        # Run on iOS
yarn example web        # Run on Web
```

## Architecture

**Monorepo** using Yarn 3.6.1 workspaces: the library lives at root, the Expo example app in `example/`.

### Core Pattern: WebView Bridge

All three components construct a URL pointing to the GymSense bootstrap endpoint (configured in `src/components/Constants.tsx`) and render it in a WebView. The web app sends structured JSON messages back via `postMessage`, which the native/web WebView wrappers parse and dispatch to React callback props.

### Key Source Files

- **`src/components/Constants.tsx`** — `GYMSENSE_URI` base URL (switch between environments by uncommenting)
- **`src/components/Exercise.tsx`** — Exercise execution component (destination: `exercise`)
- **`src/components/RecordExercise.tsx`** — Create new exercise (destination: `record-exercise`)
- **`src/components/EditExercise.tsx`** — Edit existing exercise (destination: `record-exercise` with `exercise_id` param)
- **`src/components/CrossPlatformWebView/`** — Platform-split WebView:
  - `CrossPlatformWebView.native.tsx` — react-native-webview with TTS polyfill (injects `window.speechSynthesis` JS shim that routes to `expo-speech` via postMessage)
  - `CrossPlatformWebView.web.tsx` — iframe-based, listens to `window.message` events
  - `index.tsx` — Platform.OS-based dynamic require
- **`src/models/GymSenseMessage.tsx`** — TypeScript interfaces for all message types and payloads (SESSION_COMPLETE, SET_COMPLETE, SESSION_CANCELED, EXERCISE_CREATED, EXERCISE_UPDATED, TTS_SPEAK, TTS_STOP, LOG)
- **`src/index.tsx`** — Public API exports (3 components + 4 payload types)

### Build Output

react-native-builder-bob builds to `lib/` with ESM modules and TypeScript declarations (config: `tsconfig.build.json`).

## Conventions

- **Node version**: v22.20.0 (see `.nvmrc`)
- **Commit messages**: Conventional Commits enforced by commitlint (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`)
- **Pre-commit hooks**: Lefthook runs ESLint and TypeScript checks on staged files
- **Formatting**: Prettier via ESLint — single quotes, 2-space indent, trailing commas (es5), no tabs
- **Peer dependencies**: `react`, `react-native`, `expo-speech`
