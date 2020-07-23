//This file contents all paths of the order detail
require('dotenv').config();

const HttpStatus = require('http-status-codes');
const { Sequelize, QueryTypes } = require('sequelize');
const userValidations = require("../validations/users_validations");
const orderDetailsValidations = require("../validations/order_details_validations");

/**
 * 
 * @param {*} app 
 */
module.exports = function (app) {
    const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    app.post("/orderDetails", userValidations.verifyToken, orderDetailsValidations.validateAdministrator, orderDetailsValidations.valuesRequired, (req, res) => {
        const sequelizeInstance = new Sequelize(connectionString);
        const { order_id, products } = req.body;
        const orderDetails = [];

        if (products.length <= 0) return res.status(HttpStatus.BAD_REQUEST).json("Products cannot be empty. Please provide a detail for it.");

        getProducts().then(productsList => {
            products.forEach(product => {
                let dbProduct = productsList.find(p => p.id == product.product_id);

                if (!dbProduct) return res.status(HttpStatus.BAD_REQUEST).json({ error: `Product ${product.product_id} does not exist.` });

                orderDetails.push({
                    order_id: order_id,
                    product_id: dbProduct.id,
                    quantity: product.quantity,
                    price: dbProduct.price
                });
            });

            const orderDetailsCreated = [];

            sequelizeInstance.transaction((transaction) => {
                const promises = [];
                const insertSql = `INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;

                orderDetails.forEach(orderDetail => {
                    promises.push(sequelizeInstance.query(insertSql, {
                        replacements: [
                            orderDetail.order_id,
                            orderDetail.product_id,
                            orderDetail.quantity,
                            orderDetail.price
                        ], transaction: transaction
                    }));
                });

                return promises.reduce(function (prev, curr) {
                    return prev.then((results) => {
                        orderDetailsCreated.push({
                            order_detail_id: results[0]
                        });
                        return curr;
                    });
                });
            }).then((results) => {
                orderDetailsCreated.push({
                    order_detail_id: results[0]
                });

                res.status(HttpStatus.CREATED).json(orderDetailsCreated);
            }).catch(error => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });

        }).catch((error) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
        });
    });

    app.put("/orderDetails", userValidations.verifyToken, orderDetailsValidations.validateAdministrator, orderDetailsValidations.valuesRequiredToUpdate, (req, res) => {
        const { id, quantity } = req.body;

        getOrderDetail(id)
            .then(orderDetail => {
                if (!orderDetail) return res.status(HttpStatus.NOT_FOUND).json("Order detail was not found.");

                const sequelizeInstance = new Sequelize(connectionString);
                const query = `UPDATE order_details SET quantity = ? WHERE id = ?`;

                sequelizeInstance.query(query, { replacements: [quantity, id] })
                    .then((_) => {
                        res.status(HttpStatus.OK).json("Order detail has been updated");
                    }).catch((error) => {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
                    }).finally(() => {
                        sequelizeInstance.close();
                    });

            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            });
    });

    app.delete("/orderDetails/:id", userValidations.verifyToken, orderDetailsValidations.validateAdministrator, (req, res) => {
        const order_detail_id = Number(req.params.id);

        if (isNaN(order_detail_id)) {
            return res.status(HttpStatus.BAD_REQUEST).json();
        }

        getOrderDetail(order_detail_id)
            .then(orderDetail => {
                if (!orderDetail) return res.status(HttpStatus.NOT_FOUND).json("Order detail was not found.");

                const sequelizeInstance = new Sequelize(connectionString);
                const query = `DELETE FROM order_details WHERE id = ?`;

                sequelizeInstance.query(query, { replacements: [order_detail_id] })
                    .then((_) => {
                        res.status(HttpStatus.NO_CONTENT).json();
                    }).catch((error) => {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
                    }).finally(() => {
                        sequelizeInstance.close();
                    });

            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            });
    });

    /**
     * 
     */
    function getProducts() {
        return new Promise((resolve, reject) => {
            const sequelizeInstance = new Sequelize(connectionString);
            const query = "SELECT id, name, price, active FROM products WHERE active = 1";

            sequelizeInstance.query(query, { type: QueryTypes.SELECT })
                .then(products => {
                    resolve(products);
                })
                .catch(error => reject(error))
                .finally(() => {
                    sequelizeInstance.close();
                });
        });
    }

    /**
     * 
     * @param {*} orderDetailId 
     */
    function getOrderDetail(orderDetailId) {
        return new Promise((resolve, reject) => {
            const sequelizeInstance = new Sequelize(connectionString);
            const query = `SELECT id, order_id, product_id, quantity, price FROM order_details WHERE id = ?`;

            sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements: [orderDetailId] })
                .then(orderDetails => {
                    resolve(orderDetails.find(o => o.id == orderDetailId));
                })
                .catch(error => reject(error))
                .finally(() => {
                    sequelizeInstance.close();
                });
        });
    }
}