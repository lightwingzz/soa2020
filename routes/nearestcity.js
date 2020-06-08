const express = require("express");
const router = express.Router();
var request = require('request');

/*
require('dotenv').config();

const pool = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    }
)
*/

function getnearestcity(nearestcity)
{
    return new Promise(function(resolve,reject)
    {
        var options = 
        {
            'method': 'GET',
            'url': `https://api.airvisual.com/v2/nearest_city?key=e00e72e8-d53b-40ba-9cae-cb9a21f88fd3`
        };
    
        request(options, function(error,response)
        {
            if(error) reject(new Error(error));
            else resolve(response.body);
        });
    })
}

router.get("/", async function(req, res){
    try
    {
        res.status(200).send(await getnearestcity(req.query.nearestcity));
    }

    catch (error)
    {
        res.status(500).send(error);
    }
});

router.post("/", async function(req, res){
    
});

module.exports = router