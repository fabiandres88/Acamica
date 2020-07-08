//This file contents all paths of the order status
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");

module.exports = function (app) {

    app.get("/status", (req, res) => {
        const query = "SELECT * FROM order_status";
        sequelize.query(query,
            { type: sequelize.QueryTypes.SELECT }
        ).then((response) => {
            res.json(response);
        }).catch((error) => {
            console.error(error);
        });
    });

    app.post("/status", (req, res) => {
        const { name } = req.body;
        const query = "INSERT INTO order_status (name) VALUES (?)";
        sequelize.query(query,
            { replacements: [name] }
        ).then((response) => {
            res.json(response);
        }).catch((error) => {
            console.error(error);
        });
    });

    app.put("/status", (req, res) => {
        const { id } = req.query;
        const { name } = req.body;
        const query = "UPDATE order_status SET name = ? WHERE id = ? ";
        sequelize.query(query,
            { replacements: [ name, id]}
            ).then((response) => {

            }).catch((error) => {
                console.error(error);
            })
    });

    app.delete("/status", (req, res) => {
        const { id } = req.query;
        const query = "DELETE FROM order_status WHERE id=?";
        sequelize.query(query,
            { replacements : [ id ]}
            ).then((response) => {

            }).catch((error) => {
                console.error(eror);
            })
    });
};