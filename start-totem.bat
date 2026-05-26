@echo off
title AVAL Tech Week — Totem

echo.
echo  Iniciando AVAL Tech Week Totem...
echo.

:: 1. Inicia el servidor CDP en segundo plano (ventana minimizada)
start "CDP Server" /min node "%~dp0cdp-server.mjs"
timeout /t 1 /nobreak >nul

:: 2. Lanza Chrome en modo kiosco con debugging activo
::    Cambia la URL por tu dominio de Netlify despues del deploy
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" ^
  --remote-debugging-port=9222 ^
  --user-data-dir=%TEMP%\chrome-totem-debug ^
  --no-first-run ^
  --kiosk https://REEMPLAZA-CON-TU-SITIO.netlify.app

echo  Totem en marcha. Cierra esta ventana cuando termines.
