const fs = require("fs")
const express = require("express")

const app = express();

//default URL = Health check
app.get("/", (req,res) => {
    res.status(200).json({
        "status": "Success",
        "message": "Application is running... "
    })
})

//if(req.url === /"melinda") {}
app.get('/melinda', (req,res) => {
    res.status(200).json({
        "message":"Ping Successfully !"
    })
})

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
})