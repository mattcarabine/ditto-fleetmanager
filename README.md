# Ditto Task Manager

A real-time task management application built with React, Vite, TypeScript, and Ditto SDK.

## Features

- Real-time task synchronization across devices
- Add, toggle, and delete tasks
- Clean and modern UI
- TypeScript for type safety
- Zustand for state management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Ditto account and credentials

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Ditto:
   - Open `src/config/ditto.ts`
   - Replace `YOUR_APP_ID` and `YOUR_TOKEN` with your actual Ditto credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── config/
│   └── ditto.ts         # Ditto configuration and initialization
├── services/
│   └── dittoService.ts  # Ditto subscriptions and observers
├── store/
│   └── taskStore.ts     # Zustand store for task management
├── App.tsx             # Main application component
└── App.css             # Application styles
```

## Usage

1. Add a new task by typing in the input field and clicking "Add Task"
2. Toggle task completion by clicking the checkbox
3. Delete a task by clicking the "Delete" button
4. Changes will automatically sync across all connected devices

## Development

- The application uses Vite for fast development and building
- TypeScript is configured for type safety
- Zustand is used for state management
- Ditto SDK is integrated for real-time synchronization

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.
