module.exports = (req, res, next) => {
    res.set("content-type", "application/json")
    next();
}