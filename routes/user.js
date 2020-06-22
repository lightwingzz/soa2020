const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const multer = require("multer");
var request = require('request');
var jwt = require('jsonwebtoken');

const pool = mysql.createPool({
    host: "localhost",
    database: "proyeksoa",
    user: "root",
    password: ""
});

const storage = multer.diskStorage({
    destination: function(req,file,callback)
    {
        callback(null,'./uploads');
    },

    filename: function(req,file,callback)
    {
        const filename = file.originalname.split(".");
        const extension = filename[1]
        callback(null, Date.now() + "." + extension)
    }
});

const upload = multer({storage: storage}).single('profilepicture');

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

router.get("/userlist",async function(req,res)
{
    try
    {
        let conn = await getconnection()
    
        let query = await executeQuery(conn,`select username from user`)
    
        conn.release();

        res.status(200).send(query);
    }

    catch (error)
    {
        res.status(500).send(error);
    }
});

router.get("/login",async function(req,res)
{
    try
    {
        if(req.body.email === ""||req.body.password === "")
        {
            res.status(400).send("bad request! fill all data!");
        }

        else
        {
        let conn = await getconnection()
    
        let query = await executeQuery(conn,`select email,password,aut_key from user where email = "${req.body.email}"`)
    
        conn.release();

        console.log(query);

        if(req.body.email != query[0].email || req.body.password != query[0].password)
        {
            res.status(401).send("wrong email or password");
        }

        else
        {
            let kunci = "api key : " + query[0].aut_key;
            res.status(200).send(kunci);    
        }
        }
    }

    catch (error)
    {
        res.status(500).send(error);
    }
});

router.post("/register",upload,async function(req,res)
{
    const namafilefoto = req.file.filename.toString();

    try
    {

        if(req.body.username === ""||req.body.password === "" || req.body.email === "" || namafilefoto === "")
        {
            res.status(400).send("bad request! fill all data!");
        }

        else
        {
        let conn = await getconnection()
    
        let query = await executeQuery(conn,`insert into user (username,password,email,photo,type,date,aut_key) values ("${req.body.username}","${req.body.password}","${req.body.email}","${namafilefoto}","free","unlimited","zzz")`)
    
        conn.release();

        res.status(200).send("OK");
        }
    }

    catch (error)
    {
        res.status(500).send(error);
    }       
});

router.put("/updateuser",async function(req,res)
{
    try
    {
        let conn = await getconnection()
    
        let query = await executeQuery(conn,`update user set username = "${req.body.username}" where email = "${req.body.email}"`)
    
        conn.release();

        res.status(200).send(query);
    }

    catch (error)
    {
        res.status(500).send(error);
    } 
});
    
router.delete("/deleteuser",async function(req,res)
{
    try
    {
        let conn = await getconnection()
    
        let query = await executeQuery(conn,`delete from user where email = "${req.body.email}"`)
    
        conn.release();

        res.status(200).send(query);
    }

    catch (error)
    {
        res.status(500).send(error);
    }   
});

module.exports = router 