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

router.get("/userlist",function(req,res)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            return res.status(500).send(err);
        }

        const query = `select name from user`;

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

        const query = `insert into user (name,email,photo) values ("${req.query.name}","${req.query.email}","${req.query.photo}")`;

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

router.put("/email",function(req,res)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            return res.status(500).send(err);
        }

        const query = `update user set email = "${req.query.email}" where name = "${req.query.name}"`;

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

        const query = `delete from user where name = "${req.query.name}"`;

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