// Middleware autentikasi sederhana

function auth(req, res, next) {
    if (req.headers.authorization === "Bearer secret-token") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = auth;