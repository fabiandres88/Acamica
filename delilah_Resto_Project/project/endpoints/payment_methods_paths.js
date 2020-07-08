//This file contents all paths of the payment methods
const Sequelize = require ("sequelize");
const sequelize = new Sequelize ("mysql://root:@localhost:8111/delilah_resto");

module.exports = function (app){

    app.get("/payment", (req, res) =>{
        const query = "SELECT * FROM payment_methods";
        sequelize.query(query,
            { type: sequelize.QueryTypes.SELECT }
            ).then((response) => {
                res.json(response);
            }).catch((error) => {
                console.log(error);
            });
    });

    app.post("/payment", (req, res) => {
        const { name } = req.body;
        const query = "INSERT INTO payment_methods (name) VALUES (?)";
        sequelize.query(query,
            { replacements: [ name ]}
            ).then((response) => {
                res.json(response);
            }).catch((error) =>{
                console.error(error);
            });
    });

    app.put("/payment", (req, res) => {

    });

    app.delete("/payment", (req, res) => {

    });
};