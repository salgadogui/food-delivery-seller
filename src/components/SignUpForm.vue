<template>
    <form class="auth_form" @submit.prevent="handleSubmit">
            <div class="auth_form">
                <h1 class="login_name">Sign Up</h1>
                <label class="login_label" for="email">Email</label>
                <input class="login_input" v-model="email" type="email" placeholder="name@example.com">
                <label class="login_label" for="password">Password</label>
                <input class="login_input" v-model="password" placeholder="min.8 characters" type="password">
                <label class="login_label" for="password">Password Confirmation</label>
                <input class="login_input" v-model="password_confirmation" placeholder="min.8 characters" type="password">
                <div class="chackbox">
                    <input class="chackbox_sign" v-model="remember" type="checkbox" name="checkbox"/>
                    <div class="chackbox_text">Keep me logged in</div>
                </div>
                <button class="button_login">Login</button>
                <div class="sign">
                    <p>Already have an account?<a href="/signin" class="sign_inner"> Sign In</a></p> 
                </div>
            </div>
    </form>
</template>

<script setup lang="ts">
    
    const email = defineModel<string>('email')
    const password = defineModel<string>('password')
    const password_confirmation = defineModel<string>('password_confirmation')
    const remember = defineModel<boolean>('remember', { default: true })

    function handleSubmit () {
        // call signup function
        // auth.signIn(email.value || '', password.value || '', remember.value)
    }

    async function signUp(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
        console.log("Will sign in...");

        const body = {
            login: {
                email: email,
                password: password
            }
        };

        try {
            const response = await fetch("http://localhost:3000/sign_in", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-API-KEY": "jUW5pzatdK+39yuGrt/7DmHsTYc="
                },
                body: JSON.stringify(body)
            });

            if (response) {
                if (response.ok) {
                    this.success(response, onSuccess);
                } else {
                    this.failure(response, onFailure);
                }
            } else {
                console.error("No response received");
                onFailure();
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            onFailure();
        }
    }
</script>