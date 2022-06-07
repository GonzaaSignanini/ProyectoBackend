const Chat = require("../models/Chat");

const router = require("express").Router();

router.get("/", async (req, res)=> {

    try {
        let chats;

        chats = await Chat.find();

        res.status(200).json({chats});
    }catch(err) {
        res.status(500).json(err);
    }
});
