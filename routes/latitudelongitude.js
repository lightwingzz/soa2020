const express = require("express");
const router = express.Router();
const mysql = require("mysql");
var request = require('request');

const pool = mysql.createPool({
    host: "localhost",
    database: "proyeksoa",
    user: "root",
    password: ""
});

function getlatitudelongitude(latitude,longitude)
{
    return new Promise(function(resolve,reject)
    {
        var options = 
        {
            'method': 'GET',
            'url': `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=e00e72e8-d53b-40ba-9cae-cb9a21f88fd3`
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
        res.status(200).send(await getlatitudelongitude(req.query.latitude,req.query.longitude));
    }

    catch (error)
    {
        res.status(500).send(error);
    }
});

router.post("/", async function(req, res){
    
});

module.exports = router