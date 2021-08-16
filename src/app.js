const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')


//Setup path for express config
const publicDir= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT||3000
//Setup handlebar engine and view path 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup public directory to us
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Arun'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Arun'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helptext:'Test app',
        name:'Arun'
    })  
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Provide search term"
        })
    }
    console.log(req.query.search)
    res.send({
        product: 'Applee',
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Provide address term"
        })
    }
    geocode(req.query.address, (error,{Latitude,Longitude,Place}={}) =>{
        if(error){
            return res.send({error})
        }
        forecast(Latitude,Longitude,(error,forecastdata)=>{
            if(error){
               return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location:Place,
                address: req.query.address
            })
            
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error',
        errorMessage:'Error - Help Article not found',
        name:'Arun'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error',
        errorMessage:'Error 404 - Page not found',
        name:'Arun'
    })
})
app.listen(port, ()=>{
    console.log('Server is up on port 3000')
})