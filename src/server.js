const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const path = require("path");
const exphbs = require("express-handlebars");
const indexRoute = require("./routes/indexRoute");
const { Server } = require("socket.io");
const Product = require("./models/Product");
const Chat = require("./models/Chat");

dotenv.config();


// APP SET
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

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




const server = app.listen(process.env.PORT || 8080, () => {
    console.log("Server listen on Port: 8080");
})

const io = new Server(server)
io.on('connection', async socket => {
    // PRODUCTS

    console.log(`The socket ${socket.id} is connected`)
    let allProducts = await Product.find()
    socket.emit('deliverProducts', allProducts)
    
    // CHATS

    let allChats = await Chat.find();
    console.log(allChats);
    socket.emit('messagelog', allChats);
    socket.on('message', async data => {
        await Chat.insertMany({data});
        io.emit('messagelog', await Chat.find());
    });
});

module.exports = io;
