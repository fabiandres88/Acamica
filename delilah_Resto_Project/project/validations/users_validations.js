const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const jwt = require('jsonwebtoken');

//Here we validate if an user exist in the database before a new user signup
const signupUser = (req, res, next) => {
    const { user_name, email } = req.body;
    const query = "SELECT * FROM users WHERE email= ? OR user_name= ?";
    sequelize.query(query,
        { replacements: [email, user_name] }
    ).then((response) => {
        if (response[0].length > 0) {
            return res.status(409).json({ error: "Username or email don't availables, User already exist" })
        } else {
            return next();
        }
    }).catch((error) => {
        console.error(error);
    });
};

//Here we can validate if the body request has all the values different of null
const valueRequired = (req, res, next) => {
    const { user_name, full_name, email, phone, address, password } = req.body;
    if (!user_name | !full_name | !email | !phone | !address | !password) {
        return res.status(400).json({ error: "This values is required" });
    };
    next();
};

//Here we can validate if an user exist in the database before the login
const loginUser = (req, res, next) => {
    const { user_name, email, password } = req.body;
    const query = "SELECT * FROM users WHERE password= ? AND email= ? OR user_name= ?";
    sequelize.query(query,
        { replacements: [password, email, user_name] }
    ).then((response) => {
        if (response[0].length > 0) {
            return next();
        } else {
            return res.status(409).json({ error: 'Please verify username or password' });
        }
    }).catch((error) => {
        console.error(error);
    });
};

//Here we validate if the user is the manager
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, 'MySecretPassword1988');
        if (verifyToken) {
            req.query.user = verifyToken;
            return next();
        }
    } catch (e) {
        return res.status(409).json({ error: 'Session expired or User dont have permissions to access' })
    }
};

//Here We can validate if a user has manager permissions
const validateAdministrator = (req, res, next) => {
    const { user } = req.query;
    const query = "SELECT * FROM users WHERE user_name=? OR email= ?";
    sequelize.query(query,
        { replacements: [user, user] }
    ).then((response) => {
        const [checking] = response[0].filter(element => {
            if (element.admin === 1) {
                next();
            } else {
                let method = (req.method);
                let met = method.toString();
                if (met == "DELETE") {
                    return res.status(409).json({ Error: "Request did not allow, you do not have permission" });
                } else {
                    return res.status(200).json(response[0]);
                }
            }
        })
    }).catch((error) => {
        console.error(error);
    });
};

module.exports = { signupUser, loginUser, verifyToken, validateAdministrator, valueRequired };