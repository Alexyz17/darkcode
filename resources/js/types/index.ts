export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'premium' | 'admin';
    is_admin: boolean;
}

export interface SharedProps {
    auth: { user: User | null };
    flash: { success?: string; error?: string };
}
