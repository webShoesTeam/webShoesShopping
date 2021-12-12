module.exports = function Cart(oldCart) {

    this.items = oldCart.items || {};
    this.totalItems = oldCart.totalItems || 0;
    this.totalMoney = oldCart.totalMoney || 0;

    this.add = function(newItem, id) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: newItem, quantity: 0, price: 0};
        }
        cartItem.price = newItem.price;
        cartItem.quantity++;
        cartItem.totalMoney = cartItem.item.price * cartItem.quantity;
        this.totalItems++;
        this.totalMoney += cartItem.item.price;

    }

    this.removeOne = function(oldItem, id) {
        var cartItem = this.items[id];
        if (cartItem) {
            cartItem = this.items[id];
            if (cartItem.quantity > 0) {
                cartItem.price = oldItem.price;
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