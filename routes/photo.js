const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req,file,callback)
    {
        callback(null,'.uploads/');
    },

    filename: function(req,file,callback)
    {
        //const filename = file.originalname.split(".");
        //const extension = filename[filename.length-1];
        //callback(null,Date.now() + "." + extension);
        //callback(null,"tesnama.jpg");
        callback(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
});

const uploads = multer({storage: storage}).single('propic');

/*
router.get("/weka",(req,res) => {
    res.send("hello world");
});
*/

router.post('/', function (req,res){
    upload(req,res,function (err){
        if(err)
        {

        }
        res.json({
            success:true,
            message:"profile uploaded"
        });
    })
});

module.exports = router;