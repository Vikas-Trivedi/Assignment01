exports.home = function(req, res, next) {
    res.render('index', { 
        title: 'Home',
        userName: req.user ? req.user.username : '' 
    });
}

exports.projects = function(req, res, next) {
    res.render(
        'index', 
        { 
            title: 'Projects',
            userName: req.user ? req.user.username : '' 
        }
    );
}