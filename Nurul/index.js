import { app } from './app.js';
import { connectToDB } from './db/db.js';

// Jalankan koneksi database
connectToDB()
  .then(() => {
    console.log("Database connected successfully!");

    // Handle error pada server
    app.on('error', (err) => {
      console.error(" Server error:", err);
      process.exit(1);
    });

    // Gunakan port dari .env atau fallback default 5000
    const port = process.env.PORT || 5000;

    // Jalankan server
    app.listen(port, () => {
      const startTime = new Date().toLocaleString();
      console.log(`Server started at ${startTime} on http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });

// Global handler untuk unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  console.error(" Unhandled Promise Rejection:", reason);
  process.exit(1);
});
