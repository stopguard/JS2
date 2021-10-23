<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

header {
  width: 100%;
  padding-left: 10px;
  background-color: rgba(16, 113, 177, 0.1);
  box-sizing: border-box;
  box-shadow: 5px 20px 50px rgba(16, 112, 177, 0.2);
}

button {
  margin: 10px;
}

.goods-list {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  flex-wrap: wrap;
  font-family: Arial, Helvetica, sans-serif;
  columns: 3;
  padding-left: 0;
  list-style: none;
}

.good-item {
  margin-bottom: 20px;
  padding: 44px 32px;
  box-sizing: border-box;
  box-shadow: 5px 20px 50px rgba(16, 112, 177, 0.2);
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 30%;
}

.cart-cost {
  width: 100%;
  background-color: ghostwhite;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 5px 20px 50px rgba(16, 112, 177, 0.2);
  font-family: Arial, Helvetica, sans-serif;
  font-size: large;
}

.error-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.error-msg {
  padding: 44px 32px;
  box-sizing: border-box;
  box-shadow: 5px 20px 50px rgba(177, 16, 16, 0.2);
  border-radius: 10px;
  background-color: rgb(240, 167, 167);
  text-align: center;
  min-width: 150px;
}

a {
  margin: 10px;
}

.deleted {
  background-color: red;
}

.added {
  background-color: rgb(0, 255, 0);
}

.hidden {
  display: none;
}
</style>
