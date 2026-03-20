@echo off

cd /d "%~dp0\.."

set /p mensaje=Mensaje del commit: 

git add .
git commit -m "%mensaje%"

echo.
echo Commit realizado correctamente
pause