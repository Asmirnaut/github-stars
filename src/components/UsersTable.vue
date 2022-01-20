<template>
  <div class="users">
    <div class="users-info">
      <h2 class="users-title">Top Users</h2>
      <p class="users-description">
        The most followed users created in the last year
      </p>
      <button id="prolific_users" @click="fetchUsers">Refresh Users</button>
    </div>
    <table class="user-table">
      <thead>
        <tr class="user-table-headers">
          <th>Avatar</th>
          <th>ID</th>
          <th>Login</th>
          <th>Bio</th>
          <th>Followers</th>
        </tr>
      </thead>
      <tbody class="user-table-body">
        <tr v-for="user of topUsers" :key="user.id">
          <td><img :src="user.avatar" class="user-table-avatar" /></td>
          <td>{{ user.id }}</td>
          <td>{{ user.login }}</td>
          <td>{{ user.bio }}</td>
          <td>{{ user.followers }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Users",

  data() {
    return {
      users: [],
      followersTimer: "",
    };
  },

  async created() {
    await this.fetchUsers();

    this.followersTimer = setInterval(await this.updateFollowers, 120000);
  },

  computed: {
    topUsers() {
      if (!this.users) {
        return;
      }
      const users = this.users.slice(0, 5);
      return users.map((user) => {
        return {
          id: user.id,
          login: user.login,
          bio: user.bio,
          avatar: user.avatar_url,
          followers: user.followers,
          url: user.url,
        };
      });
    },
  },

  methods: {
    async fetchUsers() {
      const lastYear = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      )
        .toISOString()
        .split("T")[0];
      let users = [];
      await axios
        .get(
          `https://api.github.com/search/users?q=created:>${lastYear}&sort=followers&order=desc&page=1`
        )
        .then((response) => (users = response.data.items.slice(0, 5)));
      await Promise.all(
        users.map((user) => {
          axios
            .get(user.url)
            .then((response) => this.users.push(response.data));
        })
      );
    },

    async updateFollowers() {
      await Promise.all(
        this.users.map((user, idx) =>
          axios.get(user.url).then((response) => {
            this.users.splice(idx, 1, response.data);
          })
        )
      );
    },
  },

  beforeDestroy() {
    clearInterval(this.followersTimer);
  },
};
</script>

<style lang="css" scoped>
.users {
  color: #ffffff;
}

#prolific_users {
  background-color: #2da042;
  color: #fff;
  border-radius: 8px;
  width: 150px;
  height: 40px;
}
.users-info {
  display: flex;
  justify-content: space-between;
}

.users-description {
  padding: 10px;
}

.user-table {
  width: 100%;
  border-spacing: 8px;
}

.user-table-avatar {
  width: 24px;
  height: 24px;
}

.user-table-headers {
  text-align: left;
  margin: 8px;
}
</style>
