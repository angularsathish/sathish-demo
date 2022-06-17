const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.auth;

    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, "@SK", (err, user) => {
            if (err) {
                console.log('err', err)
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {authenticateJWT}