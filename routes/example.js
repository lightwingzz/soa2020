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

/*
router.get("/", async function(req, res){
    try
    {
        res.status(200).send(await getcountrylist(req.query.countrylist));
    }

    catch (error)
    {
        res.status(500).send(error);
    }
});
*/

router.get("/",function(req,res)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            return res.status(500).send(err);
        }

        const query = "insert into country (country_name) values('indonesia')";

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
///////////////////////////////////////////////////////////////////////
function getconnection()
{
    return new Promise(function(resolve,reject)
    {
        pool.getConnection(function(err,conn)
        {
            if(err)
            {
                console.log("err");
                reject(err);
            }

            else
            {
                console.log("res");
                conn.release();
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

router.post("/", async function(req, res){
try
  {
    let kembalian = await getcountrylist(req.query.countrylist);
    kembalian = JSON.parse(kembalian);

    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            return res.status(500).send(err);
        }
      
        for (let i = 0; i < kembalian.data.length; i++) {
            //executeQuery(conn,"insert into country (country_name) values('"+kembalian.data[i].country+"')");
            const query = "insert into country (country_name) values('"+kembalian.data[i].country+"')";
        
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

        console.log("ok");
    
    //    const query = "insert into country (country_name) values('indonesia')";
        
    }); 

        const conn = await getconnection();
        console.log(conn);
        executeQuery(conn,"insert into country (country_name) values('tole')");
        conn.release();

      /*
      let kembalian = await getcountrylist(req.query.countrylist);
      kembalian = JSON.parse(kembalian);
      
        for (let i = 0; i < kembalian.data.length; i++) {
            console.log("a:"+kembalian.data[i].country)
            const conn = await getconnection();
            executeQuery(conn,"insert into country (country_name) values('"+kembalian.data[i].country+"')");
            conn.release();
        }

        console.log("ok");
      */

      /*
      
      kembalian.data.forEach((item, i) => {
          console.log(item.country);
          //dibawah ini tinggal mau ngapain terserah
          //misal mau masukan semua negara ke db
            const conn = getconnection();
            executeQuery(conn,`insert into country values('0','${item.country}')`);
            conn.release();
      });

      */
  }

  catch (error)
  {
      res.status(500).send(error);
  }
});

module.exports = router


/*
const express = require("express");
const router = express.Router();
const app = express();
var request = require('request');

function getcountrylist(countrylist)
{
    return new Promise(function(resolve,reject)
    {
        var options =
        {
            'method': 'GET',
            'url': 'https://api.airvisual.com/v2/countries?key=e00e72e8-d53b-40ba-9cae-cb9a21f88fd3'
        };

        request(options, function(error,response)
        {
            if(error) reject(new Error(error));
            else resolve(response.body);
        });
    })
}

app.get("/", async function(req, res){
    try
    {
        res.status(200).send(await getcountrylist(req.query.countrylist));
    }

    catch (error)
    {
        res.status(500).send(error);
    }
});

app.post("/", async function(req, res){
  try
  {
      let kembalian = await getcountrylist(req.query.countrylist);
      kembalian = JSON.parse(kembalian);
      kembalian.data.forEach((item, i) => {
          console.log(item.country);
          //dibawah ini tinggal mau ngapain terserah
          //misal mau masukan semua negara ke db
      });
  }

  catch (error)
  {
      res.status(500).send(error);
  }
});

//app.listen(3000,()=>{ console.log("listening port 3000") })

module.exports = router
*/