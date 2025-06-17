import { IUser } from '../'; // Imports the IUser interface from the index.ts file above

// This tells TypeScript to add our custom property to the global Express namespace.
declare global {
    namespace Express {
        interface Request {
            user?: IUser | null; // The user property can be an IUser object, null, or undefined.
        }
    }
}