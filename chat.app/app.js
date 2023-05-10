const http = require("http");

const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
    fs.readFile('username.txt',(err,data)=> {
        if(err) {
            console.log(err);
            data = 'No chaat Exists'
        }
        res.send(
            `${data}<form action="/" method="POST" onSubmit ="document.getElementById('username').value=localStorage.innerHTMLgetItem('username')">
                <input type="text" name="message" id="message" placeholder="meassage">
                <input type="hidden" name="username" id="username">
                <br/>
                <button type ="submit">Send</button>
                </form>`
          );
    })
  
});

app.post("/", (req, res) => {
  console.log(req.body.username);
  console.log(req.body.message);
  fs.writeFile(
    "username.txt",
    `${req.body.username}:${req.body.message}`,{flag:'a'},
    (err) => 
      err ? console.log(err):res.redirect("/")
  );
});

app.get('/login',(req,res)=>{
    res.send(
        `<form action="/login" method="POST" onSubmit="localStorage.setItem('username')">
        <input type="text" placeholder="username" name="username" id="username">
        <br/>
        <button type="submit">login</button>
      </form>`
    )
})

app.post("/login", (req, res) => {
  console.log(req.body.username);
  console.log(req.body.message);
  fs.writeFile(
    "username.txt",
    `${req.body.username}`,{flag:'a'},
    (err) => 
      err ? console.log(err):res.redirect("/")
  );
});


app.listen(3000, () => {
  console.log(" Server is Running ");
});
