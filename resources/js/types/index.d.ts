export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth?: {
        user: User;
    };
};

export interface Article {
    id: number;
    title: string;
    body: string;
    price: number;
    image_path?: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface IconProps {
    className?: string;
}
