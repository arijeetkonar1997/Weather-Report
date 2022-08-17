const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({encoded:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="cced1c7fe344c603d0f1486ef0491816";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;//getting live data using an api
  https.get(url,function(response){//making the http get request to get the data as JSON format
     console.log(response.statusCode);
     response.on("data",function(data){
       const weatherData=JSON.parse(data);//parsing the data
       const temp=weatherData.main.temp;//and getting
       const weatherDescription=weatherData.weather[0].description;//the specific data
       const icon=weatherData.weather[0].icon;//that we want
       const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";//sending it back to the browser
       res.write("<p>The weather is currently"+weatherDescription+"<p>");//using the html that
       res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius.</h1>");//we want to write
       res.write("<img src="+imageURL+">");//we can have multiple res.write and
       res.send();//only one res.send
    });
  });
});

app.listen("3000",function(){
  console.log("Server is up and running at port 3000");
});
