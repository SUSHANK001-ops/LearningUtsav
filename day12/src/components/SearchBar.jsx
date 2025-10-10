import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";


const MovieCard = React.memo(({ movie }) => {
  return (
    <div className="p-3 border rounded-xl bg-white shadow hover:shadow-md transition">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
        alt={movie.Title}
        className="rounded-lg w-full h-64 object-cover"
      />
      <h3 className="font-semibold text-lg mt-2">{movie.Title}</h3>
      <p className="text-sm text-gray-600">{movie.Year}</p>
    </div>
  );
});

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "";

  
  const debouncedQuery = useDebounce(query, 600);

 
  const fetchMovies = useCallback(async (searchTerm) => {
    if (!searchTerm) return;

    if (!API_KEY) {
      console.error("OMDb API key missing. Set VITE_OMDB_API_KEY in your .env file.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  
  useEffect(() => {
    fetchMovies(debouncedQuery);
  }, [debouncedQuery, fetchMovies]);

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🎬 AI Movie Search</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="w-full max-w-lg border border-gray-300 rounded-xl p-3 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-8 w-full max-w-6xl">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
      </div>

      {!loading && movies.length === 0 && query && (
        <p className="mt-6 text-gray-500">No movies found for “{query}”</p>
      )}
    </section>
  );
};

export default MovieSearch;
