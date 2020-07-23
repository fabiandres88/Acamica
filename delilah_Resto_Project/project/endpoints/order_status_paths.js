//This file contents all paths of the order status
require('dotenv').config();

const HttpStatus = require('http-status-codes');
const { Sequelize, QueryTypes } = require('sequelize');

/**
 * 
 * @param {*} app 
 */
module.exports = function (app) {
    const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;    

    app.get("/orderStatuses", (_, res) => {
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "SELECT * FROM order_status";
        
        sequelizeInstance.query(query, { type: QueryTypes.SELECT })
            .then((orderStatuses) => {
                res.status(HttpStatus.OK).json(orderStatuses);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    app.post("/orderStatuses", (req, res) => {
        const { name } = req.body;
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "INSERT INTO order_status (name) VALUES (?)";

        sequelizeInstance.query(query, { replacements: [name] })
            .then((response) => {
                res.status(HttpStatus.CREATED).json(response);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    app.put("/orderStatuses", (req, res) => {        
        const { id, name } = req.body;
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "UPDATE order_status SET name = ? WHERE id = ? ";

        sequelizeInstance.query(query, { replacements: [ name, id ]})
            .then((response) => {
                res.status(HttpStatus.OK).json(response);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            })
    });

    app.delete("/orderStatuses/:id", (req, res) => {
        const orderStatusId = req.params.id;
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "DELETE FROM order_status WHERE id = ?";

        sequelizeInstance.query(query, { replacements : [ orderStatusId ]})
            .then((_) => {
                res.status(HttpStatus.NO_CONTENT);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            })
    });
};