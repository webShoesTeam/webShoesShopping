const userService = require('./userService');

const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

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
            cloudinary.uploader.upload(files.image.filepath, { public_id: `mern/users/${user._id}/${user.username}`,overwrite: true, width: 192, height: 192, crop: "scale"})
        
            //const newLink = "https://res.cloudinary.com/dgci6plhk/image/upload/images/users/{{this._id}}/{{this.nameImage}}.jpg"
            const newLink = "https://res.cloudinary.com/mernteam/image/upload/v1638468308/mern/users/{{user._id}}/{{user.nameImage}}.jpg"
            userService.updateImage(newLink, id);
            res.redirect('/');
        }
        
        // // res.redirect('/users/profile');
        // console.log("file: \n\n" + JSON.stringify(files));
        // console.log("field: \n\n" + JSON.stringify(fields));
    
        // const user = User.findOne({_id: id})
        // console.log("USER: \n\n" + user);
        // res.redirect("/users/profile")

    })
};