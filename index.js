const express = require("express");
const {History} = require("./db/database");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/sum", async (req, res)=>{

    const a = req.body.a;
    const b = req.body.b;

    // if data already present
    try{
        const getResult = await History.findOne({a, b});
        if(getResult){
            res.send({
                message: "Data already present",
                result: getResult.result
            })
        }
        else{
            const result = a + b;
            const addHistory = await History.create({
                a,
                b,
                result
            });
            if(addHistory){
                res.send({
                    message: "Data Stored Succesfully",
                    result: addHistory.result
                });
            }
            else{
                res.send({
                    message: "Failed to stored data!"
                });
            }
        }
    }
    catch(error){
        res.status(500).send({
            message: "Internal Server Error or Input is not Correct"
        });
    }
});

app.listen(port, ()=>{
    console.log(`Server Running Successfully on ${port}`);
});