const Sequelize = require ("sequelize");
const sequelize = new Sequelize ("mysql://root:@localhost:8111/delilah_resto");


module.exports = function (app){
//Route to get all users
    app.get("/users", (req, res) =>{
        const query = "SELECT * FROM users";    
        sequelize.query(query,
            {type: sequelize.QueryTypes.SELECT}
            ).then((response)=>{
                res.json(response);
            }).catch((error)=>{
                console.error(error);
            })        
    });
//Route to users sign up
    app.post("/users", (req, res) =>{
console.log(req.body);
                
        const query = "INSERT INTO users (user_name, full_name, email, phone, address, password, admin) VALUES (?,?,?,?,?,?,?)";            
        
        const {user_name, full_name, email, phone, address, password, admin} = req.body;

        sequelize.query(query,            
            {replacements: [user_name, full_name, email, phone, address, password, admin]}
            ).then((response)=>{
                res.json(response);
            }).catch((error)=>{
                console.error(error);
            })        
    });
};