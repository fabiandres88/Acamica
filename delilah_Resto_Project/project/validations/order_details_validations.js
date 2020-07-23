const HttpStatus = require('http-status-codes');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const validateAdministrator = (req, res, next) => {
    const user = req.user;    
    
    if(!user.admin && ["PUT", "DELETE"].includes(req.method))
    {                
        return res.status(HttpStatus.UNAUTHORIZED).json("Insuficient privileges.");
    }

    next();    
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
const valuesRequired = (req, res, next) => {
    const { order_id, products } = req.body;
    
    if(!order_id || !products) 
    {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "order_id and products are required." });
    }

    next();
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const valuesRequiredToUpdate = (req, res, next) => {
    const { id, quantity } = req.body;
    
    if(!id || !quantity) 
    {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "order_detail_id and quantity are required." });
    }
    
    if(isNaN(id))
    {
        return res.status(HttpStatus.BAD_REQUEST).json("order_detail_id must be a number.");
    }

    if(isNaN(quantity))
    {
        return res.status(HttpStatus.BAD_REQUEST).json("quantity must be a number.");
    }

    next();
};

module.exports = { validateAdministrator, valuesRequired, valuesRequiredToUpdate };