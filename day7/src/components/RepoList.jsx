import React from "react";

const RepoList = ({ repos }) => {
  if (!repos.length) {
    return (
      <p className="text-center text-gray-500">
        This user has no public repositories.
      </p>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-bold mb-3 text-gray-800">
        Recent Repositories
      </h3>
      <ul className="space-y-3">
        {repos.map((repo) => (
          <li key={repo.id} className="border-b pb-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {repo.name}
            </a>
            <p className="text-sm text-gray-600">
              {repo.description || "No description"}
            </p>
            <div className="flex gap-4 text-sm text-gray-500 mt-1">
              <span>⭐ {repo.stargazers_count}</span>
              {repo.language && <span>{repo.language}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
