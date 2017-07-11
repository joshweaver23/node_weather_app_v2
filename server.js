const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const request = require( 'request' );
const app = express();
const port = process.env.PORT || 3000;
const apiKey = '06b45bef46b527ac6cf299802650ff06'; // Enter API key from here https://home.openweathermap.org/api_keys

app.set( 'view engine', 'ejs' );
app.use( express.static( __dirname + '/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.locals.weather = '';
app.locals.error = '';

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