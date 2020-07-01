const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const routes = require ("./endpoints/users_paths");
const routes2 = require ("./endpoints/products_paths");

app.use(bodyParser.json());

routes (app);
routes2 (app);

app.listen(3000, () =>{
    console.log("Server is ready at port 3000 ...")
});