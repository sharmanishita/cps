// src/config/passport-setup.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel';
import { IUser } from '../types';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // 1. Check if a user with this Google ID already exists.
                let user = await User.findOne({ googleId: profile.id });
                if (user) {
                    return done(null, user);
                }

                // 2. If not, check if they exist by email address.
                user = await User.findOne({ email: profile.emails?.[0].value });
                if (user) {
                    user.googleId = profile.id; // Link account
                    await user.save();
                    return done(null, user);
                }

                // --- THIS IS THE FIX ---
                // 3. If the user is brand new, create their account with robust name handling.
                const newUser = await User.create({
                    googleId: profile.id,
                    email: profile.emails?.[0].value,
                    // Use the givenName from Google, or fallback to their full displayName
                    firstName: profile.name?.givenName || profile.displayName,
                    // Use the familyName from Google, but if it doesn't exist, use a placeholder '.'
                    lastName: profile.name?.familyName || '.',
                });

                return done(null, newUser);

            } catch (error) {
                if (error instanceof Error) {
                    return done(error, false);
                }
                return done(new Error('An unknown error occurred during authentication.'), false);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, (user as IUser).id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: Error, user: IUser) => done(err, user));
});
