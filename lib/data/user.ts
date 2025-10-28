import type { User } from '@/types/form';

export const dummyUser: User = {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: '/diverse-user-avatars.png',
    createdAt: '2023-12-01T00:00:00Z',
};

export function getCurrentUser(): User {
    return dummyUser;
}
