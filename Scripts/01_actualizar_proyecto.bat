@echo off
echo ===================================
echo ACTUALIZANDO PROYECTO DESDE DEVELOP
echo ===================================

cd /d "%~dp0\.."

git checkout develop
git pull origin develop

echo.
echo Proyecto actualizado correctamente
pause