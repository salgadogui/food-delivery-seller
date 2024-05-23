<template>
<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Food Delivery</title>
    <!-- Normalize default styles -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
    <!-- font awesome link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <!-- Main styles -->
    <link rel="stylesheet" href="./setting.css">
  </head>

  <body>
    <section class="products__list">
      <div class="container">
        <UserProduct/>
      </div>
    </section>
  </body>
  </html>
</template>

<script setup lang="ts">
  import UserProduct from '@/components/UserProduct.vue';
</script>