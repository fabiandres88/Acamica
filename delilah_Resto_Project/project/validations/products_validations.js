const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const jwt = require('jsonwebtoken');

//This validation allows to show the list of the all products even those who are unavailable only
//if the user is  the managers, and only the available for the normal users
const validateAdministrator = (req, res, next) => {
    const { user } = req.query;
    const query = "SELECT * FROM users WHERE user_name=? OR email=? AND admin=1";
    sequelize.query(query,
        { replacements: [user, user] }
    ).then((response) => {
        console.log(response);
        if (response[0].length === 1) {
            next();
        } else {
            let method = req.method;
            let met = method.toString();
            if (met === "POST" || met === "PUT" || met === "DELETE") {
                return res.status(409).json("Do not authorized");
            } else {
                const query = "SELECT * FROM products WHERE available=?";
                sequelize.query(query,
                    { replacements: ["YES"] }
                ).then((response) => {
                    return res.status(200).json(response[0]);
                }).catch((error) => {
                    console.log(error);
                });
            };
        };
    }).catch((error) => {
        console.error(error);
    });
};

//This validation allows to know if a product exist
//before the manager creates a new product, if it already exists the execution stops
const validateExist = (req, res, next) => {
    const { product_name } = req.body;    
    if (product_name) {
        const query = "SELECT * FROM products WHERE product_name = ?";
        sequelize.query(query,
            { replacements: [product_name] }
        ).then((response) => {
            if (response[0].length === 1) {
                return res.status(409).json("Product already exist");
            } else {
                next();
            }
        }).catch((error) => {
            console.log(erro);
        });
    };
};

//This validation allows to know if a product exist before to be deleted
//or updated by the manager, if it already exist the execution continues
const existToUpdate = (req, res , next) => {
    const { id } = req.query;
    const query = "SELECT * FROM products WHERE id=?";
    sequelize.query(query,
        { replacements: [ id ]}
        ).then((response) => {
            if(response[0].length === 1){
                next();
        }else{
            return res.status(400).json("Product does not exist");
        }
        }).catch((error) => {
            console.log(error);
        });
};

module.exports = { validateAdministrator, validateExist, existToUpdate };