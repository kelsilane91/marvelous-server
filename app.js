// import package dependencies
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
import bb from 'express-busboy';

// import routes
import routes from './routes/marvelous.server.route';

// define our app using express
const app = express();

// express-busboy to parse multipart/form-data
bb.extend(app)

// allow cors
app.use(function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set port
const port = process.env.PORT || 3001;

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/marvelous', {
    useMongoClient: true,
});

// add Source Map Support
SourceMapSupport.install();

app.use('/api', routes);

app.get('/', (request, response) => {
    response.end('Api Working');
});

// catch 404
app.use((request, response, next) => {
    response.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// start the server
app.listen(port, () => {
    console.log(`App Server listening at port ${port}`);
});