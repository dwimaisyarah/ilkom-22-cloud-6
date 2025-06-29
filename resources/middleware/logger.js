// Middleware logger sederhana

function logger(req, res, next) {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
}

// Fungsi untuk mendapatkan IP address client
function getClientIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
}

// Fungsi untuk mencatat header request
function logRequestHeaders(req) {
    console.log('Request Headers:');
    Object.entries(req.headers).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
    });
}

// Fungsi untuk mencatat body request (jika ada)
function logRequestBody(req) {
    if (req.body) {
        try {
            console.log('Request Body:', JSON.stringify(req.body, null, 2));
        } catch (e) {
            console.log('Request Body:', req.body);
        }
    } else {
        console.log('Request Body: <empty>');
    }
}

// Fungsi untuk mencatat query parameter (jika ada)
function logQueryParams(req) {
    if (req.query && Object.keys(req.query).length > 0) {
        console.log('Query Params:', req.query);
    } else {
        console.log('Query Params: <none>');
    }
}

// Fungsi untuk mencatat parameter URL (jika ada)
function logUrlParams(req) {
    if (req.params && Object.keys(req.params).length > 0) {
        console.log('URL Params:', req.params);
    } else {
        console.log('URL Params: <none>');
    }
}

// Fungsi untuk mencatat waktu respons
function logResponseTime(req, res, startTime) {
    const diff = process.hrtime(startTime);
    const ms = diff[0] * 1000 + diff[1] / 1e6;
    console.log(`Response Time: ${ms.toFixed(2)} ms`);
}

// Middleware logger lengkap
function advancedLogger(req, res, next) {
    const startTime = process.hrtime();
    const now = new Date().toISOString();
    const ip = getClientIp(req);

    console.log('='.repeat(60));
    console.log(`[${now}] ${req.method} ${req.url} - IP: ${ip}`);
    logRequestHeaders(req);
    logQueryParams(req);
    logUrlParams(req);

    // Untuk menangkap body, pastikan body-parser sudah digunakan sebelum middleware ini
    logRequestBody(req);

    res.on('finish', () => {
        console.log(`Response Status: ${res.statusCode}`);
        logResponseTime(req, res, startTime);
        console.log('='.repeat(60));
    });

    next();
}

module.exports = advancedLogger;