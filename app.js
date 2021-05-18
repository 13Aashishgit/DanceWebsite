const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const app= express();
const port =8000;
// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) //for serving static files
app.use(express.urlencoded())

// PUG SEPCIFIC STUFF
app.set('view engine','pug') //Set the template engine as pug
app.set('views',path.join(__dirname,'views')) //Set the views directory

// END POINTS
app.get('/',(req,res)=>{
    // const con ="This is the best website which makes you dance"
    const params={ } //,'content':con
    res.status(200).render('home.pug',params);
})
app.get("/contact", (req, res)=>{ 
    const params={ }
    res.status(200).render('contact.pug', params);
})
app.post("/contact", (req, res)=>{ 
    var myData =new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the databse");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    })
    // res.status(200).render('contact.pug', myData);
})
// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started sucessfuly on port ${port}`);
});