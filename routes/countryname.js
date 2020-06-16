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

router.get("/",function(req,res)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            return res.status(500).send(err);
        }

        const query = `select country_name from country where country_name like '%${req.query.name}%'`;

        conn.query(query,function(err,result)
        {
            if(err)
            {
                return res.status(500).send(err);
            }

            else
            {
                return res.status(200).send(result);
            }
        }) 
    });    
});
    
router.post("/",function(req,res)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            return res.status(500).send(err);
        }

        const query = `insert into country (country_name) values ("${req.query.name}")`;

        conn.query(query,function(err,result)
        {
            if(err)
            {
                return res.status(500).send(err);
            }

            else
            {
                return res.status(200).send(result);
            }
        }) 
    });    
});

router.delete("/",function(req,res)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            return res.status(500).send(err);
        }

        const query = `delete from country where country_name = "${req.query.name}"`;

        conn.query(query,function(err,result)
        {
            if(err)
            {
                return res.status(500).send(err);
            }

            else
            {
                return res.status(200).send(result);
            }
        }) 
    });    
});

module.exports = router 