<template>
    <div class="settings">
        <div class="setting__right--side">
        <h3 class="setting__right--side-title">Account</h3>
        <div class="setting__right--side-inner">
            <h2 class="setting__right--side-InnerTxt">Personal information</h2>
            <div class="setting__right--side-input">
            <div class="input-box">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" required :placeholder="auth.email">
            </div>
            </div>
            <div class="setting__right--btn">
            <div><button class="LogOutBtn" @click="handleSignOut()" type="button">Log out</button></div>
            <span class="setting__right--btn-border"></span>
            <div class="setting__right--mobile-btn">
                <div><button class="DiscardBtn" type="button">Discard changes</button></div>
            <div><button class="SaveBtn" type="button">Save changes</button></div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAuthStore } from '@/stores/AuthStore';

    const auth = useAuthStore()

    function handleSignOut () {
        auth.signOut()
    }
</script>