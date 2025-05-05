#!/bin/bash
# Prototype startup script for Flask backend

set -e  # Exit on any error

echo "Setting up Python environment..."
# Create virtual environment if it doesn't exist
python3 -m venv env || {
    echo "Error: Failed to create virtual environment"
    exit 1
}

# Activate virtual environment
source env/bin/activate || {
    echo "Error: Failed to activate virtual environment"
    exit 1
}

# Set Python version
echo "Setting Python version..."
pyenv local 3.13.3 || {
    echo "Error: Failed to set Python version"
    exit 1
}

# Install dependencies
echo "Installing dependencies..."
pip install --upgrade -r requirements.txt || {
    echo "Error: Failed to install dependencies"
    exit 1
}

# Start Flask app with Gunicorn
echo "Starting Flask application with Gunicorn..."
gunicorn --bind 0.0.0.0:5000 \
         --workers 1 \
         --timeout 120 \
         --preload \
         --log-level info \
         index:app 