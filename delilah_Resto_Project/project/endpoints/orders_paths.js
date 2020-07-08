//This file contents all paths of the orders
const Sequelize = require ("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const moment = require ("moment");

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

    app.post("/orders", (req, res) => {
        const { id_user, order_status_id, payment_method_id} = req.body;
        const date = moment().format();
        const query = "INSERT INTO orders (id_user, order_status_id, payment_method_id, date) VALUES (?,?,?,?)";
        sequelize.query(query,
            { replacements: [ id_user, order_status_id, payment_method_id, date]}
            ).then((response) => {
                res.json(response);
            }).catch((error) => {
                console.error(error);
            });
    });

    app.put("/order", (req, res) => {

    });

    app.delete("/order", (req, res) => {

    });
};