import { defineStore } from "pinia";
import { ref } from "vue";

interface State {
    stores: string[];
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        stores: []
    }),
    
    actions: {
        async fetchStores() {
            fetch('http://localhost:3000/stores')
            .then(response => response.json())
            .then(data => {
              this.stores = data
              console.log('Data is fetched.')
            })
            .catch((error) => {
              console.log(error)
            })      
        }
    }
})

// desenvolver fetchStores() para onMounted() no componente
// ... para carregar assim que o componente é iniciado