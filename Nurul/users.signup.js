import { User } from '../models/users.models.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt';

// Controller untuk registrasi user baru
export const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validasi input wajib
        if (!name || !email || !password) {
            throw new ApiError(401, 'Provide all fields', '');
        }

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new ApiError(409, 'Email already registered', '');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru ke database
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate token akses
        const token = user.generateAccessToken(user);

        // Set cookie token
        res.cookie('token', token, { httpOnly: true });

        // Redirect ke dashboard user
        res.redirect('/user/dashboard');
        
        console.log('User registered successfully:', user.email);
    } catch (error) {
        next(error);
    }
};
