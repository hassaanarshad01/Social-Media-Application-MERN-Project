@echo off
:: Start MongoDB
start cmd /k "mongod"

:: Start Backend Server
start cmd /k "cd backend && node app.js"

:: Start Frontend Server
start cmd /k "cd frontend && npm start"
