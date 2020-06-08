const express = require("express");
const cors = require('cors');
const countrylists = require("./routes/countrylist");
const nearestcitys = require("./routes/nearestcity");
const latitudelongitudes = require("./routes/latitudelongitude");
const statelists = require("./routes/statelist");
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/api/countrylist",countrylists);
app.use("/api/nearestcity",nearestcitys);
app.use("/api/latitudelongitude",latitudelongitudes);
app.use("/api/statelist",statelists);

app.listen(3000, function(){
    console.log("Listening to port 3000");
});

//iqair.com
//airvisual
//key
//e00e72e8-d53b-40ba-9cae-cb9a21f88fd3