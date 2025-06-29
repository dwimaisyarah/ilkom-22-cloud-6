// User model example

class User {
    constructor(id, name, email, role = 'user', isActive = true) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    getDisplayName() {
        return `${this.name} <${this.email}>`;
    }

    activate() {
        this.isActive = true;
        this.updatedAt = new Date();
    }

    deactivate() {
        this.isActive = false;
        this.updatedAt = new Date();
    }

    updateProfile({ name, email }) {
        if (name) this.name = name;
        if (email) this.email = email;
        this.updatedAt = new Date();
    }

    hasRole(role) {
        return this.role === role;
    }
}

// Tambahkan method dan property lain sesuai kebutuhan

module.exports = User;