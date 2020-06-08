const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req,file,callback)
    {
        callback(null,"./uploads");
    },

    filename: function(req,file,callback)
    {
        const filename = file.originalname.split(".");
        const extension = filename[filename.length-1];
        callback(null,Date.now() + "." + extension);
//        callback(null,"tesnama.jpg");
    }
});

const uploads = multer({storage: storage});

const accountmodel = require("./../models/connect");

module.exports = router;