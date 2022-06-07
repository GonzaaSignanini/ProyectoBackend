const multer = require("multer");
const path = require("path");

const uploader = multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null, __dirname+'/public/avatars')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname)
        }
    })
})

module.exports = uploader;