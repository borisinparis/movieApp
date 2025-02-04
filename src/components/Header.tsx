
import MovieIcon from "@/app/icons/Movieicon";
import ThemeSwitch from "./ThemeSwitch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Search from "@/app/icons/Search";
import Link from "next/link";

type searchValue = string;

type MoviesAll = {
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
};
type Name = {
  name: string;
  id:number
};

export const Header = () => {
  const [filterMoviesAll, setFilterMoviesAll] = useState<MoviesAll[]>([]);
  const [searchValue, setSearchValue] = useState<searchValue>("");
  const [listOfMovies, setListOfMovies] = useState<Name[]>([]);

  const listOfMoviesAll = async () => {
    try {
      const respo = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${movieApiKey}`
      );
      const resuult = await respo.json();
      setListOfMovies(resuult.genres);
      console.log(resuult);
      
    } catch (error) {
      console.log(error);
    }
  };

  const movieApiKey = "877ff59e9c1c2cdcec5fb423b387b410";

  const moviesSearch = async () => {
    try {
      const repo = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1&api_key=${movieApiKey}`
      );
      const resul = await repo.json();
      setFilterMoviesAll(resul.results);
      console.log(resul + " asdasd");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filtered = filterMoviesAll
      .filter(({ title }) =>
        title.toLowerCase().startsWith(searchValue.toLowerCase())
      )
      .slice(0, 5);
    setFilterMoviesAll(filtered);
    console.log(filtered);
  };

  useEffect(() => {
    moviesSearch();
    console.log(filterMoviesAll);
  }, [searchValue]);

  useEffect(() => {
    listOfMoviesAll();
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-20 h-[59px] bg-background flex items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
          <a
            href="http://localhost:3000/"
            className="flex items-center gap-x-2 text-indigo-700"
          >
            <MovieIcon />
            <p className="italic font-bold">BorisinMovie</p>
          </a>
          <div className="flex">
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {listOfMovies.map((el, index) => (
                    <div key={index}>
                    <Link href={`/genres?page=1&genrelds=${el.id}`}>
                      {el?.name}
                    </Link>
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative text-muted-foreground w-[379px]">
              <Search className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                placeholder="Search..."
                value={searchValue}
                onChange={onChange}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
                type="text"
              />
            </div>
            </div>
            {filterMoviesAll.map((el, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card text-card-foreground shadow search-result p-3 h-[500px] lg:h-auto "
              >
                <div className="flex gap-x-4 p-2 hover:bg-muted rounded-md group relative">
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                      className="w-full h-full object-cover rounded-md"
                      alt={`${el.title} poster`}
                    />
                    <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
                  </div>
                  <div className="flex-1 text-foreground">
                    <h4 className="truncate text-xl font-semibold w-48 lg:w-96">
                      {el.title}
                    </h4>
                    <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
                      {el.vote_average}/10
                    </div>
                    <div className="mt-2 text-sm font-medium">
                      <h5>{el.release_date}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-x-3">
              <ThemeSwitch />
            </div>
        </div>
      </header>
    </>
  );
};
export default Header;
