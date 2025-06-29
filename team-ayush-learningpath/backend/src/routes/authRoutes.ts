import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {
    registerUser,
    loginUser,
    getMyProfile,
    changePassword,
    logoutUser,
    forgotPassword, // <-- New import
    resetPassword   // <-- New import
} from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';
import {
    registerRules,
    loginRules,
    changePasswordRules,
    validate,
    forgotPasswordRules, // <-- New import
    resetPasswordRules   // <-- New import
} from '../validators/authValidator';
import { IUser } from '../types';

const router = Router();

// --- Standard Email/Password & Profile Routes ---
router.post('/register', registerRules(), validate, registerUser);
router.post('/login', loginRules(), validate, loginUser);
router.post('/logout', protect, logoutUser);
router.get('/me', protect, getMyProfile);
router.put('/changepassword', protect, changePasswordRules(), validate, changePassword);

// --- NEW PASSWORD RESET ROUTES ---
router.post('/forgot-password', forgotPasswordRules(), validate, forgotPassword);
router.put('/reset-password/:resetToken', resetPasswordRules(), validate, resetPassword);


// --- Existing OAuth Routes ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.CLIENT_URL}/login?error=google-auth-failed`,
        session: false
    }),
    (req, res) => {
        // Successful authentication, req.user is populated by Passport.
        const user = req.user as IUser;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        // Redirect user back to their dashboard.
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);

export default router;