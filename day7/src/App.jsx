import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGitHubUser = async (username) => {
    setLoading(true);
    setError("");
    setUserData(null);
    setRepos([]);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found!");
      const data = await res.json();
      setUserData(data);

      // Fetch repos
      const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      const repoData = await repoRes.json();
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🔍 GitHub User Finder
      </h1>

      <SearchBar onSearch={fetchGitHubUser} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && userData && (
        <div className="w-full max-w-2xl space-y-6 mt-6">
          <UserCard user={userData} />
          <RepoList repos={repos} />
        </div>
      )}
    </main>
  );
};

export default App;
