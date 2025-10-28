import { ConvexError } from 'convex/values';
import { Password } from '@convex-dev/auth/providers/Password';
import { ResendOTPPasswordReset } from './ResendOTPPasswordReset';
import { z } from 'zod';

const ParamsSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    name: z.string().min(1, 'Name is required.').optional(),
});

export default Password({
    reset: ResendOTPPasswordReset,
    profile(params) {
        const { error, data } = ParamsSchema.safeParse(params);
        if (error) {
            throw new ConvexError(error.format());
        }
        const result: any = {
            email: data.email,
        };
        if (data.name) {
            result.name = data.name;
        }
        return result;
    },
    validatePasswordRequirements: (password: string) => {
        if (password.length < 8) {
            throw new ConvexError(
                'Password must be at least 8 characters long.',
            );
        }
        if (!/[a-z]/.test(password)) {
            throw new ConvexError(
                'Password must contain at least one lowercase letter.',
            );
        }
        if (!/[A-Z]/.test(password)) {
            throw new ConvexError(
                'Password must contain at least one uppercase letter.',
            );
        }
        if (!/\d/.test(password)) {
            throw new ConvexError('Password must contain at least one number.');
        }
    },
});
