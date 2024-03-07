const bcrypt = require('bcrypt');
const crypto = require('crypto');


async function generateBcryptHash(input) {
    // Convert input to string if it's a number
    if (typeof input === 'number') {
        input = input.toString();
    }

    // Generate a salt and hash the input
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(input, salt);
    return hash;
}

function generateSHA256Hash(input) {
    // Convert input to string if it's a number
    if (typeof input === 'number') {
        input = input.toString();
    }

    // Generate SHA-256 hash
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

module.exports = {
    generateBcryptHash,
    generateSHA256Hash
}
