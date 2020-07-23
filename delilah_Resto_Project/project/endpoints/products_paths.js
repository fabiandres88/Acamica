//This file contents all paths of the products
require('dotenv').config();

const HttpStatus = require('http-status-codes');
const { Sequelize, QueryTypes } = require('sequelize');
const usersValidations = require("../validations/users_validations");
const productsValidations = require("../validations/products_validations");

/**
 * 
 * @param {*} app 
 */
module.exports = function (app) {
    const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;    
    
    app.get("/products/:id", usersValidations.verifyToken, productsValidations.validateAdministrator, (req, res) => {
        const productId = Number(req.params.id);

        if(isNaN(productId))
        {
            return res.status(HttpStatus.BAD_REQUEST).json();
        }

        const query = "SELECT id, name, price, active FROM products WHERE id = ?";
        const sequelizeInstance = new Sequelize(connectionString);
        
        sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements: [productId] })
            .then((products) => {                
                if(products.length <= 0)
                {
                    return res.status(HttpStatus.NOT_FOUND).json();
                } 
                res.status(HttpStatus.OK).json(products.find(p => p.id == productId));

            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    //This path allows to get the list of products
    app.get("/products", usersValidations.verifyToken, productsValidations.validateAdministrator, (req, res) => {
        const query = "SELECT id, name, price, active FROM products";
        const sequelizeInstance = new Sequelize(connectionString);
        
        sequelizeInstance.query(query, { type: QueryTypes.SELECT })
            .then((products) => {                
                res.status(HttpStatus.OK).json(products);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    //This path allows to the manager to add a new product in the menu
    app.post("/products", usersValidations.verifyToken, productsValidations.validateAdministrator, productsValidations.valueRequired, productsValidations.validateExist, (req, res) => {
        const { name, price, active } = req.body;
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "INSERT INTO products (name, price, active) VALUES (?,?,?)";        

        sequelizeInstance.query(query, { replacements: [name, price, active] })
            .then((response) => {
                res.status(HttpStatus.CREATED).json({ product_id: response[0] });
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    //This path allows to the manager to update the price or the availability of the products by id
    app.put("/products",usersValidations.verifyToken, productsValidations.validateAdministrator, 
        productsValidations.existToUpdate, productsValidations.valuesRequiredToUpdate, (req, res) => {

        const { id, name, price, active } = req.body;
        const sequelizeInstance = new Sequelize(connectionString);

        const columns = [];

        if(name) columns.push(`name = "${name}"`);
        if(price) columns.push(`price = ${price}`);
        if(active) columns.push(`active = "${active}"`);        

        const query = `UPDATE products SET ${columns.join(",")} WHERE id = ?`;

        sequelizeInstance.query(query, { replacements: [id] })
            .then((_ => {
                res.status(HttpStatus.OK).json("Product has been updated");
            })).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    //This path allows to the manager to delete a product by "id"
    app.delete("/products/:id", usersValidations.verifyToken, productsValidations.validateAdministrator, productsValidations.existToUpdate, (req, res) => {
        const productId = req.params.id;
        console.log(req.params);     
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "DELETE FROM products WHERE id = ?";

        sequelizeInstance.query(query, { replacements: [productId] })
            .then((_) => {
                res.status(HttpStatus.OK).json("Product was deleted");
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });
};