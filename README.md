Machine Test

# API Test Collection

Attached Thunder Client API Test Collection: Nadsoft-Company-Test.json

# Environment Configuration

Add your PostgreSQL database configuration to the .env file.

Backend .env File Example
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port
Backend Setup
Navigate to the backend directory:

# Backend

cd backend
Install dependencies:

npm install
Start the application:

npm start
All logic related to controllers, routes, and the database is in the src folder.

# Database Script

The database script automatically runs when the server starts. The script is located at:

cd src/model/script.js

# Frontend Setup

Navigate to the frontend directory:

cd frontend
Install dependencies:

npm install
Start the application:

npm run start
Components related to student data and the form are located in the src/components directory.
