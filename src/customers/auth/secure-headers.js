module.exports = (req,res, next) => {
    var contype = req.headers['content-type'];
    if (!contype || contype != 'application/json') {
        return res.sendStatus(406);
    }
    next();
}