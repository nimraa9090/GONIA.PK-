# Deployment Guide for Goniaa Fashion

This guide provides instructions for deploying the backend, web, and mobile applications.

## Backend (Render / Railway)

1.  **Create a new PostgreSQL database.**
2.  **Set up a new Web Service on Render or a project on Railway.**
3.  **Connect your GitHub repository.**
4.  **Add the environment variables** from `environmentvariable.md`.
5.  **Build Command:** `cd backend && npm install && npm run build`
6.  **Start Command:** `cd backend && npm start`

## Web (Vercel)

1.  **Create a new project on Vercel.**
2.  **Connect your GitHub repository.**
3.  **Set the Root Directory** to `web`.
4.  **Add the environment variables** from `environmentvariable.md`.
5.  Vercel will automatically detect the Next.js project and deploy it.

## Mobile (Expo / EAS)

1.  **Install EAS CLI:** `npm install -g eas-cli`
2.  **Login to your Expo account:** `eas login`
3.  **Configure your project:** `eas build:configure`
4.  **Build for Android:** `eas build --platform android --profile preview`
5.  **Build for iOS:** `eas build --platform ios --profile preview`
