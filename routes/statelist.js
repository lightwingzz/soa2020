const express = require("express");
const router = express.Router();
const mysql = require("mysql");
var request = require('request');

const pool = mysql.createPool({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port
});

function getstatelist(country)
{
    return new Promise(function(resolve,reject)
    {
        var options = 
        {
            'method': 'GET',
            'url': `https://api.airvisual.com/v2/states?country=${country}&key=e00e72e8-d53b-40ba-9cae-cb9a21f88fd3`
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
        let kembalian = await getstatelist(req.query.country);
        let hasil = [];
        kembalian = JSON.parse(kembalian);

        hasil.push("negara : " + req.query.country);

        kembalian.data.forEach((item, i) => 
        {
            let daftarnegara = {
                "Negara bagian" : item.state
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
        if(req.query.country === "")
        {
            res.status(400).send("bad request! fill all data!");
        }

        else
        {
        let conn = await getconnection()
    
        let kembalians = await getstatelist(req.query.country);
        kembalians = JSON.parse(kembalians);
    
        kembalians.data.forEach(async(item, i) => 
        {
            let query = await executeQuery(conn,`insert into state values('${req.query.country}','${item.state}')`)
        });            
    
        conn.release();

        res.status(200).send("OK");
        }
    }
    
    catch (error)
    {
        res.status(500).send(error);
    }
});

module.exports = router