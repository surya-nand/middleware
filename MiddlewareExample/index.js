const express = require('express')
const bodyParser = require('body-parser')

const app = express()


//Attaching or using middleware in the server
app.use(bodyParser.urlencoded({extended: false}))


//Custom middleware

const checkAccess= (req,res,next) =>{
    let access = true
    if(access){
        next()
    } 
    else{
        res.send('Access Denied')
    }
}
app.use(checkAccess)
app.use(express.static('./public'))

//Dummy data for understanding database concept

const dummyData = {
    "suryaanand10@gmail.com" : {password:"123", loggedIn: false},
    "hastagsurya10@gmail.com":{password:"456", loggedIn: false}
}

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

//Redirecting login page to landing page
app.post('/login',(req,res)=>{
    //Checking the data from input with database
    if(dummyData[req.body.email]  && dummyData[req.body.email].password === req.body.password ){
        dummyData[req.body.email].loggedIn === true
        res.redirect('/landingpage')
    }
    else{
        res.redirect('/signuppage')

    }
    
    console.log(req.body)
})

app.get('/landingpage',(req,res)=>{
    res.send("Landing page")
})

app.get('/signuppage',(req,res)=>{
    res.send("You have create an account to access this page")
})

app.listen(4000, ()=>{
    console.log("Server is running on port 4000")
})