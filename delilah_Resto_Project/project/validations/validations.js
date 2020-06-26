// const { response } = require('express');
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");

//Here we validate if an user exist in the database before a new user signup
const signupUser = (req, res, next) => {
    console.log(req.body);
    const { user_name, email } = req.body;
    const query = "SELECT * FROM users WHERE email= ? OR user_name= ?";
    sequelize.query(query,
        { replacements: [email, user_name] }
    ).then((response) => {
        if (response[0].length > 0) {
            return res.status(409).json({ error: "Username or email don't availables, user already exist" })
        } else {
            return next();
        }
    }).catch((error) => {
        console.error(error);
    });    
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
const manageLog= (req, res, next)=>{
    const {user_name, email, password}= req.body;
    const query ="SELECT * FROM users WHERE password= ? AND user_name=? OR email= ?";
    sequelize.query(query,
        { replacements: [password, user_name, email]}
        ).then((response)=>{

        }).catch((error)=>{
            console.error(error);
        });
};
module.exports = {  signupUser, loginUser, manageLog };