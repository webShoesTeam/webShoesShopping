const userService = require('./userService');

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
    res.render('profile', {
        title: "Profile",
    
    })
}

exports.updateImage = async (req, res) => {
    const id = req.params.id;
    console.log("id:\n\n\n\n " + id)
    const user = await userService.findById(id);
    //console.log("user find by id:\n\n" + JSON.stringify(user));
    
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
        
        console.log("i'm here");
        if (user) {
            console.log("file: \n\n" + JSON.stringify(files));
            console.log("field: \n\n" + JSON.stringify(fields));
            cloudinary.uploader.upload(files.image.filepath, { public_id: `user/${user._id}/${user.username}`,overwrite: true, width: 192, height: 192, crop: "scale", fetch_format: "jpg"})
            
            const newLink = "https://res.cloudinary.com/dgci6plhk/image/upload/v1/user/" + user._id + "/" + user.username + ".jpg";
            //const newLink = "https://res.cloudinary.com/mernteam/image/upload/v1638468308/mern/users/" + user._id + "/" + user.nameImage + ".jpg"
            userService.updateImage(newLink, id);
            
            res.redirect('/users/profile');
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

    
    check('name', 'Name is required!').notEmpty();
    check('email', 'Email is required!').isEmail();
    check('phone', 'Email is required!').notEmpty();
    check('address', 'Email is required!').notEmpty();
    check('username', 'Username is required!').notEmpty();
    check('password', 'Password is required!').notEmpty();
    check('password2', 'Passwords do not match!').equals(password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("loi empty validation");
        res.redirect("/users/profile");
    }
    else {
       try {
            await userService.updateUser(id, name, email, phone, address, username, password);
            //console.log("body: \n" + JSON.stringify(req.body));
            // res.locals.messages = "Update successfull"
            res.redirect('/users/profile');
       } catch (Exception) {
            res.redirect('/users/profile');
       }
    }
}