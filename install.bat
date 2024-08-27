@echo off

:: Kiểm tra nếu đã cài đặt nvm
where nvm >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing NVM...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe' -OutFile '%TEMP%\nvm-setup.exe'"
    start /wait "" "%TEMP%\nvm-setup.exe"
    del "%TEMP%\nvm-setup.exe"
    set PATH=%PATH%;%USERPROFILE%\AppData\Roaming\nvm
    set PATH=%PATH%;%SYSTEMDRIVE%\Program Files\nodejs
) else (
    echo NVM have been installed.
)

:: Kiểm tra nếu Node.js phiên bản 18 đã được cài đặt và đang sử dụng
nvm ls | findstr /r "\*.*v18.*" >nul
if %errorlevel% neq 0 (
    echo Installing Node.js v18...
    nvm install 18
    nvm use 18
) else (
    echo Node.js v18 have been used.
)

:: Kiểm tra nếu đã cài đặt Truffle
where truffle >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Truffle...
    npm install -g truffle
    echo Truffle have been installed.
) else (
    echo Truffle have been installed.
)

::
npm install -g react-scripts

::
pause
