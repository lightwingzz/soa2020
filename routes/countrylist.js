const express = require("express");
const router = express.Router();
const mysql = require("mysql");
var request = require('request');
var dotenv = require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port
});

function getcountrylist(countrylist)
{
    return new Promise(function(resolve,reject)
    {
        var options = 
        {
            'method': 'GET',
            'url': `https://api.airvisual.com/v2/countries?key=e00e72e8-d53b-40ba-9cae-cb9a21f88fd3`
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
        let kembalian = await getcountrylist(req.query.countrylist);
        let hasil= [];
        kembalian = JSON.parse(kembalian);
        
        kembalian.data.forEach((item, i) => 
        {
            let daftarnegara = {
                "Negara" : item.country
            }
            hasil.push(daftarnegara)
        });

        res.send(hasil);
    }

    catch (error)
    {
        res.status(500).send("internal service error");
    }
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

router.post("/", async function(req, res)
{
    try
    {
        let conn = await getconnection()
    
        let query = await executeQuery(conn,`truncate table country`)
    
        conn.release();

        conn = await getconnection()
    
        let kembalians = await getcountrylist(req.query.countrylist);
        kembalians = JSON.parse(kembalians);
    
        kembalians.data.forEach(async(item, i) => 
        {
            let query = await executeQuery(conn,`insert into country values(NULL,'${item.country}')`)
        });            
    
        conn.release();

        res.status(200).send("OK");
    }

    catch (error)
    {
        res.status(500).send(error);
    }   
});
    
module.exports = router 