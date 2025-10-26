const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
app.use(express.json());

let users = []

function user_data(user_detail){
    fs.readFile('./userdata.json','utf-8',(err,data)=>{
        if(err) {
            return err;
        } else {
            users = JSON.parse(data);
        }

        const findExistUser = users.find((u)=>{
            if(u.username === user_detail.username && u.password === user_detail.password) {
                return false;
            } else {
                return true;
                    } 
             })


        if(findExistUser) {
                users.push(user_detail);
                fs.writeFile('./userdata.json',JSON.stringify(users,null,2),(err)=>{
                    if(err) {
                        return err;
                    } else {
                        console.log("Wroted...")
                    }
                })
        } else {
            console.log("User Already Exists...");
            return;
        }
        
            
        })
        

}

app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user_detail = {
        username : username ,
        password : password
    }
    // Adding user in userdata.jsom
                                                            // user_data(user_detail).then(()=>{
                                                            //         res.json({
                                                            //             msg : "Done"
                                                            //         })
                                                            // }).catch(()=>{
                                                            //     res.json({
                                                            //         msg : "Already Exists.,"
                                                            //     })
             
                                                            // })
    let check = user_data(user_detail);

    console.log("Check value : ",check)
    if(check) {
        res.json({
        msg : "Done"
    })
    } else {
    res.json({
        msg : "Already Exists.,"
    })
    }

    
})


app.listen(3000,()=>{
    console.log("Listening on Port 3000...")
})