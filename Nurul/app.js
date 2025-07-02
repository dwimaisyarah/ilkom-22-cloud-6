import { __dirname } from '../root.js';
import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

// Static files
app.use('/static', express.static(join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// HTTP request logger
app.use(morgan('dev'));

// Log waktu request masuk
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'src', 'views'));

// Routes
import { rootRouter } from './routes/root.routes.js';
import { userRouter } from './routes/user.routes.js';

app.use('/', rootRouter);
app.use('/user', userRouter);

// 404 Not Found handler
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(" An error occurred:", err.message);
  res.status(500).render('error', { message: 'Internal server error' });
});

export { app };
