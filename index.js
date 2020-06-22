const express = require("express");
const cors = require('cors');
const request = require("request");
const bodyParser = require("body-parser"); 
const countrylists = require("./routes/countrylist");
const nearestcitys = require("./routes/nearestcity");
const latitudelongitudes = require("./routes/latitudelongitude");
const statelists = require("./routes/statelist");
const countrynames = require("./routes/countryname");
const statenames = require("./routes/statename");
const users = require("./routes/user");
const photos = require("./routes/photo");
const randomkeys = require("./routes/randomkey");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));
app.use("/api/countrylist",countrylists);
app.use("/api/nearestcity",nearestcitys);
app.use("/api/latitudelongitude",latitudelongitudes);
app.use("/api/statelist",statelists);
app.use("/api/countryname",countrynames);
app.use("/api/statename",statenames);
app.use("/api/user",users);
app.use("/api/photo",photos);
app.use("/api/randomkey",randomkeys);

app.listen(3000, function(){
    console.log("Listening to port 3000");
});

//iqair.com
//airvisual
//key
//e00e72e8-d53b-40ba-9cae-cb9a21f88fd3