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
    
        let query = await executeQuery(conn,`select state_name from state where state_name like '%${req.query.name}%'`)
    
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
    
        let query = await executeQuery(conn,`insert into state (state_name) values ("${req.query.name}")`)
    
        conn.release();

        res.status(200).send(query);
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
    
        let query = await executeQuery(conn,`delete from state where state_name = "${req.query.name}"`)
    
        conn.release();

        res.status(200).send(query);
        }
    }

    catch (error)
    {
        res.status(500).send(error);
    }    
});

module.exports = router 