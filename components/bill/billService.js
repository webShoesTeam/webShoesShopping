const Bill = require('../../models/billModel')



exports.createNewBill = async (billData) => {
    const newBill = new Bill(billData);
    
    await newBill.save();
    return newBill;
}

