const express = require('express');
require('dotenv').config();
let app = express();

app.use(express.json());

const productRoutes = require('./routes/routes')

require('./adapter/connection');

app.use('/products', productRoutes)

app.use("*", (req, res, next) => {
    res.status(404).send({ message: 'Page not found' })
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})