//This file contents all paths of the order status
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");

module.exports = function (app){

    app.get("/order", (req, res) =>{

    });

    app.post("/order", (req, res) => {

    });

    app.put("/order", (req, res) => {

    });

    app.delete("/order", (req, res) => {

    });
};