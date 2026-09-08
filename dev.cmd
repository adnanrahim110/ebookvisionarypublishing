@echo off
setlocal
node --preserve-symlinks --preserve-symlinks-main "%~dp0node_modules\next\dist\bin\next" dev "%~dp0." %*
exit /b %ERRORLEVEL%
