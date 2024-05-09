<template>
    <form class="auth_form" @submit.prevent="handleSubmit">
            <div class="auth_form">
                <h1 class="login_name">Login</h1>
                <label class="login_label" for="email">Email</label>
                <input class="login_input" v-model="email" type="email" placeholder="name@example.com">
                <label class="login_label" for="password">Password</label>
                <input class="login_input" v-model="password" placeholder="min.8 characters" type="password">
                <div class="chackbox">
                    <input class="chackbox_sign" v-model="remember" type="checkbox" name="checkbox"/>
                    <div class="chackbox_text">Keep me logged in</div>
                </div>
                <button class="button_login">Login</button>
                <div class="sign">
                    <p>Don`t have an account?<a href="/signup" class="sign_inner"> Sign up</a></p> 
                </div>
            </div>
    </form>
</template>

<script setup lang="ts">
    import { useAuthStore } from '@/stores/AuthStore';
    
    const auth = useAuthStore()
    const email = defineModel<string>('email')
    const password = defineModel<string>('password')
    const remember = defineModel<boolean>('remember', { default: true })

    function handleSubmit () {
        auth.signIn(email.value || '', password.value || '', remember.value)
    }
</script>