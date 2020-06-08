const mysql = require("mysql");

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

//dalam function ada await? kasi async
async function insert(nama, pp)
{
    const query = `insert into account values (null,'${name}','uploads/${pp}')`;
    const query2 = `select * from account where id=${result.insertId}`;
    const conn = await getConnection();
    const result = await executeQuery(conn,query);
    const result2 = await executeQuery(conn,query2);
    
    return result2[0];
}

module.exports = {
    insert: insert
}