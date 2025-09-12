# Python 3.12 Development Container

This project provides a VS Code development container with Python 3.12, Node.js, SQLite, and UV package manager using Microsoft's official Python devcontainer image.

## Features

- **Python 3.12** (Microsoft's official devcontainer image)
- **Node.js** (latest LTS via devcontainer features)
- **SQLite** database (via devcontainer features)
- **UV** package manager for fast Python package management
- **GitHub Copilot** integration
- **Port forwarding** for common development ports (3000, 5173, 8000)

## Architecture

This devcontainer uses:
- **Base Image**: `mcr.microsoft.com/devcontainers/python:1-3.12-bookworm`
- **Features**:
  - Node.js LTS (via `ghcr.io/devcontainers/features/node:1`)
  - SQLite (via `ghcr.io/warrenbuckley/codespace-features/sqlite:1`)
- **Post-Create Setup**: UV package manager installation

## Getting Started

1. Open this project in VS Code
2. Install the "Dev Containers" extension if you haven't already
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and select "Dev Containers: Reopen in Container"
4. Wait for the container to build and start

## Available Tools

### Python Package Management with UV

UV is a fast Python package installer and resolver. Here are some common commands:

```bash
# Install packages
uv pip install package_name

# Install from requirements.txt
uv pip install -r requirements.txt

# Create a virtual environment
uv venv

# Activate virtual environment
source .venv/bin/activate
```

### SQLite

SQLite is pre-installed and ready to use:

```bash
# Open SQLite command line
sqlite3 database.db

# Check SQLite version
sqlite3 --version
```

### Node.js

Node.js and npm are available for frontend development:

```bash
# Check versions
node --version
npm --version

# Install packages
npm install package_name
```

## Port Forwarding

The following ports are automatically forwarded:
- **3000**: Common for React/Next.js development servers
- **5173**: Vite development server default port
- **8000**: Common for Python web servers (Django, FastAPI, etc.)

## VS Code Extensions

The container comes pre-configured with essential development extensions:

### 🤖 AI & Productivity
- **GitHub Copilot**: AI-powered code suggestions and completion

### 🐍 Python Development
- **Python**: Core Python language support and debugging
- **Pylance**: Fast, feature-rich Python language server
- **Black Formatter**: Opinionated Python code formatter
- **isort**: Import statement organizer
- **Flake8**: Python linting and code quality checking

### 🛠️ General Development
- **JSON**: Enhanced JSON language support
- **Tailwind CSS**: CSS framework IntelliSense (useful for web development)

## Configuration Features

### 🔧 Automatic Code Formatting
- **Format on Save**: Enabled
- **Import Organization**: Automatic with isort
- **Black Integration**: Consistent Python code styling

### 🚀 Development Workflow
- **Python Interpreter**: Pre-configured at `/usr/local/bin/python`
- **Linting**: Flake8 enabled for code quality
- **Debugging**: Full debugging support with breakpoints and variable inspection

## Example Usage

Create a simple Python web server:

```python
# app.py
from http.server import HTTPServer, SimpleHTTPRequestHandler

if __name__ == "__main__":
    server = HTTPServer(('0.0.0.0', 8000), SimpleHTTPRequestHandler)
    print("Server running on http://localhost:8000")
    server.serve_forever()
```

Run it:
```bash
python app.py
```

The server will be accessible at `http://localhost:8000` thanks to port forwarding.
