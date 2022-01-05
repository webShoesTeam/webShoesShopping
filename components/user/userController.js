const userService = require('./userService');
const bcrypt = require('bcrypt');

const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const {check, validationResult} = require('express-validator');
const User = require('../../models/userModel');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });

exports.getProfile = (req, res) => {
    let mess = req.query.mess !== undefined;
    if (mess) {
        mess = req.query.mess;
    }
    let success = req.query.success !== undefined;
    if (success) {
        success = req.query.success;
    }

    res.render('profile', {
        title: "Profile",
        mess: mess,
        success: success,

    })
}

exports.updateImage = async (req, res) => {
    const id = req.params.id;
    console.log("id:\n\n\n\n " + id)
    const user = await userService.findById(id);
    //console.log("user find by id:\n\n" + JSON.stringify(user));
    
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
        if (files.image.originalFilename) {
            console.log("i'm here");
            if (user) {
                console.log("file: \n\n" + JSON.stringify(files));
                console.log("field: \n\n" + JSON.stringify(fields));
                let newLink;
                await cloudinary.uploader.upload(files.image.filepath, { public_id: `user/${user._id}/${files.image.newFilename}`,overwrite: true, width: 192, height: 192, crop: "scale", fetch_format: "jpg"}, function(err, result) {
                    newLink = result.url;
                })
                
                //const newLink = "https://res.cloudinary.com/dgci6plhk/image/upload/user/" + user._id + "/" + user.username + ".jpg";
                //const newLink = "https://res.cloudinary.com/mernteam/image/upload/v1638468308/mern/users/" + user._id + "/" + user.nameImage + ".jpg"
                await userService.updateImage(newLink, id);
                
                res.redirect('/users/profile?success=update image successful');
            }
        }
        // // res.redirect('/users/profile');
        // console.log("file: \n\n" + JSON.stringify(files));
        // console.log("field: \n\n" + JSON.stringify(fields));
    
        // const user = User.findOne({_id: id})
        // console.log("USER: \n\n" + user);
        // res.redirect("/users/profile")

    })
};


exports.saveUpdate = async (req, res) => {
    const id = req.params.id;  
    
    const name = await req.body.name;
    const email = await req.body.email;
    const phone = await req.body.phone;
    const username = await req.body.username;
    const password = await req.body.password;
    const password2 = await req.body.password2;
    const address = await req.body.address;

    
    if (password2 != password) {
        res.redirect('/users/profile?mess=wrong pass confirm');
    }
    const isRightPass = await userService.validPassword(password, req.user);
    // right pass --> ?
    if (!isRightPass) {
        res.redirect('/users/profile?mess=wrong password');
    }

    // if(password !== password2) {
    //     console.log("Password do not match");               
    //         res.render('profile', {
    //             title: "profile", 
    //         });
    //         return;
    // }
    
    check('name', 'Name is required!').notEmpty();
    check('email', 'Email is required!').isEmail();
    check('phone', 'Email is required!').notEmpty();
    check('address', 'Email is required!').notEmpty();
    check('username', 'Username is required!').notEmpty();
    check('password', 'Password is required!').notEmpty();
    // check('password2', 'Passwords do not match!').equals(password);


    const errors = validationResult(req);




  // Duc xem thu cho nay co giup dc j ko (toan)
//     if (isRightPass==true) {
       
//         try {
//             await userService.updateUser(id, name, email, phone, address, username, password);
//             res.redirect('/users/profile');
//         } catch (Exception) {
          
//             res.redirect('/users/profile');;
//         }
//     } else {
//         res.render('profile', {
//             title: "Profile",
//             mess: "Wrong password",
//         })
  

    if (!errors.isEmpty()) {
        console.log("loi empty validation");
        res.redirect("/users/profile?mess=something wrong, please try again");
    }
    else {
        const usernameFound = await userService.findByUsername(username);
        const emailFound = await userService.findByEmail(email);

        if (usernameFound && (id != usernameFound._id)) { 
            console.log("Into username")                            
            res.render('profile', {
                title: "profile", 
                errors: "Username or email existed",
            });
        } 
        else if (emailFound && (id != emailFound._id)) {
            console.log("Into email")                            
                             
            res.render('profile', {
                title: "profile", 
                errors: "Username or email existed",
            });
        }
        else {
            try {
                await userService.updateUser(id, name, email, phone, address, username, password);
                //console.log("body: \n" + JSON.stringify(req.body));
                // res.locals.messages = "Update successfull"
                res.redirect('/users/profile?success=update successful');
            } catch (Exception) {
                res.redirect('/users/profile?mess=something wrong');
            }
        }

    }
}

exports.updatePassword = async (req, res) => {
    const id = req.params.id;

    const oldPass = await req.body.oldpassword;
    const newPass = await req.body.password;
    const newPass2 = await req.body.password2;
    
    if (newPass !== newPass2) {
        res.redirect('/users/profile?mess=wrong pass confirm');
    }

    const user = await userService.findById(id);
    if(await bcrypt.compare(oldPass, user.password)) {
        await userService.updatePassword(id, newPass);
        res.redirect("/users/profile?success=password is updated");
    }
    else {
        res.redirect('/users/profile?mess=Password does not change: wrong old password');
        //res.redirect('/users/profile?wrongold=1');

    }
};