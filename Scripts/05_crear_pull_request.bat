@echo off

cd /d "%~dp0\.."

set /p titulo=Titulo del PR: 
set /p descripcion=Descripcion del cambio: 

gh pr create --base develop --head HEAD --title "%titulo%" --body "%descripcion%"

echo.
echo Pull Request creado correctamente
pause