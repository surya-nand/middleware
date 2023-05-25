const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//Attaching or using middleware in the server
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))
//Dummy data for understanding database concept

const dummyData = [
    {username: 'surya' , email: 'suryaanand10@gmail.com', password:"abcdef" }
]

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

//Redirecting login page to landing page
app.post('/login',(req,res)=>{
    //Checking the data from input with database
    let Users =  dummyData.filter(user => user.email===(req.body.email) && user.password===(req.body.password))
    let user = Users[0]
    if(user){
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