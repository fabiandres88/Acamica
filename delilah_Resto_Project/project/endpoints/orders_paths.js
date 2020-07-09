//This file contents all paths of the orders
const Sequelize = require ("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const ordersValidations = require ("../validations/orders_validations")

module.exports = function (app){

    app.get("/orders", (req, res) =>{
        const query = "SELECT * FROM orders";
        sequelize.query(query,
            { type: sequelize.QueryTypes.SELECT }
            ).then((response) => {
                res.json(response);
            }).catch((error) => {
                console.error(error);
            });
    });

    app.post("/orders", ordersValidations.creatingOrder, ordersValidations.creatingOrderDetail, (req, res) => {
        res.json("ok");            
    });

    app.put("/order", (req, res) => {
        
    });

    app.delete("/order", (req, res) => {

    });
};