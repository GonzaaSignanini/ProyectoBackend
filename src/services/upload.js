const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname==="image"){
            cb(null, (path.join(__dirname, 'public/images')))
        }else if(file.fieldname==="documents"){
            cb(null,'documents')
        }
        else{
            cb(null,'uploads')
        }
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+file.fieldname+"."+file.mimetype.split('/')[1])
    }
})

const upload = multer({storage: storage})



export default upload;