import type { Store } from './store'

export interface UserData {
    stores: Store[];
    authToken: string;
}