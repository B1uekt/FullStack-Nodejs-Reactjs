require('dotenv').config()

const express = require('express')
const webRoutes = require('./route/web')
const apiRoutes = require('./route/api')
const configviewEngine = require('./config/viewEngine')
const getHomePage = require('./controllers/HomeController')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8888
const hostname = process.env.HOSTNAME

//config CORS
app.use(cors())

//config req.body 
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies


configviewEngine(app)



app.use('/', webRoutes)
app.use('/v1/api', apiRoutes)




const db = require("./models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced database.");
    })
    .catch((err) => {
        console.log("Failed to sync database: " + err.message);
    });

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});