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
                next();
            }).catch((error) => {
                console.error(error);
            });
};

const creatingOrderDetail = (req, res) =>{
    const { product_id} = req.body;
    const query = "SELECT price FROM products WHERE id= ?";
    sequelize.query(query,
        { replacements: [ product_id]}
        ).then((response) => {            
            const price = response.TextRow.price;
            console.log(price);
            const { product_id, quantity } = req.body;
            const query = "INSERT INTO order_detail (product_id, quantity, price) VALUES (?,?,?)";
            sequelize.query(query,
                { replacements: [ product_id, quantity, price]}
                ).then((response) => {
                    next();
                }).catch((error) =>{
                    console.error(error)
                });            
        }).catch((error) => {
            console.error(error)
        });
};

module.exports = { creatingOrder, creatingOrderDetail };