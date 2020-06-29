//This file contents all paths of the project
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const jwt = require('jsonwebtoken');
const validations = require("../validations/validations");

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
        const { user_name, email } = req.body;
        const sing = "MySecretPassword1988";
        let information = "";
        if (user_name) {
            information = user_name;
        }
        if (email) {
            information = email;
        }
        const token = jwt.sign(information, sign);
        res.json("Token: " + token);
    });
    
    //Route to delete users
    app.delete("/users", (req, res) => {
        const query = "DELETE FROM users WHERE id = ?";
        const { id } = req.body;
        sequelize.query(query,
            { replacements: [id] }
        ).then((response) => {
            res.json(response);
        }).catch((error) => {
            console.error(error);
        })
    });
};