const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const indexRoute = require("./routes/index");
const path = require("path");
const { engine } = require("express-handlebars");
dotenv.config();


// APP SET
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

// TWILIO 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
// client.messages.create({
//     to: process.env.MY_PHONE_NUMBER,
//     from: '+18484005693',
//     body: 'Thanks for your purchase. Order in process!'
// })
// .then(message => console.log(message.sid))
// .done();

mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/", indexRoute);
app.use('/images', express.static(path.join(__dirname, '/public')));
app.use('/avatar/', express.static(path.join(__dirname, '/public')));


app.listen(process.env.PORT || 8080, () => {
    console.log("Server listen on Port: 8080");
})