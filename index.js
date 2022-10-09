const express = require('express');
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname + "/home.html");
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  fs.readFile(__dirname + "/user.json", "utf-8", (err, data) => {
    if (err) {
      throw err
    } else {
      res.write(data)
      res.end(data)
    }
  })
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  
  let file = fs.readFileSync(__dirname + "/user.json")
  let parsed = JSON.parse(file)
  var username = req.query.username
  var password = req.query.password

  
  let user = parsed.username
  let pass = parsed.password

  if (username == user && password == pass) {
    res.send("Status: True, User is valid.")
    res.end
  }

  if (username != user) {
    res.send("Status: False, User Name is invalid.")
    res.end
  }

  if (password != pass) {
    res.send("Status: False, Password is invalid.")
    res.end
  }
});


/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  var username = req.query.username
  res.send(`<b>${username} successfully logged out.</b>`)
});


app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));