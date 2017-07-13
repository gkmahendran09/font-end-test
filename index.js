// require dependencies
const express = require('express')
const history = require('connect-history-api-fallback');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// --------------------------------------------------------------
// Setting up Passport for User Authentication
// --------------------------------------------------------------
let users = [
    { id: 1, username: 'john@example.com', password: 'test123', name: 'John Doe'}
    , { id: 2, username: 'passport@example.com', password: 'test1234', name: 'Passport'}
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
));




// --------------------------------------------------------------
// The Express app
// --------------------------------------------------------------
const app = express()

// --------------------------------------------------------------
// Use history api fallback to enable client-side html5 routing
// --------------------------------------------------------------
app.use(history());

// --------------------------------------------------------------
// Setup session
// --------------------------------------------------------------

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret: 'hf-test-123'
}));
app.use(passport.initialize());
app.use(passport.session());

// --------------------------------------------------------------
// Routes
// --------------------------------------------------------------

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            let url = '/?error=1';
            if(req.query.redirect != '' && req.query.redirect != '/' && req.query.redirect)
                url = url + `&redirect=${req.query.redirect}`;
            return res.redirect(url);
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            let url = '/review/';
            if(req.query.redirect != '' && req.query.redirect != '/' && req.query.redirect)
                url = req.query.redirect;
            res.redirect(url);
        });
    })(req, res, next);
});


app.post('/logout', function(req, res){
    req.logout();
    res.redirect('/?success=1');
});

app.post('/auth', function(req, res) {
    if(req.isAuthenticated())
        res.send(true);
    else
        res.send(false);
})


// --------------------------------------------------------------
// Express Settings
// --------------------------------------------------------------

// setup static path
app.use(express.static('dist'))

// listen on port
app.listen(process.env.PORT || 3000)
