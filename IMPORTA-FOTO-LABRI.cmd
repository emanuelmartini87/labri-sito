@echo off
setlocal
chcp 65001 >nul
title L'Abri - Importazione fotografie definitiva
cd /d "%~dp0"
echo.
echo ===============================================
echo    L'ABRI - FOTOGRAFIE INDIPENDENTI
 echo ===============================================
echo.
echo Cartella: %CD%
echo.
echo Verifica in GitHub Desktop di avere selezionato
 echo emergent-react-prod  oppure emergent-react-test
 echo NON devi essere nel branch main.
echo.
if not exist "package.json" (
  echo ERRORE: questo file deve trovarsi nella radice della cartella labri-sito.
  pause
  exit /b 1
)
if not exist "scripts\download-photos.mjs" (
  echo ERRORE: non trovo lo script originale scripts\download-photos.mjs.
  echo Se hai gia importato le fotografie, controlla con:
  echo node scripts\verify-photos.mjs
  pause
  exit /b 1
)
where node >nul 2>nul
if errorlevel 1 (
  echo ERRORE: Node.js non disponibile. Occorre Node.js 22 installato sul PC.
  pause
  exit /b 1
)
echo.
echo Premi un tasto per scaricare le 20 foto ORIGINALI dal vecchio main.
pause >nul
node scripts\download-photos.mjs
if errorlevel 1 (
  echo.
  echo Download fallito. Nessun file del sito e stato eliminato.
  pause
  exit /b 1
)
echo.
echo Verifica offline delle immagini...
node scripts\verify-photos.mjs
if errorlevel 1 (
  echo.
  echo Verifica fallita. Controlla il messaggio sopra.
  pause
  exit /b 1
)
echo.
echo Le foto sono presenti. Ora si puo eliminare il vecchio script
 echo che scaricava da main. I normali build useranno solo foto locali.
del "scripts\download-photos.mjs"
if exist "scripts\download-photos.mjs" (
  echo ATTENZIONE: non sono riuscito a eliminare il vecchio script.
) else (
  echo Rimosso scripts\download-photos.mjs
)
echo.
echo FATTO! Torna su GitHub Desktop:
echo - vedrai circa 20 fotografie nuove in public\immagini
 echo - commit sul branch corretto e Push origin
 echo - verifica il nuovo deploy Cloudflare
 echo.
pause
exit /b 0
