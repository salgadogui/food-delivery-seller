import { defineStore } from 'pinia';
import { Auth } from '@/auth';
import { useRouter } from 'vue-router';

interface State {
  email: string;
  password: string;
  remember: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    email: '',
    password: '',
    remember: true,
  }),
  getters: {
    getEmail: (state) => state.email
  },

  actions: {
    signIn(email: string, password: string, remember: boolean) {
      const auth = new Auth(remember)
      const router = useRouter()
      let success = false
      try { auth.signIn(
        email,
        password,
        () => { success = true, this.router.push('/account') },
        () => { success = false, console.log("Não foi dessa vez!") }
      ); if (success) { this.updateCredentials(email, password, remember) } 
    } catch (e) { console.error('Sign in error:', e) }
    },
    updateCredentials(email: string, password: string, remember: boolean) {
      this.$state.email = email;
      this.$state.password = password;
      this.$state.remember = remember;
    }
  }  
});
