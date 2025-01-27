type FormMovies = {
    movieName: string;
    description: string;
    rank: number;
  };
  
  export const MoviesSelect: React.FC = () => {
    const movies: FormMovies[] = [
      { movieName: "Inception", description: "A mind-bending thriller by Christopher Nolan.", rank: 1 },
      { movieName: "The Shawshank Redemption", description: "A story of hope and friendship.", rank: 2 },
      { movieName: "The Dark Knight", description: "A superhero masterpiece.", rank: 3 },
    ];
  
    return (
      <div>
        <h1>Select a Movie</h1>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <strong>{movie.movieName}</strong> - {movie.description} (Rank: {movie.rank})
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
