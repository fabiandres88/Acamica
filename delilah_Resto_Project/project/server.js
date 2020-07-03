const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const users = require ("./endpoints/users_paths");
const products = require ("./endpoints/products_paths");
app.use(bodyParser.json());

users (app);
products (app);

app.listen(3000, () =>{
    console.log("Server is ready at port 3000 ...")
});