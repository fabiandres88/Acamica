//This file contents all paths of the products
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const jwt = require('jsonwebtoken');
const usersValidations= require("../validations/users_validations");
const productsValidations = require("../validations/products_validations");

module.exports = function (app) {

    //This path allows to get the list of products
    app.get("/products", usersValidations.verifyToken, productsValidations.validateAdministrator, (req, res) => {
        const query = "SELECT * FROM products";
        sequelize.query(query,
            { type: sequelize.QueryTypes.SELECT }
        ).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            console.error(error);
        })
    });

    //This path allows to the manager to add a new product in the menu
    app.post("/products", (req, res) => {
        const query = "INSERT INTO products (product_name, price, available) VALUES (?,?,?)";
        const { product_name, price, available } = req.body;
        sequelize.query(query,
            { replacements: [product_name, price, available] }
        ).then((response) => {
            res.json(response);
        }).catch((error) => {
            console.error(error);
        })
    });

    //This path allows to the manager to update the price or the availability of the products
    app.put("/products", (req, res) => {
        const { id } = req.query;
        const { price, available } = req.body;
        if (price) {
            const query = "UPDATE products SET price = ? WHERE id = ?";
            sequelize.query(query,
                { replacements: [price, id] }
            ).then((response => {
                res.status(200).json("Product has been updated");
            })).catch((error) => {
                console.error(error);
            });
        };
        if (available) {
            const query = "UPDATE products SET available = ? WHERE id = ?"
            sequelize.query(query,
                { replacements: [available, id] }
            ).then((response => {
                res.status(200).json("Product has been updated");
            })).catch((error) => {
                console.error(error);
            });
        }
    });

    //This path allows to the manager to delete a product by "id"
    app.delete("/products", (req, res) => {
        const { id } = req.query;
        const query = "DELETE FROM products WHERE id=?";
        sequelize.query(query,
            { replacements: [id] }
        ).then((response) => {
            res.status(200).json("Product was deleted");
        }).catch((error) => {
            console.error(error);
        });
    });
};