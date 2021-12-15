const billService = require('./billService');



exports.getBillWithIdBill = async (req, res) => {

    const billId = req.params.id;
    const bill = await billService.getBillWithIdBill(billId);
    console.log("\n\nBill:\n" + JSON.stringify(bill))
    res.render('bill/bill', {
        title: "Bill",
        bill: bill,
    })
}

exports.getBillWithUserId = async (req, res) => {
    console.log("before chceck login")
    if (!req.user) {
        res.redirect('/login?redirect=bill/history');                   
    }
    console.log("before het bills");
    const bills = await billService.getBillWithUserId(req.user._id);

    res.render('bill/allBill', {
        title: "History Bill",
        bills: bills,
    })
}