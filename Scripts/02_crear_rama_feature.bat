@echo off

cd /d "%~dp0\.."

set /p rama=Nombre del modulo (ej: pacientes, agenda, reportes): 

git checkout develop
git pull origin develop
git checkout -b feature/%rama%

echo.
echo Rama creada: feature/%rama%
pause