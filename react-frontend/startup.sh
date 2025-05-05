#!/bin/bash
set -e  # Exit on any error

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Check if yarn is installed
if ! command -v yarn >/dev/null 2>&1; then
    echo "Error: Yarn is not installed"
    exit 1
fi

# Remove package-lock.json if it exists
if [ -f "package-lock.json" ]; then
    echo "Removing package-lock.json..."
    rm package-lock.json
fi

echo "Installing dependencies..."
# First try with frozen lockfile
yarn install --frozen-lockfile || {
    echo "Lockfile out of date, updating dependencies..."
    # If that fails, update the lockfile
    yarn install || {
        echo "Error: Failed to install dependencies"
        exit 1
    }
}

echo "Starting the application..."
yarn run start || {
    echo "Error: Failed to start the application"
    exit 1
}