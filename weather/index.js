
const http = require("http");
const fs = require("fs");
const requests = require("requests");
const ourPage = fs.readFileSync("page.html", "utf-8");
var city = "http://api.openweathermap.org/data/2.5/weather?q=Lahore&units=metric&appid=58afb5abf1ef89445ea36e781663f727";

const server = http.createServer((req, res) => {

    const replaceVal = (tempVal, orVal) => {
        let temperature = tempVal.replace("{%city%}", orVal.name);
        temperature = temperature.replace("{%contry%}", orVal.sys.country);
        temperature = temperature.replace("{%min%}", orVal.main.temp_min);
        temperature = temperature.replace("{%max%}", orVal.main.temp_max);
        temperature = temperature.replace("{%tempa%}", orVal.main.temp);
        return temperature;
    }

    // if (req.url == "/city") {
    //     console.log(req.body.data);
    //     city="http://api.openweathermap.org/data/2.5/weather?q="+req.body.data+"&units=metric&appid=58afb5abf1ef89445ea36e781663f727";
    //     requests(city)
    //         .on('data', function (chunk) {
    //             var objData = JSON.parse(chunk);
    //             var arrData = [objData];
    //            const realtimeData=arrData.map((val)=> replaceVal(ourPage,val)).join("");
    //            res.write(realtimeData);


    //         })
    //         .on('end', (err) => {
    //             if (err) return console.log('connection closed due to errors', err);
    //             res.end();
    //         });
    //     }

    if (req.url == "/") {
        requests(city)
            .on('data', function (chunk) {
                var objData = JSON.parse(chunk);
                var arrData = [...objData];
                const realtimeData = arrData.map((val) => replaceVal(ourPage, val)).join("");
                res.write(realtimeData);
              //  console.log(realtimeData);

            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });


    }


});
server.listen(8800, "0.0.0.0");