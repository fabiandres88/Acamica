const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");
const moment = require ("moment");

const creatingOrder = (req, res, next) => {
    const { id_user, order_status_id, payment_method_id} = req.body;
        const date = moment().format();
        const query = "INSERT INTO orders (id_user, order_status_id, payment_method_id, date) VALUES (?,?,?,?)";
        sequelize.query(query,
            { replacements: [ id_user, order_status_id, payment_method_id, date]}
            ).then((response) => {
                req.query.orderId= response[0];
                next();
            }).catch((error) => {
                console.error(error);
            });
};



module.exports = { creatingOrder };