const express = require("express");
const app = express();
const port = 3000;
let userinfo={
    Displayusername: String,
    Displayemail:String
};
/* let Displayusername="";
let Displayemail=""; */
const empCollection = require("./model/model");
let alert = require('alert'); 
app.use(express.static("public"));
app.set("view engine", "ejs");
require("./db/db");
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("index", { title: "Royality, always be royal" });
});
app.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign in" });
});

app.get("/booked", (req, res) => {
  res.render("booked", { title: "Confirmed" });
});
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign up" });
});
app.get("/menu", (req, res) => {
  res.render("menu", { title: "Menu" });
});
app.post('/empdata', async (req, res) => {
 try {
    const password= req.body.password
    userinfo.Displayemail=toString(req.body.email)
    userinfo.Displayusername=toString(req.body.name)

    const cpassword= req.body.cpassword
    if(password==cpassword){
      const empData=empCollection({
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          cpassword:req.body.cpassword,
          
      })
      const postData=await empData.save();
      /* console.log(postData); */
      res.render("menu")
    }else{
        res.render("signup", { title: "Sign up" })
      alert("Passwords are not matching")
    }
 } catch (error) {
    console.log(error);
 }
});

app.post('/loginPage', async (req, res) =>{
   try {
    const email= req.body.email
    const password= req.body.loginpassword

    const getEmail= await empCollection.findOne({email:email})
    if(getEmail===null){
        res.render("signin", { title: "Sign in" });
        alert("Wrong Credentials")
      
    }else{
        if(getEmail.email===email &&getEmail.password===password  ){
            
            res.render('menu')
        }else{
            res.render("signin", { title: "Sign in" });
            alert("Wrong Credentials")
        }
        
    }
   } catch (error) {
    console.log(error);
   }
})
app.get("/user", (req, res) => {
    res.render("user", { title: "User" , username:userinfo.Displayusername, emailid:userinfo.Displayemail  });
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
