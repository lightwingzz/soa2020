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

function getconnection()
{
    return new Promise(function(resolve,reject)
    {
        pool.getConnection(function(err,conn)
        {
            if(err)
            {
                reject(err);
            }

            else
            {
                resolve(conn);
            }
        })
    });
}

function executeQuery(conn,query)
{
    return new Promise(function(resolve,reject)
    {
        conn.query(query,function(err,result)
        {
            if(err)
            {
                reject(err);
            }

            else
            {
                resolve(result);
            }
        });
    });
}

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
        //res.status(200).send(await getlatitudelongitude(req.query.latitude,req.query.longitude));
        
        //console.log(req.query.latitude);

        if(req.query.latitude === "" || req.query.longitude === "")
        {
            res.status(400).send("bad request! fill all data!");
        }

        else
        {
            let kembalian = await getlatitudelongitude(req.query.latitude,req.query.longitude);
            let hasil= [];
            kembalian = JSON.parse(kembalian);
            
            hasil.push("city : " + kembalian.data.city)
            hasil.push("country : " + kembalian.data.country)
            hasil.push("longitude : " + kembalian.data.location.coordinates[0])
            hasil.push("latitude : " + kembalian.data.location.coordinates[1])
            hasil.push("timestamp : " + kembalian.data.current.weather.ts)
            hasil.push("temperature (C) : " + kembalian.data.current.weather.tp)
            hasil.push("tekanan udara (hPa) : " + kembalian.data.current.weather.pr)
            hasil.push("kelembaban (%) : " + kembalian.data.current.weather.hu)
            hasil.push("kecepatan angin (m/s) : " + kembalian.data.current.weather.ws)
            hasil.push("arah angin (360 derajat) : " + kembalian.data.current.weather.wd)

            res.send(hasil);
        }
    }

    catch (error)
    {
        res.status(500).send(error);
    }
});

router.post("/", async function(req, res){
    
});

module.exports = router