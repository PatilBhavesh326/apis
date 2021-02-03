const express = require('express');

const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());


// Routes
app.use('/auth', require('./routes/auth'));
app.use("/api", require("./routes/employeeRep"));
app.use("/api", require("./routes/company"));


const port = process.env.PORT || 5000;
app.listen(port);