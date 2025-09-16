# Frontend - Image Upload Application

A modern React application built with Vite, Tailwind CSS, and shadcn/ui components for uploading images to a FastAPI backend.

## Environment Setup

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Environment Variables

Create a `.env.local` file in the `frontend/` directory with the following configuration:

```bash
# Backend API URL (adjust if backend runs on different host/port)
VITE_API_BASE_URL=http://localhost:8000
```

If no `VITE_API_BASE_URL` is specified, the app will use relative URLs (assuming frontend and backend are served from the same domain).

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server (usually runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Features

- **File Selection**: Select multiple image files using a styled button
- **File Validation**: Automatic filtering of non-image files with user feedback
- **Upload Progress**: Real-time progress bar during file uploads
- **Success/Error Feedback**: Toast notifications for upload results
- **Responsive Design**: Modern card-based layout that works on all devices
- **Accessibility**: Full keyboard navigation, ARIA labels, and focus states
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   │       ├── button.jsx
│   │       ├── progress.jsx
│   │       └── toaster.jsx
│   ├── lib/
│   │   └── api.js           # API utilities for backend communication
│   ├── pages/
│   │   └── UploadPage.jsx   # Main upload page component
│   ├── App.jsx              # Main app component with routing
│   ├── index.css            # Global styles with Tailwind imports
│   └── main.jsx             # React app entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── vite.config.js           # Vite build configuration
```

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Axios**: HTTP client for API requests
- **React Hot Toast**: Beautiful toast notifications
- **Lucide React**: Modern icon library

## API Integration

The app communicates with a FastAPI backend through the following endpoints:

- **POST /api/upload**: Upload multiple image files
  - Content-Type: `multipart/form-data`
  - Body: Files attached as `files[]`
  - Response: Upload status and file information

## Acceptance Checklist

### Task 1.4.3 - Styling, Accessibility & README

- [x] **Modern, clean page**: Styled with centered card layout using Tailwind + shadcn/ui
  - Centered card container with rounded corners and subtle shadow
  - Proper spacing and typography
  - Responsive design that works on mobile and desktop

- [x] **Keyboard navigation and focus states**: All interactive elements accessible
  - Visible focus rings on all buttons and interactive elements
  - Proper ARIA labels and descriptions
  - Screen reader compatible with semantic HTML
  - Keyboard navigation support

- [x] **Frontend README.md**: Complete documentation included
  - Environment configuration with `VITE_API_BASE_URL`
  - Quick-start commands and installation instructions
  - Project structure and technology stack overview
  - Feature list and acceptance checklist

### Overall Upload Page Features

- [x] `/upload` page exists and is reachable via React Router
- [x] Users can select multiple images with file validation
- [x] Upload progress shown with animated progress bar
- [x] Success/failure feedback via toast notifications
- [x] Duplicate upload prevention during in-flight requests
- [x] Modern UI built with shadcn/ui components and Tailwind CSS
- [x] Fully accessible with proper ARIA labels and keyboard support

## Usage

1. Navigate to `/upload` in your browser
2. Click "Select Images" to choose image files
3. Selected files will be displayed with filenames and sizes
4. Click "Upload Images" to start the upload process
5. Monitor progress via the progress bar
6. Receive success/failure notification via toast

## Notes

- Only image files are accepted (validated by file type)
- Multiple files can be selected and uploaded simultaneously
- Upload progress is tracked and displayed in real-time
- The interface prevents duplicate submissions during active uploads
- Non-image files are automatically filtered with user notification
