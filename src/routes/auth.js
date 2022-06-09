const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
const uploader  = require("../uploader");


//REGISTER
router.post("/register", uploader.single('avatar'),async (req, res)=> {
    try{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
            phone: req.body.phone,
            age: req.body.age,
            address: req.body.address,
            avatar: req.body.avatar,
        });

        const savedUser = await newUser.save();
        res.status(201).json({savedUser});
    } catch(err) {
        res.status(500).json(err)
    }
});

router.get('/current', async (req,res)=>{
    const accessToken = req.cookies.accessToken;
    const user = jwt.verify(accessToken, process.env.JWT_SEC);
    req.user = user;
    console.log({user});
    res.status(200).json({user});
});

router.get('/logout',(req, res)=>{
    res.clearCookie('accessToken');
    res.redirect('/');
});


//LOGIN

router.post("/login", async (req, res)=> {
   try{
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password &&
            res.status(401).json("Wrong credentials!");

            
            const accessToken = jwt.sign(
                {
                    username: user.username,
                    avatar: user.avatar,
                    email: user.email,
                    id: user._id,
                    isAdmin: user.isAdmin,
                }, 
                process.env.JWT_SEC,
                {expiresIn: '1h'},  
            );
        res.cookie("accessToken", accessToken,{
            httpOnly:true,
        });
        
        const { password, ...others } = user._doc;
        res.status(200).json({others, accessToken});
   } catch(err) {
       res.status(500).json(err);
   }
});

router.put("/send-email", async (req, res)=> {
    try {
        await transporter.sendMail({
           from: '"Online Ecommerce" <online@ecommerce.com>', // sender address
           to: req.body.email, // list of receivers
           subject: "Order Purchase", // Subject line
           text: "Thanks for purchase at this shop!", // plain text body
           html: "<b>Thanks for purchase at this shop!</b>", // html body
       });

       res.status(200).json('Email Send ➤')
    }catch(err) {
       console.log(err);
    }
});

router.put("/send-message", async (req, res)=> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    try {
         client.messages.create({
            to: req.body.phone, // Caracteristica del pais mas numero con codigo de area.
            from: '+18484005693',
            body: 'Thanks for your purchase. Order in process!'
        })
            .then(message => console.log(message.sid))
            .done();
        res.status(200).json('Message Sent ➤')
    }catch(err) {
       console.log(err);
    }
});

module.exports = router;