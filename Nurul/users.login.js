import { User } from '../models/users.models.js';
import { ApiError } from '../utils/ApiError.js';

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validasi input wajib
        if (!email || !password) {
            throw new ApiError(401, 'Provide all fields', '');
        }

        // Cari user berdasarkan email
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new ApiError(401, 'Email is wrong', '');
        }

        // Cek apakah password benar
        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            throw new ApiError(401, 'Password is wrong', '');
        }

        // Generate access token
        const token = user.generateAccessToken(user);

        // Set cookie token
        res.cookie('token', token, { httpOnly: true, maxAge: 10 * 60 * 60 * 1000 });

        console.log(`User ${user.email} logged in successfully.`);

        // Redirect ke dashboard
        res.redirect('/user/dashboard');

    } catch (error) {
        console.error('Login error:', error.message);
        next(error);
    }
};
