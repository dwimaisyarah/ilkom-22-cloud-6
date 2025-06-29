// User model example

class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    getDisplayName() {
        return `${this.name} <${this.email}>`;
    }
}

// Tambahkan method dan property lain sesuai kebutuhan

module.exports = User;