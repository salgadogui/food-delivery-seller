import type { Product } from './product';
import type { Store } from './store'

export interface UserData {
    stores: Store[];
    products: Product[];
    authToken: string;
}