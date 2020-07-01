//This file contents all paths of the products
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const jwt = require('jsonwebtoken');
const validations = require("../validations/products_validations");

module.exports = function (app) {

    app.get("/products",(req, res)=>{
        res.json("I am here");
    })

};