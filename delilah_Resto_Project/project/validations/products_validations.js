require('dotenv').config();

const HttpStatus = require('http-status-codes');
const { Sequelize, QueryTypes } = require('sequelize');
const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

//This validation allows to show the list of the all products even those who are unavailable only
//if the user is  the managers, and only the available for the normal users
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const validateAdministrator = (req, res, next) => {
    const user = req.user;

    if(!user.admin)
    {        
        if (["POST", "PUT", "DELETE"].includes(req.method)) 
        {            
            return res.status(HttpStatus.UNAUTHORIZED).json("Insufficient privileges.");
        }
    }

    next();
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const valueRequired = (req, res, next) => {
    const { name, price, active } = req.body;
    if (!name || !price || !active) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "name, price and active are required." });
    };
    next();
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const valuesRequiredToUpdate = (req, res, next) => {
    const { price, active } = req.body;
    if (!price || !active) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "price and active are required." });
    };
    next();
}

//This validation allows to know if a product exist
//before the manager creates a new product, if it already exists the execution stops
/**
 * 
 */
const validateExist = (req, res, next) => {
    const { name } = req.body;

    if (name) 
    {
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "SELECT id, name, price, active FROM products WHERE name = ?";

        sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements: [name] })
            .then((products) => {
                if (products.length === 1) 
                {
                    return res.status(HttpStatus.CONFLICT).json("Product already exist");
                }
                next();

            }).catch((error) => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    };
};

//This validation allows to know if a product exist before to be deleted
//or updated by the manager, if it already exist the execution continues
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const existToUpdate = (req, res , next) => {
    const product_id = req.params.id || req.body.id;
    const sequelizeInstance = new Sequelize(connectionString);
    const query = "SELECT id, name, price, active FROM products WHERE id = ?";
    
    sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements: [ product_id ]})
        .then((products) => {
            console.log(products);
            if(products.length <= 0)
            {
                return res.status(HttpStatus.BAD_REQUEST).json("Product does not exist");
            }
            next();
            
        }).catch((error) => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
        }).finally(() => {
            sequelizeInstance.close();
        });
};

module.exports = { validateAdministrator, valueRequired, valuesRequiredToUpdate, validateExist, existToUpdate };