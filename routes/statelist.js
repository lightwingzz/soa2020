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
        res.status(200).send(await getstatelist(req.query.country));
    }

    catch (error)
    {
        res.status(500).send(error);
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

function executeQuery(query)
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
        let kembalian = await getstatelist(req.query.statelist);
        kembalian = JSON.parse(kembalian);
    
        pool.getConnection(function(err,conn)
        {
            if(err)
            {
                return res.status(500).send(err);
            }
          
            for (let i = 0; i < kembalian.data.length; i++) 
            {
                const query = "insert into state (country_name,state_name) values('China','"+kembalian.data[i].state+"')";
                
                conn.query(query,function(err,result)
                {
                    if(err)
                    {
                        //return res.status(500).send(err);
                    }

                    else
                    {
                        //return res.status(200).send(result);
                    }
                })
                 
            }

        console.log("selesai");
            
        }); 

        
        //const conn = await getconnection();
        //console.log(conn);
        //executeQuery(conn,"insert into country (country_name) values('tole')");
        //conn.release();
        
    }
    
    catch (error)
    {
        res.status(500).send(error);
    }
});

module.exports = router