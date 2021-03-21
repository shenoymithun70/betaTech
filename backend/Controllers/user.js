const User = require('../Models/user')
const Admin = require('../Models/admin')
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");   

 exports.signUp = (req,res) => {
    const reqBody = req.body;
    const email = reqBody.email;
    const pwd = req.body.password
    const FN = reqBody.firstname;
    const LN = reqBody.lastname;
    const username = reqBody.username;

    const userObj = new User({ email: email,username:username, password: pwd, firstname: FN, lastname: LN, userType: "User" });

    userObj.save()
        .then(response => {
            res.status(200).json({ message: "User Registered Successfully" })
        })
        .catch(err => { res.status(500).json({ error: err }) })

}

exports.login =(req,res) => {
  const reqBody = req.body;
  const username  = reqBody.username;
  const pwd = reqBody.password
  User.find({ username:username })
      .then(user => {
          console.log(user)
          if (user.length == 0) {
              res.status(404).send({ message: "User Not found." });
          }

            var token = jwt.sign({ id: user[0].id }, config.secret, {
              expiresIn: 86400 // 24 hours
            });

            const isMatch = bcrypt.compare(pwd, user[0].password)

            if(!isMatch){
              res.status(400).json({error:"Invalid Credentials"})
            }
            else{ 
              res.status(200).json({
                id: user[0]._id,
                username: user[0].username,
                userType: user[0].userType,
                email: user[0].email,
                accessToken: token
              });
            }
            
           
      })
      .catch(err => { console.log(err); res.status(500).json({ error: err }) })
}

exports.adminLogin = (req,res) => {
    const reqBody = req.body;
    const username  = reqBody.username;
    const pwd = reqBody.password
    Admin.find({ username:username})
        .then(admin => {
            console.log(admin)
            if (admin.length == 0) {
                res.status(404).send({ message: "Admin Not found." });
            }
              var token = jwt.sign({ id: admin[0].id }, config.secret, {
                expiresIn: 86400 // 24 hours
              });

              const isMatch = bcrypt.compare(pwd, admin[0].password)

              if(!isMatch){
                res.status(400).json({error:"Invalid Credentials"})
            }
            
              res.status(200).json({
                id: admin[0]._id,
                username: admin[0].username,
                userType: admin[0].userType,
                email: admin[0].email,
                accessToken: token
              });
             
        })
        .catch(err => { console.log(err); res.status(500).json({ error: err }) })
}