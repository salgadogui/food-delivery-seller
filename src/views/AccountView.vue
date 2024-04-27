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
    <section class="setting">
      <div class="container">
        <div class="settings">
          <div class="setting__right--side">
            <h3 class="setting__right--side-title">Account</h3>
            <div class="setting__right--side-inner">
              <h2 class="setting__right--side-InnerTxt">Personal information</h2>
              <p class="setting__right--side-ImgTxt">Avatar</p>
              <div class="setting__right--side-ChangeUserImg">
                <img class="setting__right--side-UserImg" src="./img/account avatar.svg" alt="account avatar">
                <button class="setting__right--side-btnChange" type="button">Change</button>
                <button class="setting__right--side-btnRemove">Remove</button>
              </div>
              <div class="setting__right--side-input">
                <div class="input-box">
                  <label for="name">First Name</label>
                  <input type="text" name="name" id="name" required placeholder="Jane">
                </div>
                <div class="input-box">
                  <label for="lastname">Last Name</label>
                  <input type="text" name="lastname" id="lastname" required placeholder="Robertson">
                </div>
                <div class="input-box">
                  <label for="email">Email</label>
                  <input type="email" name="email" id="email" required placeholder="jane.robertson@example.com">
                </div>
                <div class="input-box">
                  <label for="number">Phone number</label>
                  <input type="number" name="number" id="number" required placeholder="(217) 555-0113">
                </div>
              </div>
              <div class="setting__right--btn">
                <div><button class="LogOutBtn" type="button">Log out</button></div>
                <span class="setting__right--btn-border"></span>
                <div class="setting__right--mobile-btn">
                  <div><button class="DiscardBtn" type="button">Discard changes</button></div>
                <div><button class="SaveBtn" type="button">Save changes</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>

  </html>
</template>

<script setup lang="ts">
</script>