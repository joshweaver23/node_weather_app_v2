const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const request = require( 'request' );
const app = express();
const port = 3000;
const apiKey = ''; // Enter API key here

app.set( 'view engine', 'ejs' );
app.use( express.static( 'public/' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.get( '/', ( req, res ) => {
    res.render( 'index' );
} )

app.post( '/', ( req, res ) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    request( url, ( err, response, body ) => {
        if ( err ) {
            res.render( 'index', { weather: null, error: 'Error, please try again.' } );
        } else {
            let weather = JSON.parse( body );
            if ( weather.main == undefined ) {
                res.render( 'index', { weather: null, error: 'Error, please try again.' } );
            } else {
                let weatherText = `It's ${weather.main.temp} degrees F in ${weather.name}.`;
                res.render( 'index', { weather: weatherText, error: null } );
            }
        }
    } )
} )

app.listen( port, () => {
    console.log( `Listening on port ${port}.` )
} )