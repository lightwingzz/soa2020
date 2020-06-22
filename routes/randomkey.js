const express = require("express");
const router = express.Router();
const mysql = require("mysql");
var request = require('request');
var dotenv = require('dotenv').config()

function keygen() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 15; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
 router.get("/",async function(req,res)
 {
     console.log(keygen());
 });


 module.exports = router;