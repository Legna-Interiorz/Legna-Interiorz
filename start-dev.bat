@echo off
echo =============================================
echo   Legna Interiors — Dev Server
echo =============================================
set "NODE=C:\Users\dayan\AppData\Local\node-portable\node-v22.13.1-win-x64"
set PATH=%NODE%;%PATH%
echo Node: & node --version
echo npm:  & call npm --version
echo.
echo Starting dev server at http://localhost:5173 ...
echo Press Ctrl+C to stop.
echo.
npm run dev
pause
