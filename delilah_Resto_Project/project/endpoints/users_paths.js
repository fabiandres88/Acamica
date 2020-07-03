//This file contents all paths of the users
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const jwt = require('jsonwebtoken');
const validations = require("../validations/users_validations");
const sign = "MySecretPassword1988";


module.exports = function (app) {
    //Route to get all users only by manager
    app.get("/users", validations.verifyToken, validations.validateAdministrator, (req, res) => {
        const query = "SELECT * FROM users";
        sequelize.query(query,
            { type: sequelize.QueryTypes.SELECT }
        ).then((response) => {
            res.json(response);
        }).catch((error) => {
            console.error(error);
        });
    });

    //Route to users sign up
    app.post("/users", validations.valueRequired, validations.signupUser, (req, res) => {
        const query = "INSERT INTO users (user_name, full_name, email, phone, address, password, admin) VALUES (?,?,?,?,?,?,?)";
        const { user_name, full_name, email, phone, address, password, admin } = req.body;
        sequelize.query(query,
            { replacements: [user_name, full_name, email, phone, address, password, admin] }
        ).then((response) => {
            res.json(response);
        }).catch((error) => {
            console.error(error);
        })
    });

    //Route to users log in
    app.post("/users/login", validations.loginUser, (req, res) => {
        // const sign = "MySecretPassword1988";
        const { user_name, email } = req.body;
        let information = "";
        if (user_name) {
            information = user_name;
        };
        if (email) {
            information = email;
        };
        const token = jwt.sign(information, sign);
        res.json("Token: " + token);
    });

    //Route to update users information
    app.put("/users", validations.verifyToken, (req, res) => {
        const user = req.query.user;
        const { email, phone, address, password } = req.body;
        if (email) {
            const query = "UPDATE users SET email=? WHERE user_name =? OR email=?";
            sequelize.query(query,
                { replacements: [email, user, user] }
            ).then((response) => {
                res.status(200).json("User has been updated");
            }).catch((error) => {
                console.error(error);
            });
        };
        if (phone) {
            const query = "UPDATE users SET phone=? WHERE user_name =? OR email=?";
            sequelize.query(query,
                { replacements: [phone, user, user] }
            ).then((response) => {
                res.status(200).json("User has been updated");
            }).catch((error) => {
                console.error(error);
            });
        };
        if (address) {
            const query = "UPDATE users SET address=? WHERE user_name =? OR email=?";
            sequelize.query(query,
                { replacements: [address, user, user] }
            ).then((response) => {
                res.status(200).json("User has been updated");
            }).catch((error) => {
                console.error(error);
            });
        };
        if (password) {
            const query = "UPDATE users SET password=? WHERE user_name =? OR email=?";
            sequelize.query(query,
                { replacements: [password, user, user] }
            ).then((response) => {
                res.status(200).json("User has been updated");
            }).catch((error) => {
                console.error(error);
            });
        };
    });

    //Route to delete users by id
    app.delete("/users", validations.verifyToken, validations.validateAdministrator, validations.userExist, (req, res) => {
        const query = "DELETE FROM users WHERE id = ?";
        const { id } = req.body;
        sequelize.query(query,
            { replacements: [id] }
        ).then((response) => {
            res.status(200).json("User was deleted successfully");
        }).catch((error) => {
            console.error(error);
        })
    });
};