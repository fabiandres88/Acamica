//This file contents all paths of the orders
require('dotenv').config();

const HttpStatus = require('http-status-codes');
const { Sequelize, QueryTypes } = require('sequelize');
const moment = require ("moment");
const ordersValidations = require ("../validations/orders_validations")
const usersValidations = require("../validations/users_validations");

/**
 * 
 * @param {*} app 
 */
module.exports = function (app){
    const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    app.get("/orders/:id", usersValidations.verifyToken, (req, res) =>{
        const user = req.user;
        const order_id = Number(req.params.id);

        if(isNaN(order_id)) 
        {
            return res.status(HttpStatus.BAD_REQUEST).json();
        } 

        const { includeUser, includeOrderStatus, includePaymentMethod } = req.query;
        const userIds = user.admin ? [] : [ user.id ];

        getOrders([order_id], userIds, includeUser, includeOrderStatus, includePaymentMethod)
            .then(orders => {
                if(orders.length <= 0)
                {
                    return res.status(HttpStatus.NOT_FOUND).json();
                }

                res.status(HttpStatus.OK).json(orders.find(o => o.id == order_id));

            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });        
            });
    });

    app.get("/orders/:id/orderDetails", usersValidations.verifyToken, (req, res) => {
        const user = req.user;
        const order_id = Number(req.params.id);
        const userIds = user.admin ? [] : [ user.id ];

        if(isNaN(order_id)) 
        {
            return res.status(HttpStatus.BAD_REQUEST).json();
        } 
        
        getOrders([order_id], userIds, false, false, false)
            .then(orders => {
                if(orders.length <= 0) return res.status(HttpStatus.NOT_FOUND).json();                

                const sequelizeInstance = new Sequelize(connectionString);
                const query = `SELECT od.id, od.order_id, p.id product_id, p.name product_name, od.quantity, od.price
                    FROM order_details od
                    INNER JOIN products p on p.id = od.product_id
                    WHERE od.order_id = ?`;

                sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements: [ order_id ]})
                    .then((orderDetails) => {
                        res.status(HttpStatus.OK).json(orderDetails);
                    }).catch((error) => {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
                    }).finally(() => {
                        sequelizeInstance.close();
                    });
                
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });        
            });        
    });

    app.get("/orders", usersValidations.verifyToken, (req, res) =>{
        const user = req.user;
        const { includeUser, includeOrderStatus, includePaymentMethod } = req.query;
        const userIds = user.admin ? [] : [ user.id ];

        getOrders([], userIds, includeUser, includeOrderStatus, includePaymentMethod)
            .then(orders => {
                res.status(HttpStatus.OK).json(orders);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });        
            });
    });    

    app.post("/orders", usersValidations.verifyToken, ordersValidations.validateAdministrator, ordersValidations.valuesRequired, (req, res) => {        
        const { user_id, order_status_id, payment_method_id } = req.body;
        const sequelizeInstance = new Sequelize(connectionString);
        const date = moment().format();
        
        const query = "INSERT INTO orders (user_id, order_status_id, payment_method_id, date) VALUES (?,?,?,?)";

        sequelizeInstance.query(query, { replacements: [ user_id, order_status_id, payment_method_id, date]})
            .then((response) => {
                const order_id = response[0];                
                res.status(HttpStatus.CREATED).json({ order_id: order_id });
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    app.put("/orders", usersValidations.verifyToken, ordersValidations.validateAdministrator, (req, res) => {
        const { id, user_id, payment_method_id, order_status_id } = req.body;
        const order_id = Number(id);

        if(isNaN(order_id)) 
        {
            return res.status(HttpStatus.BAD_REQUEST).json("id field is required.");
        }

        const columns = [];

        if(user_id) columns.push(`user_id = ${user_id}`);
        if(payment_method_id) columns.push(`order_status_id = ${order_status_id}`);
        if(order_status_id) columns.push(`payment_method_id = ${payment_method_id}`);

        if(columns.length <= 0) return res.status(HttpStatus.BAD_REQUEST).json("user_id, payment_method_id or order_status_id are expected.");

        getOrders([order_id], [], false, false, false)
            .then(orders => {
                if(orders.length <= 0) return res.status(HttpStatus.NOT_FOUND).json("Order was not found.");
        
                const sequelizeInstance = new Sequelize(connectionString);
                const query = `UPDATE orders SET ${columns.join(",")} WHERE id = ?`;
        
                sequelizeInstance.query(query, { replacements: [order_id] })
                    .then((_ => {
                        res.status(HttpStatus.OK).json("Order has been updated");
                    })).catch((error) => {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
                    }).finally(() => {
                        sequelizeInstance.close();
                    });
            })
            .catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });        
            });        
    });

    app.delete("/orders/:id", usersValidations.verifyToken, ordersValidations.validateAdministrator, (req, res) => {
        const order_id = Number(req.params.id);

        if(isNaN(order_id)) 
        {
            return res.status(HttpStatus.BAD_REQUEST).json();
        }

        getOrders([order_id], [], false, false, false)
            .then(orders => {
                if(orders.length <= 0) return res.status(HttpStatus.NOT_FOUND).json("Order was not found.");

                const sequelizeInstance = new Sequelize(connectionString);

                sequelizeInstance.transaction(transaction => {
                    return sequelizeInstance.query(`DELETE FROM order_details WHERE order_id = ?`, { replacements: [order_id], transaction: transaction })
                            .then((_) => {
                                return sequelizeInstance.query(`DELETE FROM orders WHERE id = ?`, { replacements: [order_id], transaction: transaction })
                            });
                }).then(_ => {            
                    res.status(HttpStatus.NO_CONTENT).json();
                }).catch((error) => {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
                }).finally(() => {
                    sequelizeInstance.close();
                });
            })
            .catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });        
            });
    });

    /**
     * 
     * @param {*} orderIds 
     * @param {*} userIds 
     * @param {*} includeUser 
     * @param {*} includeOrderStatus 
     * @param {*} includePaymentMethod 
     */
    function getOrders(orderIds, userIds, includeUser, includeOrderStatus, includePaymentMethod)
    {        
        let query = `SELECT o.id, o.user_id, u.full_name, u.address, u.phone, u.email, o.order_status_id,
            os.name order_status_name, o.payment_method_id, p.name payment_method_name, o.date
            FROM orders o
            INNER JOIN users u on u.id = o.user_id
            INNER JOIN order_status os on os.id = o.order_status_id
            INNER JOIN payment_methods p on p.id = o.payment_method_id`;

        const criteria = [];

        if(orderIds.length > 0)
        {
            criteria.push(`o.id IN (${orderIds.join(",")})`);            
        }

        if(userIds.length > 0)
        {
            criteria.push(`o.user_id IN (${userIds.join(",")})`);            
        }

        if(criteria.length > 0) 
        {
            query += ` WHERE ${criteria.join(" AND ")}`;
        }

        return new Promise((resolve, reject) => {
            const sequelizeInstance = new Sequelize(connectionString);

            sequelizeInstance.query(query, { type: QueryTypes.SELECT })
            .then((dbOrders) => {
                const orders = [];

                dbOrders.forEach(dbOrder => {
                    const order = {
                        id: dbOrder.id,
                        user_id: dbOrder.user_id,
                        order_status_id: dbOrder.order_status_id,
                        payment_method_id: dbOrder.payment_method_id,
                    };
    
                    if(includeUser || false)
                    {
                        order.user = {
                            id: dbOrder.id_user,
                            full_name: dbOrder.full_name,
                            address: dbOrder.address,
                            phone: dbOrder.phone,
                            email: dbOrder.email
                        };
                    }
    
                    if(includeOrderStatus || false)
                    {
                        order.orderStatus = {
                            id: dbOrder.order_status_id,
                            name: dbOrder.order_status_name
                        };
                    }
    
                    if(includePaymentMethod || false)
                    {
                        order.paymentMethod = {
                            id: dbOrder.payment_method_id,
                            name: dbOrder.payment_method_name
                        };
                    }

                    orders.push(order);
                });
                
                resolve(orders);
            })
            .catch(error => reject(error))
            .finally(() => {
                sequelizeInstance.close();
            });
        });
    }
};