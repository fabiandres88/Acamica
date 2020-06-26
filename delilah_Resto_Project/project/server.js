const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const routes = require ("./endpoints/paths");

app.use(bodyParser.json());

routes(app);

app.listen(3000, () =>{
    console.log("Server is ready at port 3000 ...")
});