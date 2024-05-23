import type { Product } from "./types/product";
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

    public async fetchProducts(): Promise<Product[]> {
      try {
        const response = await fetch(`${this.baseUrl}/products`, {
          // products : corrigir esta rota... aninhado em /stores/
          // pergunta : quero listar todas os produtos de todas as lojas.. 
                // manter esta rota? criar outra para lidar com 'show' 
                    // de produtos específicos?
          method: "GET",
          headers: this.getHeaders()
        });
        console.log("Response: ", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        console.log('Data is fetched.');
        return data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }

    public async createProduct(
      productName: string, productPrice: number, storeId: number): Promise<void> {
      // dúvida ... relacionamento products one-to-many stores?
        const body = {
          product: {name: productName, price: productPrice, store: storeId },
        };
        try {
          const response = await fetch(
            `${this.baseUrl}/store/${body.product["store"]}/products`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(body)
          });
          console.log("Post Response: ", response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log('Product created successfully.');
        } catch (error) {
          console.error('Error creating product:', error);
        }
    }
  }
  
  export default FetchService;
  