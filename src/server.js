
const path = require ('path')
const express = require ('express')
const User = require('./models/user')
const userRouter = require('./routers/user')
const hbs = require ('hbs')
const app = express()
const port = process.env.PORT || 3000  //setup port

//define paths for express config
const publicDirectoryPath = path.join (__dirname, '../public')
const viewsPath = path.join (__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const bodyParser = require('body-parser')

require('./db/mongoose')


//Setup handlebars engine and views location
app.set ('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
//call json to parse data
app.use(express.json())
app.use(userRouter)
app.use(sapnumRouter)



//*********************ROUTES SITES****************
app.get('', (req, res) => {
    res.render('index', {
        title: 'SAP FIELD Support',
        name: 'Glenn Sanford'
    })
})

app.get('/saphome', (req, res) => {
    res.render('index', {
        title: 'SAP FIELD Support',
        name: 'Glenn Sanford'
    })
})

app.get('/sap-sr', function(req,res){
    res.render('sap-sr', {
        title: 'SAP Script Runner',
        name: 'Glenn Sanford'
    })
})

// POST /login gets urlencoded bodies
app.post('/sap-sr', urlencodedParser, function (req, res) {

    const fs = require('fs')
    fs.writeFileSync('../sap-web/vbs/sap/zi01/sapSrc.txt',req.body.sapnum)
    console.log('Complete')

        'use strict';
    
        const spawn = require( 'child_process' ).spawnSync,
       
        vbs = spawn('cscript.exe',['../sap-web/vbs/sap/zi01/fixETMStaging.vbs', 'one' ] )
        
        res.send('IDOC was submitted')

})

      
//listen for app on port 3000
app.listen(port,() =>{
    console.log('Server is up on port ' + port)

})