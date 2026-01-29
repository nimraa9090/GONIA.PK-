# Environment Variables Reference

This document lists the required environment variables for each part of the project.

## Backend (`backend/.env`)

*   `PORT`: The port the server will run on (default: 5000).
*   `DATABASE_URL`: Your PostgreSQL connection string.
*   `JWT_SECRET`: A secret key for signing JSON Web Tokens.
*   `ADMIN_EMAIL`: The email address for the admin user.
*   `ADMIN_PASSWORD`: The password for the admin user.

## Web (`web/.env.local`)

*   `NEXT_PUBLIC_API_URL`: The URL of your deployed backend API.

## Mobile (`mobile/.env`)

*   `API_URL`: The URL of your deployed backend API.
*   `WHATSAPP_NUMBER`: The WhatsApp number for customer support.
