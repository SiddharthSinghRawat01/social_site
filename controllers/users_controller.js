const User = require('../models/user')


module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: "Profile Page",
            profile_user: user
        });
    });
    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(403).send('Unautrized');
    }
}

// Sign UP
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    
        return res.render('user_sign_up',{
            title: "Social | Sign Up"
        });

    
    
}


//Sign IN
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


        return res.render('user_sign_in',{
            title: "Social | Sign In"
        })

    
}

//get sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('err finding user in signup'); return}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('err creating user'); return}

                return res.redirect('/users/sign-in')
            })
        } else {
            return res.redirect('back')
        }
    })

}

//get sign in
module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in Successfully')
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.flash('success', 'You have loged out')
    req.logout();// passport give this req
    
    return res.redirect('/') // this is one way to do flash return res.redirect('/',{flash: {sucess:""}}) or we can use it as a middlewawre
}