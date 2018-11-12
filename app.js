var express = require('express');
var Sequelize = require('sequelize');
var exphbs = require('express-handlebars');
var path = require('path');
const bodyParser = require('body-parser')

var app = express();
//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 50000 }));
// View Engine and path
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
//Sequelize


var sequelize = new Sequelize('demo_schema', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    insecureAuth: false,
    timezone: "+05:30"

});

var Article = sequelize.define('Article Collection', {

    no: Sequelize.TEXT,
    aname: Sequelize.TEXT,
    desc: Sequelize.STRING,
    author: Sequelize.TEXT
}, {
    freezeTableName: true,
    operatorsAliases: false
});



app.get('/', function(req, res) {
    res.render('index');
});



app.get('/view', function(req, res) {
    // console.log('In Server');

    // Article.findAll().spread(function(result, test) {
    //     productsDataToUse = result.get({
    //         plain: true
    //     });
    //     console.log('Find all :', productsDataToUse)
    //     res.send(productsDataToUse);
    // })

    Article.all().then(projects => {
        // console.log(projects);
        res.send(projects);

    })

});

// app.put('/edit', function(req, res) {
//     console.log(req.body);

// })

app.put('/edit', (req, res) => {
    //({ where: { id: req.body.id } })

    console.log('Edit ', req.body)

    Article.all({ where: { id: req.body.id } }).then(() => {
        return Article.update({ aname: req.body.aname, desc: req.body.desc, author: req.body.author }, { where: { id: req.body.id } }).then(() => {
            Article.all().then(projects => {
                //console.log(projects);
                res.send(projects);

            })
        })
    })


    // Article.update({ aname: req.body.aname, desc: req.body.desc, author: req.body.author }).then(function() {
    //     // title will now be 'foooo' but description is the very same as before
    //     console.log('updated i guess');
    // })



});


app.post('/add', (req, res) => {

    //  console.log('In post');
    // console.log('body1 : ', req.body.aname)
    // console.log('body2: ', req.body.desc)
    // console.log('body3 : ', req.body.author)

    console.log(req.body);

    sequelize.sync({ force: false }).then(function() {
        var articleinstance = {
            no: req.body.id,
            aname: req.body.aname,
            desc: req.body.desc,
            author: req.body.author
        }
        Article.create(articleinstance)
    })
    res.send(req.body)



    // res.redirect('/');


})



app.listen(3000, function() {
    console.log('Server Started on Port 3000');

});