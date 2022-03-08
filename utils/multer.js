const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage : multer.diskStorage({}),
    fileFilter:(req,file ,cd)=>{
        let ext = path.extname(file.originalname)
        if(ext !== ".jpg" && ext !==".png" && ext !== ".jpeg"){
            cd(new Error("File is not supported"), false)
            return ;
        }
        cd(null , true)
    }

})