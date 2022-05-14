const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocodeFile = require('./utils/geocode');
const forecostFile = require('./utils/forecost')
const port = process.env.PORT || 3000 ;

const app = express();

console.log(__dirname)
const publicDirectPath = path.join(__dirname, '../public' );
const templatesPath = path.join(__dirname, '../templates' );
const viewspath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('views', viewspath); 
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
app.use(express.static(viewspath));     //this is for only run the static page templates  

// app.get('', (req,res) => {
//     // res.send('Hello express');
//     res.send('<h1>Wheather</h1>')
// })

app.get('', (req,res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'saicharan'
    });
})

app.get('/about', (req,res) => { 
    res.render('about', {
        title: 'About page',
        name: 'saikiran'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
       title: 'help page', 
       helpText : 'This is some helpful text', 
       name: 'saivarun'
    })
})
// app.get('/help', (req,res) => {
//     // res.send('help page');
//     res.send({
//         name: 'saicharan',
//         age: 25
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About Page</h1>');
// })



app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } 
    geocodeFile.geoCode(req.query.address, (error, data) => {
        if ( error) {
         return  res.send({error})
        } 
        forecostFile.forecost(data.lat , data.long,  (error, data) => {
            if ( error) {
              return res.send({error});
            }
            return res.send({
                    forecast: data.data,
                    address: req.query.address
                });
        });
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'tirupati', 
    //     address: req.query.address
    // });
})
})


app.get('/products', (req,res) => {
    if (!req.query.search) {
       return  res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search);
   res.send({
       products : []
   })
});
 
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'saipavan',
        errorMessage : 'help article not found'
    })
});

 

// app.get('*', (req, res) => {
//    res.render('404', {
//        title: '404',
//        name: 'saipavan',
//        errorMessage : 'Page not found'
//    })
// })

app.listen(port,() => {
    console.log('Server is up on port' + port);
});
