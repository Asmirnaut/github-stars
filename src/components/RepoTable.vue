<template>
  <div class="repos">
    <div class="repos-info">
      <h2 class="repos-title">Top Repos</h2>
      <p class="repos-description">
        The top 5 repositories from the last month
      </p>
      <button id="hot_repo" @click="fetchRepos">Refresh Repos</button>
    </div>
    <table class="repo-table">
      <thead>
        <tr class="repo-table-headers">
          <th class="repo-table-header">ID</th>
          <th class="repo-table-header">Repo Name</th>
          <th class="repo-table-header">Repo Owner</th>
          <th class="repo-table-header">Description</th>
          <th class="repo-table-header">Stars</th>
        </tr>
      </thead>
      <tbody class="repo-table-body">
        <tr v-for="repo of topRepos" :key="repo.id">
          <td>{{ repo.id }}</td>
          <td>{{ repo.name }}</td>
          <td>{{ repo.owner }}</td>
          <td>{{ repo.description }}</td>
          <td>{{ repo.stars }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Repositories",

  data() {
    return {
      repositories: [],
    };
  },

  async created() {
    await this.fetchRepos();
  },

  computed: {
    topRepos() {
      if (!this.repositories) {
        return;
      }
      const repos = this.repositories.slice(0, 5);
      return repos.map((repo) => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          owner: repo.owner.login,
          stars: repo.stargazers_count,
        };
      });
    },
  },

  methods: {
    async fetchRepos() {
      const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
        .toISOString()
        .split("T")[0];
      await axios
        .get(
          `https://api.github.com/search/repositories?q=created:>${lastMonth}&sort=stars&order=desc&page=1`
        )
        .then((response) => (this.repositories = response.data.items));
    },
  },
};
</script>

<style lang="css" scoped>
.repos {
  color: #ffffff;
}

#hot_repo {
  background-color: #2da042;
  color: #fff;
  border-radius: 8px;
  width: 150px;
  height: 40px;
}
.repos-info {
  display: flex;
  justify-content: space-between;
}

.repos-description {
  padding: 10px;
}

.repo-table {
  width: 100%;
  border-spacing: 8px;
}

.repo-table-headers {
  text-align: left;
  margin: 8px;
}
</style>
