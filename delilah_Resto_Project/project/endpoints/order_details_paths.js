//This file contents all paths of the order detail
const Sequelize = require ("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const validations = require ("../validations/oder_details_validations");

module.exports = function (app) {

    app.post("/order_detail", validations.creatingOrderDetail, (req, res) => {

    });
}