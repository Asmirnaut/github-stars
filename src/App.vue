<template>
  <div id="app">
    <Header class="header" />
    <Repositories class="repositories" />
    <Users class="users" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Repositories from "./components/RepoTable.vue";
import Users from "./components/UsersTable.vue";

export default {
  name: "App",
  components: {
    Header,
    Repositories,
    Users,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #0e1116;
  margin: -20px;
  padding: 18px;
}

.repositories,
.users,
.header {
  margin: 24px;
  padding-bottom: 50px;
}
</style>
