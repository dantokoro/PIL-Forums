var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User       = require('../../models/user.model');

var myLocalConfig = (passport) => {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy(
        function(username, password, done) {
            console.log(username + "---" + password);
            if (username)
                username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            // asynchronous
            process.nextTick(function() {
                User.findOne({ 'username' :  username }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false);

                    if (!user.validPassword(password))
                        return done(null, false);

                    // all is well, return user
                    else
                        return done(null, user);
                });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with username
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, username, password, done) {
            if (username)
                username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            var email = req.body.email;

            // asynchronous
            process.nextTick(function() {
                // if the user is not already logged in:
                if (!req.user) {
                    User.findOne({ 'username' :  username }, function(err, user) {
                        // if there are any errors, return the error
                        if (err)
                            return done(err);

                        // check to see if theres already a user with that username
                        if (user) {
                            return done(null, false);
                        } else {
                            // create the user
                            var newUser            = new User();

                            newUser.email    = email;
                            newUser.password = newUser.generateHash(password);
                            newUser.username    = username;

                            newUser.save(function(err) {
                                if (err)
                                    return done(err);

                                return done(null, newUser);
                            });
                        }

                    });
                    // if the user is logged in but has no local account...
                } else if ( !req.user.username ) {
                    // ...presumably they're trying to connect a local account
                    // BUT let's check if the username used to connect a local account is being used by another user
                    User.findOne({ 'username' :  username }, function(err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            return done(null, false);
                            // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                        } else {
                            var user = req.user;
                            user.username = username;
                            user.password = user.generateHash(password);
                            newUser.email    = email;
                            user.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null,user);
                            });
                        }
                    });
                } else {
                    // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                    return done(null, req.user);
                }

            });

        }));

        // passport.use(new FacebookStrategy({
        //     clientID: "1665785526894252",
        //     clientSecret: "c9c8c06d02ff1c7cff1062f074fa2ee9",
        //     callbackURL: "http://127.0.0.1:8000/auth/facebook/callback"
        //   },
        //   function(accessToken, refreshToken, profile, done) {
        //       console.log("Profile in strategy: ", profile);
        //     User.findOrCreate({username: profile.displayName}, {username: profile.displayName,facebook_id: profile.id}, function(err, user) {
        //         console.log("in fb strategy...");
        //         if (err) { return done(err); }
        //       done(null, user);
        //     });
        //   }
        // ));

        passport.use(new GoogleStrategy({
            clientID: "969479872337-i5lfj0mi6h1df63p1p3e97o77cn1hd7q.apps.googleusercontent.com",
            clientSecret: "pKSTQyWevZ25rvfZYxy4AYj3",
            callbackURL: "http://127.0.0.1:8000/auth/google/callback"
          },
          function(accessToken, refreshToken, profile, done) {
            //   console.log("Google profile: ", profile);
            //    User.findOrCreate({ google_id: profile.id }, { username: profile.displayName,google_id: profile.id }, function (err, user) {
            //      return done(err, user);
            //    });
            User.findOne({
                'google_id': profile.id 
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                    user = new User({
                        google_id: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        avatar_url: profile.photos.value
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    //found user. Return
                    return done(err, user);
                }
            });
          }
        ));
        
        
};

module.exports = myLocalConfig;