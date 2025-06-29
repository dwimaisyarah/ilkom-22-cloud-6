/**
 * Data array contoh user
 */

const users = [];

for (let i = 1; i <= 50; i++) {
    users.push({
        id: i,
        username: `user${i}`,
        email: `user${i}@mail.com`,
        isActive: i % 2 === 0,
        age: 18 + (i % 30),
        roles: i % 3 === 0 ? ['admin', 'user'] : ['user'],
        createdAt: new Date(2020, 0, i).toISOString()
    });
}

module.exports = users;