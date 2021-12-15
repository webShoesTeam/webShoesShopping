const billService = require('./billService');



exports.getBillWithIdBill = async (req, res) => {

    const billId = req.params.id;
    const bill = await billService.getBillWithIdBill(billId);

    res.render('bill', {
        title: "Bill",
        bill: bill,
    })
}

exports.getBillWithUserId = async (req, res) => {
    if (!req.user) {
        res.redirect('/login?redirect=bill/history');                   
    }
    
    const bills = await billService.getBillWithUserId(req.user);

    res.render('bill', {
        title: "Bill",
        bills: bills,
    })
}