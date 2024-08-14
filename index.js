require('dotenv').config();
const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.PORT;
const mainRoutes=require('./src/routes/mainRoutes')

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Allows cookies to be sent
}));
app.use(express.json());

app.use('/skincare', mainRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;