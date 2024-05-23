import type { Store } from "./types/store";

class FetchService {
    private baseUrl: string;
    private authToken: string;
    public stores: Store[] = [];
  
    constructor(baseUrl: string, authToken: string) {
      this.baseUrl = baseUrl;
      this.authToken = authToken;
    }
  
    private getHeaders() {
      return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authToken}`
      };
    }
  
    public async fetchStores(): Promise<Store[]> {
      try {
        const response = await fetch(`${this.baseUrl}/stores`, {
          method: "GET",
          headers: this.getHeaders()
        });
        console.log("Response: ", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Store[] = await response.json();
        console.log('Data is fetched.');
        return data;
      } catch (error) {
        console.error('Error fetching stores:', error);
        throw error;
      }
    }
  
    public async createStore(storeName: string): Promise<void> {
      const body = { store: { name: storeName } };
      try {
        const response = await fetch(`${this.baseUrl}/stores`, {
          method: "POST",
          headers: this.getHeaders(),
          body: JSON.stringify(body)
        });
        console.log("Post Response: ", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Store created successfully.');
      } catch (error) {
        console.error('Error creating store:', error);
      }
    }
  }
  
  export default FetchService;
  