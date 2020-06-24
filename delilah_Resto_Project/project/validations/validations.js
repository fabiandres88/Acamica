const { response } = require('express');
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");

const loginUser =(req, res, next) =>{    
    const { user_name, email, password } = req.body;                        
    const query = "SELECT * FROM users WHERE password= ? AND email= ? OR user_name= ?";
    sequelize.query(query,
        { replacements: [ password, email, user_name ] }
    ).then((response) => {
        if(response[0].length > 0){
            return next ();;
        }else{
           return res.status(409).json({error: 'Please verify username or password'});
        }                                      
    }).catch((error) => {
        console.error(error);                
    });                   
};

module.exports = { loginUser };