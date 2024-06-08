import type { Order } from "./types/order";
import type { Product } from "./types/product";
import type { Store } from "./types/store";

class FetchService {
  private baseUrl: string;
  private authToken: string;

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

  private async request<T>(url: string, method: string, body?: any): Promise<T> {
    try {
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error during ${method} request to ${url}:`, error);
      throw error;
    }
  }

  public async fetchAll<T>(endpoint: string): Promise<T[]> {
    return this.request<T[]>(`${this.baseUrl}/${endpoint}`, "GET");
  }

  public async fetchOne<T>(endpoint: string, id: string): Promise<T> {
    return this.request<T>(`${this.baseUrl}/${endpoint}/${id}`, "GET");
  }

  public async create<T>(endpoint: string, data: T): Promise<T> {
    return this.request<T>(`${this.baseUrl}/${endpoint}`, "POST", data);
  }

  public async update<T>(endpoint: string, id: string, data: T): Promise<T> {
    return this.request<T>(`${this.baseUrl}/${endpoint}/${id}`, "PUT", data);
  }

  public async patch<T>(endpoint: string, id: string, data: Partial<T>): Promise<T> {
    return this.request<T>(`${this.baseUrl}/${endpoint}/${id}`, "PATCH", data);
  }

  public async delete(endpoint: string, id: string): Promise<void> {
    await this.request<void>(`${this.baseUrl}/${endpoint}/${id}`, "DELETE");
  }
}

export default FetchService;

