import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-28 h-28 rounded-full border-4 border-blue-500 mb-4"
      />
      <h2 className="text-xl font-bold text-gray-800">{user.name || "No name"}</h2>
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline"
      >
        @{user.login}
      </a>
      <p className="text-gray-600 mt-2">{user.bio || "No bio available"}</p>

      <div className="flex justify-around w-full mt-4 text-sm">
        <div>
          <p className="font-semibold text-gray-800">{user.followers}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{user.following}</p>
          <p className="text-gray-500">Following</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{user.public_repos}</p>
          <p className="text-gray-500">Repos</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
