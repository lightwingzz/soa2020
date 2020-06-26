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

router.get("/",async function(req,res)
{
    try
    {
        if(req.query.name === "")
        {
            res.status(400).send("bad request! fill all data!");
        }

        else
        {
        let conn = await getconnection()
    
        let query = await executeQuery(conn,`select country_name from country where country_name like '%${req.query.name}%'`)
    
        conn.release();

        res.status(200).send(query);
        }
    }

    catch (error)
    {
        res.status(500).send(error);
    }
});
    
router.post("/",async function(req,res)
{
    try
    {
        if(req.query.name === "")
        {
            res.status(400).send("bad request! fill all data!");
        }

        else
        {
        let conn = await getconnection()
    
        let query = await executeQuery(conn,`insert into country (country_name) values ("${req.query.name}")`)
    
        conn.release();

        res.status(200).send("success insert");
        }
    }

    catch (error)
    {
        res.status(500).send(error);
    }
});

router.delete("/",async function(req,res)
{
    try
    {
        if(req.query.name === "")
        {
            res.status(400).send("bad request! fill all data!");
        }

        else
        {
        let conn = await getconnection()
    
        let query = await executeQuery(conn,`delete from country where country_name = "${req.query.name}"`)
    
        conn.release();

        res.status(200).send("success delete");
        }
    }

    catch (error)
    {
        res.status(500).send(error);
    }  
});

module.exports = router 