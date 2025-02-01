export const Logger = (req, res, next) => {
    const method = req.method;
    const path = req.path;
    const timestamp = new Date().toISOString();
    console.log(`${method} ${path} [${timestamp}]`);
    next();
}