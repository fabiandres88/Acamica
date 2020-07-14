const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:8111/delilah_resto");

const creatingOrderDetail = (req, res, next) => {
    const {  products } = req.body;
    let product =0;    
    const { list } = products.filter(element =>{
        product =element.product_id;            
    }) 
    
    const query = "SELECT price FROM products WHERE id= ?";    
    sequelize.query(query,
        { replacements: [product], type: sequelize.QueryTypes.SELECT }
    ).then((product) => {
        if (product.lenght == 0) {
            return res.status(409).json("Product not found");
        }
        const productUnit = product[0];
        const { order_id } = req.body;
        let product_id=0;
        let quantity=0;
        const { list } = products.filter(element =>{
            product_id =element.product_id; 
            quantity =element.quantity;        
        })
        const query = "INSERT INTO order_detail (order_id, product_id, quantity, price) VALUES (?,?,?,?)";
        sequelize.query(query,
            { replacements: [order_id, product_id, quantity, productUnit.price] }
        ).then((response) => {
            next();
        }).catch((error) => {
            console.error(error)
        });
    }).catch((error) => {
        console.error(error)
    });
};

module.exports = { creatingOrderDetail };