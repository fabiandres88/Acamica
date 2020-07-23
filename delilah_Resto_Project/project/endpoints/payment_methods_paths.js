//This file contents all paths of the payment methods
require('dotenv').config();

const HttpStatus = require('http-status-codes');
const { Sequelize, QueryTypes } = require('sequelize');

/**
 * 
 * @param {*} app 
 */
module.exports = function (app) {
    const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;    

    app.get("/paymentMethods", (_, res) =>{
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "SELECT * FROM payment_methods";

        sequelizeInstance.query(query, { type: QueryTypes.SELECT })
            .then((paymentMethods) => {
                res.status(HttpStatus.OK).json(paymentMethods);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    app.post("/paymentMethods", (req, res) => {
        const { name } = req.body;
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "INSERT INTO payment_methods (name) VALUES (?)";

        sequelizeInstance.query(query, { replacements: [ name ]})
            .then((response) => {
                res.status(HttpStatus.CREATED).json(response);
            }).catch((error) =>{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    app.put("/paymentMethods", (req, res) => {        
        const { id, name } = req.body;
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "UPDATE payment_methods SET name = ? WHERE id = ? ";

        sequelizeInstance.query(query, { replacements: [ name, id ]})
            .then((response) => {
                res.status(HttpStatus.OK).json(response);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });

    app.delete("/paymentMethods/:id", (req, res) => {
        const paymentMethodId = req.params.id;
        const sequelizeInstance = new Sequelize(connectionString);
        const query = "DELETE FROM payment_methods WHERE id = ?";

        sequelizeInstance.query(query, { replacements : [ paymentMethodId ]})
            .then((_) => {
                res.status(HttpStatus.NO_CONTENT);
            }).catch((error) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
            }).finally(() => {
                sequelizeInstance.close();
            });
    });
};