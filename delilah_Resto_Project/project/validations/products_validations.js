const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const jwt = require('jsonwebtoken');

const validateAdministrator = (req, res, next) => {
    const { user } = req.query;
    const query = "SELECT * FROM users WHERE admin=1 AND user_name=? OR email=?";
    sequelize.query(query,
        { replacements: [ user, user ] }
        ).then((response) => {
            console.log(response);
            if(response[0].length === 1){
                next();
            }else{
                return res.status(409).json("Do not have permissions");
            };
        }).catch((error) => {
            console.error(error);
        });
};

module.exports = {validateAdministrator};