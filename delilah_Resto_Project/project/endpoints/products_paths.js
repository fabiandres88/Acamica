//This file contents all paths of the products
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const jwt = require('jsonwebtoken');
const validations = require("../validations/products_validations");

module.exports = function (app) {

    app.get("/products", (req, res) => {
        const query = "SELECT * FROM products";
        sequelize.query(query,
            { type: sequelize.QueryTypes.SELECT }
        ).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            console.error(error);
        })
    });

    app.post("/products", (req, res) => {        
        const query = "INSERT INTO products (product_name, price, available) VALUES (?,?,?)";
        const { product_name, price, available } = req.body;
        sequelize.query(query,
            { replacements : [ product_name, price, available ]}
        ).then((response)=> {
            res.json(response);
        }).catch((error) => {
            console.error(error);
        })
    });

    app.put("/products",(req, res) =>{
        const {id} = req.query;
        const { price, available } = req.body;        
        if(price){
            const query = "UPDATE TABLE products SET price = ? WHERE id = ?";
            sequelize.query(query,
                    { replacements: [ price ]}
                )
        }
    });

};