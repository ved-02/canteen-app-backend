const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const { token } = req.body;
        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                res.json({ error: "authentication failed" });
            }
            else {
                res.email = decoded.email;
                console.log(res.email);
                next();
            }
        });
    } catch (error) {
        res.json({ error: "unexpected error occured" });
    }
}
module.exports = auth;