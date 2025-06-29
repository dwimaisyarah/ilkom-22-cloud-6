const path = require('path');
const fs = require('fs');

// Konfigurasi aplikasi


const config = {
    appName: "ResourceApp",
    version: "1.0.0",
    author: "Tim Pengembang",
    environment: process.env.NODE_ENV || "development",
    maxItems: 1000,
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || "info",
    database: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || "user",
        password: process.env.DB_PASSWORD || "password",
        name: process.env.DB_NAME || "resourceapp_db"
    },
    jwtSecret: process.env.JWT_SECRET || "supersecretkey",
    session: {
        secret: process.env.SESSION_SECRET || "sessionsecret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    },
    api: {
        prefix: "/api/v1",
        timeout: 30000
    },
    staticFiles: path.join(__dirname, '../public'),
    enableCache: process.env.ENABLE_CACHE === "true",
    cacheTTL: 600,
    allowedOrigins: [
        "http://localhost:3000",
        "https://resourceapp.example.com"
    ],
    featureFlags: {
        enableBeta: false,
        enableLogging: true
    },
    logFile: path.join(__dirname, '../logs/app.log')
};

// Membuat folder logs jika belum ada
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

module.exports = config;