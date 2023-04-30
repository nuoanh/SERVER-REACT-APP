const express = require('express')
const path = require('path')
const hbs = require('express-handlebars');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./app/config/db');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("a user connected :D" + socket.id);
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
    });
});


//config port
const port = 3000;
//debug logger
app.use(morgan('combined'));
app.use(cookieParser());


//config absoluted direction
app.use(express.static(path.join(__dirname, '/public/')))
app.use('/admin', express.static(path.join(__dirname, '/public/')))
app.use('/admin/home', express.static(path.join(__dirname, '/public/')))
app.use('/admin/admin-product', express.static(path.join(__dirname, '/public/')))
app.use('/category', express.static(path.join(__dirname, '/public/')))
app.use('/product', express.static(path.join(__dirname, '/public/')))
app.use('/buy-now/:slug', express.static(path.join(__dirname, '/public/')))
app.use('/blog', express.static(path.join(__dirname, '/public/')))






// config template handlebar.engine
app.engine('.hbs', hbs.engine({
    extname: 'hbs'
}
));
app.set('view engine', 'hbs');
app.set('views', './src/resources/views')

app.use(express.json());
app.use(express.urlencoded());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//link routes
route(app)
//connect to db
db.connect()


//run app
server.listen(port, () => console.log(`Your app run on port: ${port}`))
