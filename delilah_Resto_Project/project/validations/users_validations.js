require('dotenv').config();

const HttpStatus = require('http-status-codes');
const { Sequelize, QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

//Here we validate if an user exist in the database before a new user signup
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const signupUser = (req, res, next) => {
    const { user_name, email } = req.body;
    const sequelizeInstance = new Sequelize(connectionString);
    const query = "SELECT id FROM users WHERE email = ? OR user_name = ?";
    
    sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements: [email, user_name] })
        .then((users) => {
            if (users.length > 0) {
                return res.status(HttpStatus.CONFLICT).json({ error: "Username or email don't availables, User already exists." });
            }
            next();

        }).catch((error) => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
        }).finally(() => {
            sequelizeInstance.close();
        });
};

//Here we can validate if the body request has all the values different of null
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const valueRequired = (req, res, next) => {
    const { user_name, full_name, email, phone, address, password } = req.body;
    if (!user_name || !full_name || !email || !phone || !address || !password) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "user_name, full_name, email, phone, address and password are required." });
    };
    next();
};

//Here we can validate if an user exist in the database before the login
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const loginUser = (req, res, next) => {
    const { user_name, email, password } = req.body;

    const sequelizeInstance = new Sequelize(connectionString);
    const query = "SELECT id, user_name, full_name, email, phone, address, password, admin FROM users WHERE email = ? OR user_name = ?";

    sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements: [email, user_name] })
        .then((users) => {
            if(users.length <= 0)
            {
                return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'User does not exist.' });
            }

            const dbUser = users[0];

            bcrypt.compare(password, dbUser.password, function(_, result) {
                if(result == false)
                {
                    return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Please verify username or password.' });
                }
                
                req.user = users[0];
                next();
            });            
            
        }).catch((error) => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
        }).finally(() => {
            sequelizeInstance.close();
        });
};

//Here we validate if the user is the manager
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {        
        if(err)
        {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Session expired or User do not have permissions to access.' }); 
        }

        req.user = decoded;
        next();
    });
};

//Here We can validate if a user has manager permissions
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const validateAdministrator = (req, res, next) => {
    const user = req.user;

    if(!user.admin && ["DELETE"].includes(req.method))
    {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: "Request not allowed, you do not have permission." });
    }
    
    next();
};

//Here we can validate if an user exist to be deleted
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const userExist = (req, res, next) => {
    const userId = req.params.id;
    const sequelizeInstance = new Sequelize(connectionString);
    const query = "SELECT id FROM users WHERE id = ?";
    
    sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements: [userId] })
        .then((users) => {
            if (users.length == 0) {
                return res.status(HttpStatus.NOT_FOUND).json("User does not exist");
            } 
            next();

        }).catch((error) => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
        }).finally(() => {
            sequelizeInstance.close();
        });
};

module.exports = { signupUser, loginUser, verifyToken, validateAdministrator, valueRequired, userExist };