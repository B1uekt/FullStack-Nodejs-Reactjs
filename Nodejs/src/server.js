const express = require('express')
const path = require('path')

const app = express()
const port = 8069
const hostname = 'localhost'
//config template engine
// app.set('views', './src/views/')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});