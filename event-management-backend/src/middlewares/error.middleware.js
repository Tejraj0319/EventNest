const errorMiddleware = (err, req, res, next) => {
    const message = err.message || err?.error?.message || "Internal Server Error";
    const name = err.name || err?.error?.name || "Error";
    const statusCode = err.statusCode || err?.error?.http_code || 500;

    console.error("\n========== ERROR START ==========");
    console.error("Time:", new Date().toISOString());
    console.error("Route:", req.method, req.originalUrl);
    console.error("Message:", message);
    console.error("Name:", name);
    console.error("Status:", statusCode);

    if (err.error) {
        console.error("Nested Error:", JSON.stringify(err.error, null, 2));
    }

    if (err.stack) {
        console.error("Stack:");
        console.error(err.stack);
    }

    console.error("=========== ERROR END ===========\n");

    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = errorMiddleware;