module.exports = function Cart(oldCart) {
   
    this.items = oldCart.items || {};
    this.totalItems = oldCart.totalItems || Number(0);
    this.totalMoney = oldCart.totalMoney || Number(0);
   
    this.add = function(newItem, id, quantity) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: newItem, quantity: Number(0), price: Number(0)};
        }
        cartItem.price = Number(newItem.price);
        cartItem.quantity += quantity;
        cartItem.totalMoney = cartItem.item.price * cartItem.quantity;
        this.totalItems += quantity;
        this.totalMoney += cartItem.item.price * quantity;

    }

    this.addOne = function(id) {
        var cartItem = this.items[id];
        if (cartItem) {
            cartItem = this.items[id];
           
            cartItem.quantity++;
            cartItem.totalMoney = cartItem.item.price * cartItem.quantity;
            this.totalItems++;
            this.totalMoney += cartItem.item.price;
            
        }
    }

    this.removeOne = function(id) {
        var cartItem = this.items[id];
        if (cartItem) {
            cartItem = this.items[id];
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                cartItem.totalMoney = cartItem.item.price * cartItem.quantity;
                this.totalItems--;
                this.totalMoney -= cartItem.item.price;
            }
        }
    }

    this.remove = function(id) {
        this.totalItems -= this.items[id].quantity;
        this.totalMoney -= this.items[id].totalMoney;
        delete this.items[id];
    };

    this.getAllItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        console.log("\narr cart: " + JSON.stringify(arr));
        return arr;
    }

}