const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

const Strategy = require('passport-local').Strategy;

passport.use('user-local', new Strategy({
        usernameField: 'username'
    },
    function(username, password, cb) {
        User.find({
            username: username
        }).exec(function(err, users) {
            if (err) {
                return cb(err);
            }
            if (!users[0]) {
                return cb(null, false);
            }

            let user = users[0];

            bcrypt.compare(password, user.password, (err, isGood) => {
                if (err || !isGood) {
                    return cb(err || {
                        err: isGood + 'not true'
                    })
                }
                return cb(null, user);
            })
        });
    }
));

passport.use('vendor-local', new Strategy({
        usernameField: 'email'
    },
    function(email, password, cb) {
        Vendor.find({
            email: email
        }).exec(function(err, vendors) {
            if (err) {
                return cb(err);
            }
            if (!vendors[0]) {
                return cb(null, false);
            }

            let vendor = vendors[0];

            bcrypt.compare(password, vendor.password, (err, isGood) => {
                if (err || !isGood) {
                    return cb(err || {
                        err: isGood + 'not true'
                    })
                }
                return cb(null, vendor);
            })
        });
    }
));
