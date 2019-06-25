var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
    secret: 'Its secret',
    resave: false,
    saveUninitialized: true,
}))

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/js', express.static('./node_modules/jquery/dist/'));
app.use(express.static('./node_modules/bootstrap/dist/'));
app.use('/js', express.static('./node_modules/angular/'));
app.use(express.static('./public/'))

var userRouter = require('./routers/user');
app.use('/', userRouter);
var adminRouter = require('./routers/admin');
app.use('/admin', adminRouter);

const port = 5000;
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port}`);
    }
});