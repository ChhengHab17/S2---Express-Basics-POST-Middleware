export const logger = (req, res, next) => {
    const {method, url} = req;
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}] ${method} ${url}`, req.query);
    next();
}