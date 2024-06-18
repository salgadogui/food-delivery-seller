<template>
    <header class="header__menu">
      <div class="container">
        <div class="header__navbar">
          <div class="header__menu--left-side">
            <a v-if="!authStore.loggedIn" href="/signin">
              <img class="header__menu--logo" src="@/assets/img/main_logo.svg" alt="Food delivery website logo" />
            </a>
             <a v-if="authStore.loggedIn" href="/account">
              <img class="header__menu--logo" src="@/assets/img/main_logo.svg" alt="Food delivery website logo" />
            </a>         
		  </div>
          <div class="header__menu--right-side">
            <nav class="header__menu--link">
              <span class="header__menu--divider-vertical"></span>
              <div v-if="!authStore.loggedIn">
                <a class="menu_link active" href="/signin">Sign In</a>
              </div>
              <div v-if="authStore.loggedIn">
                <a class="menu_link active" href="/orders">My Orders</a>
                <a class="menu_link active" href="/stores">My Stores</a>
                <a class="menu_link active" href="/products">My Products</a>
                <a class="menu_link active" href="/account">Account</a>
              </div>
            </nav>
            <img class="header__menu--icon-mobile" src="@/assets/img/menu.svg" alt=" header menu icon " />
          </div>
        </div>
      </div>
    </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';

const authStore  = useAuthStore()
const route = useRoute()
const path = computed( () => route.path )

</script>
