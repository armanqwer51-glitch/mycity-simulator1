# MyCity Simulator (Electron + Three.js)

This repository contains a lightweight Electron + Three.js project that renders a simple low-poly city and can be packaged into a Windows `.exe` (32-bit) using `electron-packager`.

## Quick local steps

1. Install Node.js (LTS)
2. Clone this repo and `cd` into it
3. Run:
```
npm install
npm start
```
4. To build a Windows 32-bit exe:
```
npm run package:win32:ia32
```

## GitHub Actions
This repo includes a workflow to auto-build a Windows .exe on push to `main` and attach the packaged zip as an artifact.
