<template>
    <div class="auth_form">
        <h1 class="login_name">Login</h1>
        <label class="login_label" for="email">Email</label>
        <input class="login_input" placeholder="name@example.com" id="email" type="text" name="email">
        <label class="login_label" for="password">Password</label>
        <input class="login_input" placeholder="min.8 characters" id="password" type="text" name="password">
        <div class="chackbox">
            <input class="chackbox_sign" type="checkbox" name="checkbox"/>
            <div class="chackbox_text">Keep me logged in</div>
        </div>
        <button class="button_login">Login</button>
        <a href="#" class="button_forgot">Forgot password</a>
        <div class="sign">
            <p>Don`t have an account?<a href="#" class="sign_inner"> Sign up</a></p> 
        </div>
    </div>   
</template>

<script setup lang="ts">
</script>