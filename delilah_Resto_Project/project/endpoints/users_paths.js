require('dotenv').config();

const HttpStatus = require('http-status-codes');
const { Sequelize, QueryTypes, json } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userValidations = require("../validations/users_validations");

/**
 * This file contains all routes (Paths) for users. 
 * @param {Express} app Express application instance.
 */
module.exports = function (app) {    
    const BCRYPT_SALT_ROUNDS = 10;
    const connectionString = `mysql://${process.env.DB_USER}:@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    
    // Route to get all users only by manager
    app.get("/users", userValidations.verifyToken, userValidations.validateAdministrator, (req, res) => {
        const user = req.user;
        const sequelizeInstance = new Sequelize(connectionString);
        let query = "SELECT id, user_name, full_name, email, phone, address, password, admin FROM users";

        if(!user.admin)
        {
            query += " WHERE user_name ='" + user.user_name + "' OR email ='" + user.email + "'";
        }

        sequelizeInstance.query(query, { type: QueryTypes.SELECT })
            .then((users) => {
                res.json(users);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });
    
    app.post("/users", userValidations.valueRequired, userValidations.signupUser, (req, res) => {        
        const { user_name, full_name, email, phone, address, password, admin } = req.body;
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "INSERT INTO users (user_name, full_name, email, phone, address, password, admin) VALUES (?,?,?,?,?,?,?)";        
        
        bcrypt.genSalt(BCRYPT_SALT_ROUNDS, function(_, salt) {
            bcrypt.hash(password, salt, function(_, hashedPassword) {                
                sequelizeInstance.query(query, { replacements: [user_name, full_name, email, phone, address, hashedPassword, (admin || 0)] })
                    .then((response) => {
                        const user_id = response[0];
                        res.status(HttpStatus.CREATED).json({ user_id: user_id });
                    }).catch((error) => {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
                    }).finally(() => {
                        sequelizeInstance.close();
                    });
            });
        });
    });

    //Route to users log in
    app.post("/users/login", userValidations.loginUser, (req, res) => {
        const user = req.user;  
        
        jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 5 }, function(error, encoded) {            
            if(error)
            {                
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }            
            res.status(HttpStatus.OK).json({ "token:": encoded });
        });        
    });

    app.put("/users/changePassword", userValidations.verifyToken, (req, res) => {        
        const user = req.user;
        const { password } = req.body;
        const passwordLength = 3;

        if(password.length <= passwordLength) return res.status(HttpStatus.BAD_REQUEST).json(`Password length must be greater than ${passwordLength}.`);

        bcrypt.genSalt(BCRYPT_SALT_ROUNDS, function(_, salt) {
            bcrypt.hash(password, salt, function(_, hashedPassword) {                
                const sequelizeInstance = new Sequelize(connectionString);
                const query = `UPDATE users SET password = ? WHERE user_name = ? OR email = ?`;

                sequelizeInstance.query(query, { replacements: [hashedPassword, user.user_name, user.email ]})
                    .then((_) => {                        
                        res.status(HttpStatus.OK).json("Password has been updated.");
                    }).catch((error) => {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
                    }).finally(() => {
                        sequelizeInstance.close();
                    });
            });
        });
    });

    //Route to update users information
    app.put("/users", userValidations.verifyToken, (req, res) => {
        const user = req.user;
        const { id, email, phone, address } = req.body;

        if(id > 0 && !user.admin && id != user.id)
        {
            return res.status(HttpStatus.UNAUTHORIZED).json("Insufficient privileges to update users. Please remove id property.");
        }

        if(user.admin && id <= 0)
        {
            return res.status(HttpStatus.BAD_REQUEST).json("id field is required.");
        }

        const user_id = (user.admin) ? id : user.id; // Admin can update users, Normal users can only update its own information.
        const columns = [];

        if(email) columns.push(`email = "${email}"`);
        if(phone) columns.push(`phone = "${phone}"`);
        if(address) columns.push(`address = "${address}"`);        

        if(columns.length == 0) return res.status(HttpStatus.BAD_REQUEST).json("email or phone or address are expected");

        getUser(user_id)
            .then(dbUser => {
                if(!dbUser) return res.status(HttpStatus.NOT_FOUND).json("User does not exist.");

                const sequelizeInstance = new Sequelize(connectionString);
                const query = `UPDATE users SET ${columns.join(",")} WHERE user_name = ? OR email = ?`;
        
                sequelizeInstance.query(query, { replacements: [dbUser.user_name, dbUser.email] })
                    .then((_) => {
                        res.status(HttpStatus.OK).json("User has been updated");
                    }).catch((error) => {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
                    }).finally(() => {
                        sequelizeInstance.close();
                    });
            });
    });

    //Route to delete users by id
    app.delete("/users/:id", userValidations.verifyToken, userValidations.validateAdministrator, userValidations.userExist, (req, res) => {        
        const userId = req.params.id;
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "DELETE FROM users WHERE id = ?";

        sequelizeInstance.query(query, { replacements: [userId] })
            .then((_) => {
                res.status(HttpStatus.OK).json("User was deleted successfully");
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    /**
     * Get an User by Id.
     * @param {Numer} userId 
     */
    function getUser(userId)
    {
        return new Promise((resolve, reject) => {
            const sequelizeInstance = new Sequelize(connectionString);
            const query = "SELECT id, user_name, full_name, email, phone, address, admin FROM users WHERE id = ?"

            sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements: [userId] })
                .then((users) => {
                    resolve(users.find(u => u.id == userId));
                })
                .catch(error => reject(error))
                .finally(() => {
                    sequelizeInstance.close();
                });
        });
    }
};