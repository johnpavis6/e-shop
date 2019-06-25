module.exports.login = function(req, res, next) {
    next();
}

module.exports.isLoggedIn = function(req, res, next) {
    if (!req.session.admin) {
        if (req.method == 'POST') {
            res.status(401).send('Session expired');
        } else {
            res.redirect('/admin');
        }
        return;
    }
    next();
}

module.exports.productInfo = function(req, res, next) {
    var data = {
        name: req.body.name,
        price: req.body.price
    };
    req.data = data;
    next();
}