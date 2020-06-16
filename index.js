const express = require("express");
const cors = require('cors');
const request = require("request");
const countrylists = require("./routes/countrylist");
const nearestcitys = require("./routes/nearestcity");
const latitudelongitudes = require("./routes/latitudelongitude");
const statelists = require("./routes/statelist");
const countrynames = require("./routes/countryname");
const statenames = require("./routes/statename");
const users = require("./routes/user");
const photos = require("./routes/photo");
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/api/countrylist",countrylists);
app.use("/api/nearestcity",nearestcitys);
app.use("/api/latitudelongitude",latitudelongitudes);
app.use("/api/statelist",statelists);
app.use("/api/countryname",countrynames);
app.use("/api/statename",statenames);
app.use("/api/user",users);
app.use("/api/photo",photos);

app.listen(3000, function(){
    console.log("Listening to port 3000");
});

//iqair.com
//airvisual
//key
//e00e72e8-d53b-40ba-9cae-cb9a21f88fd3



/*
function getresep() {
    return new Promise(function(resolve, reject) {
        var options = {
            'method': 'GET',
            'url': `https://api.airvisual.com/v2/countries?key=e00e72e8-d53b-40ba-9cae-cb9a21f88fd3`
          };
        request(options, function (error, response) { 
        if (error) reject(error);
        resolve(response.body);
        });
    });
}
app.get('/api/resep',async function(req,res){
    var hasil = await getresep();
    console.log(hasil)
    const parsing=JSON.parse(hasil);
    console.log(parsing)
    res.send(parsing)

});
*/