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

        const query = `select state_name from state where state_name like '%${req.query.name}%'`;

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