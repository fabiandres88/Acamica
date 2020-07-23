const HttpStatus = require('http-status-codes');

//This validation allows to show the list of the all products even those who are unavailable only
//if the user is the managers, and only the available for the normal users
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
    const { user_id, payment_method_id, order_status_id } = req.body;
    
    if(!user_id || !payment_method_id || !order_status_id) 
    {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "user_id, payment_method_id and order_status_id are required." });
    }

    next();
};

module.exports = { validateAdministrator, valuesRequired };