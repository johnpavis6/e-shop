const dir = "admin/";
var connection = require('../db').connection;

module.exports.home = function(req, res) {
    res.render(dir + 'login.ejs');
}

module.exports.login = function(req, res) {
    console.log(req.body)
    connection.query('select * from admins where id=? and password=?', [req.body.username, req.body.password],
        function(err, results) {
            if (err) {
                res.status(500).send('Error on check');
                return;
            }
            if (!results.length) {
                res.status(401).send('Invalid credentials');
                return;
            }
            req.session.admin = results[0];
            res.sendStatus(200);
        });
}

module.exports.logout = function(req, res) {
    req.session.admin = null;
    res.redirect('/admin');
}

module.exports.dashboard = function(req, res) {
    res.render(dir + 'dashboard.ejs', { admin: req.session.admin });
}

module.exports.products = function(req, res) {
    connection.query('select * from products', function(err, results) {
        res.json({ products: results });
    });
}

module.exports.addProduct = function(req, res) {
    connection.query('insert into products set ?', [req.data], function(err, results) {
        console.log(err);
        if (err) {
            res.status(500).send('Error on insert');
            return;
        }
        res.json({ insertId: results.insertId });
    });
}

module.exports.updateProduct = function(req, res) {
    connection.query('update products set ? where id=?', [req.data, req.body.id], function(err, results) {
        console.log(err);
        if (err) {
            res.status(500).send('Error on update');
            return;
        }
        res.sendStatus(200);
    });
}

module.exports.deleteProduct = function(req, res) {
    connection.query('delete from products where id=?', [req.body.id], function(err, results) {
        console.log(err);
        if (err) {
            res.status(500).send('Error on delete');
            return;
        }
        res.sendStatus(200);
    });
}