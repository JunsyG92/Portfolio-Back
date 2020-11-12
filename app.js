const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const expressSanitizer = require("express-sanitizer");
const helmet = require("helmet");

// const userRoutes = require('./routes/Users')

app.use(helmet());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use(bodyParser.json());
app.use(expressSanitizer()); // Protège contre les failles XSS

app.use("/images", express.static(path.join(__dirname, "images")));
// app.use('/api', userRoutes);

module.exports = app;
