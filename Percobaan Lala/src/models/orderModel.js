/**
 * Model sederhana untuk Order
 */

class Order {
    constructor(id, userId, items, total, status = 'pending') {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.total = total;
        this.status = status;
        this.createdAt = new Date().toISOString();
    }

    addItem(item) {
        this.items.push(item);
        this.total += item.price * item.qty;
    }

    removeItem(itemId) {
        const idx = this.items.findIndex(i => i.id === itemId);
        if (idx !== -1) {
            this.total -= this.items[idx].price * this.items[idx].qty;
            this.items.splice(idx, 1);
        }
    }

    setStatus(status) {
        this.status = status;
    }

    summary() {
        return {
            id: this.id,
            userId: this.userId,
            total: this.total,
            status: this.status,
            itemCount: this.items.length
        };
    }
}

// Contoh penggunaan
const order = new Order(1, 2, [], 0);
for (let i = 1; i <= 5; i++) {
    order.addItem({ id: i, name: `Item${i}`, price: 1000 * i, qty: i });
}

module.exports = Order;