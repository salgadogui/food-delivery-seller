import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

    const email = defineModel<string>('email')
    const password = defineModel<string>('password')
    const remember = defineModel<boolean>('remember', { default: true })

    return { email, password, remember }
})