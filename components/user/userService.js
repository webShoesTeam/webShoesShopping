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
    console.log("user pass: " + user.password);
    const passwordHashed = await bcrypt.hash(password, 10);
    console.log("user pass hashed: " + passwordHashed);
    return await bcrypt.compare(password, user.password);
}

exports.createUser = async (name, email, phone, address, username, password) => {
    const passwordHashed = await bcrypt.hash(password, 10);
    
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