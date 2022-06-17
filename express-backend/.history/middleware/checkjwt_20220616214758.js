const jwt = require('jsonwebtoken');

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['auth']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, "@SK", (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}