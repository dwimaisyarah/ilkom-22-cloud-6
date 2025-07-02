import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Dapatkan __filename dan __dirname dari ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Log informasi path saat file ini dipanggil
console.log(`Current filename: ${__filename}`);
console.log(`Current directory: ${__dirname}`);

// Fungsi utilitas untuk membuat path relatif dari __dirname
const resolvePath = (relativePath) => {
  return join(__dirname, relativePath);
};

// Contoh log pemakaian resolvePath
// console.log(resolvePath('public/images'));

// Ekspor variabel dan fungsi
export { __filename, __dirname, resolvePath };
