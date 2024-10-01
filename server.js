const fs = require("fs")
const express = require("express")

const app = express();

app.use(express.json());


//default URL = Health check
app.get("/", (req,res) => {
    res.status(200).json({
        "status": "Success",
        "message": "Application is running... "
    })
})

//Jika meggunakan HTTP module if(req.url === /"melinda") {}
app.get('/melinda', (req,res) => {
    res.status(200).json({
        "message":"Ping Successfully !"
    })
})

const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
);

// kaidah rest api = /api/v1/collectionnya +> collectionnya harus JAMAK
app.get("/api/v1/cars", (req,res) => {
    res.status(200).json({
        "status": "Succes",
        "message":"Success get cars data",
        "isSuccess": true,
        "totalData": cars.length,
        "data": {
            cars
        },
    });
});

app.post("/api/v1/cars", (req, res) => {
    // insert into .....

    const newCar = req.body;

  cars.push(newCar);

  fs.writeFile(
    `${__dirname}/assets/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        "status": "Success",
        "message": "Success add new car data",
        "isSuccess": true,
        "data": {
          "car": newCar,
        },
      });
    }
  );
});


// middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada di aplikasi
// membuat middleware = our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        "status": "Failed",
        "message": "API not exist!"
    })
})



app.listen("3000",()=> {
    console.log("Start aplikasi di port 3000")
});