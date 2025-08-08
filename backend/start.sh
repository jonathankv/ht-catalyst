#!/bin/bash

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found. Using default configuration."
fi

# Start the FastAPI server with hot reload (use consolidated app)
echo "Starting FastAPI server..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Deactivate virtual environment on exit
if [ -d "venv" ]; then
    deactivate
fi 