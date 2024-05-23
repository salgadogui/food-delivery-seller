export interface Store {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    store_id: number;
    price: number
}

export interface UserData {
    stores: Store[];
    authToken: string;
}