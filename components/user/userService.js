const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');

exports.findByUsername = async (username) => {
    const user = await userModel.findOne({
        username: username
    }).lean();
    
    return user;
};

exports.findByEmail = async (email) => {
    const user = await userModel.findOne({
        email: email
    }).lean();
    return user;
};

exports.findById = async (id) => {
    const user = await userModel.findOne({
        _id: id
    }).lean();
    
    return user;
};

exports.validPassword = async (password, user) => {

    return await bcrypt.compare(password, user.password);
    //return passwordHashed == user.password;
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

exports.updatePassword = async (id, password) => {
    const passwordHashed = await bcrypt.hash(password, 10);
    
    const user = await userModel.findOne({
        _id: id
    });
    if (user) {
        user.password = passwordHashed;
        await user.save();
    }
};