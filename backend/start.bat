@echo off
echo Starting FastAPI backend server...

REM Activate virtual environment if it exists
if exist venv\Scripts\activate.bat (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
)

REM Check if .env file exists
if not exist .env (
    echo Warning: .env file not found. Using default configuration.
)

REM Start the FastAPI server with hot reload
echo Starting FastAPI server...
uvicorn main:app --reload --host 0.0.0.0 --port 8000

REM Deactivate virtual environment on exit
if exist venv\Scripts\activate.bat (
    call deactivate
)

pause 