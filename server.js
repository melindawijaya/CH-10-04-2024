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

app.get("/api/v1/cars/:id", (req, res) => {
    // select * from fsw2 where id="1" OR NAME ="Budi".....
    const id = parseInt(req.params.id);
    console.log(req.params.id);

    // == tipe datanya tidak harus sama 
    // === tipe datanya harus sesuai

    const car = cars.find((i) => i?.id === id);

    // salah satu basic error handling, 
    if(!car){
        console.log("no data");
        return res.status(404).json({
            "status": "Failed",
            "message": `Failed get this car data, id : ${id}`,
            "isSuccess": false,
            "data": null,
        });
    }

    res.status(200).json({
        "status": "Success",
        "message": "Success",
        "isSuccess": true,
        "data": {
            car
        },
    });

});

// put -> menulis ulang / rewrite
// patch -> menambal

app.delete("/api/v1/cars/:id", (req, res) => {
    const id = req.params.id * 1;
    // UPDDATE ... FROM (table) WHERE id=req.params.id
    
    // object destructuring
    const {name, year, type} = req.body;

    // mencari data by id nya
    const car = cars.find((i) => i?.id === id);

    // mencari index nya
    const carIndex = cars.findIndex((car) => car?.id === id)    
    console.log(carIndex);

    if(!car){
        console.log("no data");
        return res.status(404).json({
            "status": "Failed",
            "message": `Failed get this car data, id : ${id}`,
            "isSuccess": false,
            "data": null,
        });
    }

    // update sesuai request body nya (client/customer)
    // object assign = menggunakan objek spread operator
    cars[carIndex] = {...cars[carIndex], ...req.body};

    // delete
    cars.splice(carIndex, 1)

    // get new data for respond API
    const newCar = cars.find((i) => i?.id === id);

    // MASUKAN / REWRITE DATA JSON dalam file
    fs.writeFile(
        `${__dirname}/assets/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
          res.status(201).json({
            "status": "Success",
            "message": `Success delete car data, id :${id}`,
            "isSuccess": true,
            "data":null,
          });
        }
      );
});

app.patch("/api/v1/cars/:id", (req, res) => {
    const id = req.params.id * 1;
    // UPDDATE ... FROM (table) WHERE id=req.params.id
    
    // object destructuring
    const {name, year, type} = req.body;

    // mencari data by id nya
    const car = cars.find((i) => i?.id === id);

    // mencari index nya
    const carIndex = cars.findIndex((car) => car?.id === id)    
    console.log(carIndex);

    if(!car){
        console.log("no data");
        return res.status(404).json({
            "status": "Failed",
            "message": `Failed get this car data, id : ${id}`,
            "isSuccess": false,
            "data": null,
        });
    }

    // update sesuai request body nya (client/customer)
    // object assign = menggunakan objek spread operator
    cars[carIndex] = {...cars[carIndex], ...req.body};

    // get new data for respond API
    const newCar = cars.find((i) => i?.id === id);

    // MASUKAN / REWRITE DATA JSON dalam file
    fs.writeFile(
        `${__dirname}/assets/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
          res.status(201).json({
            "status": "Success",
            "message": `Success update car data, id :${id}`,
            "isSuccess": true,
            "data":{
                newCar
            }
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