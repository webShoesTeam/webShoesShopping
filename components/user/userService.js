const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');

exports.findByUsername = async (username) => {
    const user = await userModel.findOne({
        username: username
    }).lean();
    console.log("user in finUser\n" + user);
    return user;
};

exports.findById = async (id) => {
    const user = await userModel.findOne({
        _id: id
    }).lean();
    
    return user;
};

exports.validPassword = async (password, user) => {
    // console.log("\n\nuser pass: " + user.password);
    // const passwordHashed = await bcrypt.hash(password, 10);
    // bcrypt.hash(password, 10, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log("user pass hashed2: " + hash);
    // });

    // console.log("user pass before hashed: " + password);
    // console.log("user pass hashed: " + passwordHashed);
    // console.log("user pass hashed2: " + passwordHashed2);
    return await bcrypt.compare(password, user.password);
    //return passwordHashed == user.password;
}

exports.createUser = async (name, email, phone, address, username, password) => {
    const passwordHashed = await bcrypt.hash(password, 10);
    // console.log("passHashed: " + passwordHashed);
    bcrypt.hash(password, 10).then(function(hash) {
        // console.log("passregister: " + hash);
    });
    return userModel.create({
        name: name,
        email: email,
        phone: phone,
        address: address,
        username: username,
        password: passwordHashed,
        role: 'user',
    })
}

exports.updateImage = async (newLink, id) => {
    const user = await userModel.findOne({
        _id: id
    });
    if (user) {
        user.image = newLink;
        await user.save();
    }
}

exports.updateUser = async (id, name, email, phone, address, username, password) => {
    const passwordHashed = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate({_id: id}, {
        name: name,
        email: email,
        phone: phone,
        address: address,
        username: username,
        password: passwordHashed,
    });
   
}