'use client'
import Header  from "@/components/Header"
import Footer from "@/components/Footer"
import { useEffect, useState } from "react"
  import Link from "next/link";

  type Name = {
    name: string;
  };
  type Popular = {
    title: string
    vote_average: number
    poster_path: string
    original_title: string
    id: string
    total_results: number
  
  }
  type genres = {
    total_results: number
  }
const movieApiKey = "877ff59e9c1c2cdcec5fb423b387b410";
const ExampleComponent = () => {
      const [genresValue,setGenresValue] = useState<genres>({} as genres)
      const [listOfMovies, setListOfMovies] = useState<Name[]>([]);
      const [teaserMovies,setTeaserMovies] = useState<Popular[]>([])

    useEffect (() => {
        const fetchMovies = async () => {
            try {
                const genresMovieResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}`)
                const genresData = await genresMovieResponse.json();
                setGenresValue(genresData)
                console.log(genresData);
                setTeaserMovies(genresData.results)


                const respo = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${movieApiKey}`
                  );
                  const resuult = await respo.json();
                  setListOfMovies(resuult.genres);
                  console.log(resuult);
                


            }
            catch (error) {
                console.log("error fetchin");
                
            }
        };fetchMovies()
    },[])

    return(
        <>
        <Header />
        <section className="page-primary pt-[59px]">
            <div className="py-8 lg:pt-[52px]" >
                <h2 className="mb-8 text-2xl font-semibold text-foreground lg:text-3xl">Search Filter</h2>
                <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0">
                <div className="static h-fit w-full lg:sticky lg:top-[111px] lg:w-[387px]">
                    <div className="space-y-5">
            <div className="text-foreground space-y-1">
                <h3 className="text-2xl font-semibold">Genres</h3>
                <p className="text-base">See lists of movies by genre</p>
            </div>
            <div className="flex flex-wrap gap-4">
                {listOfMovies.map((el,index) => (
                    <div key={index} className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full cursor-pointer">{el?.name}</div>
                ))}
                </div>
                </div>
                </div>
                <div  role="none" className="MovieZ - Filter Your Favorite Movies"></div>
                <div className="flex-1 space-y-8 lg:pr-12">
                 <h4 className="text-xl text-foreground font-semibold">{genresValue.total_results} "titles"</h4>
                 <div className="flex flex-wrap gap-5 lg:gap-x-12 lg:gap-y-8">
                    {teaserMovies.map((el,index)=> (
                        <div key={index}>
                            <Link href={`detail/${el?.id}`} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[165px]">
                            <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[165px] lg:h-[244px]">
                                <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
                                    <img src={`https://image.tmdb.org/t/p/w500${el?.poster_path}`} className="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" />
                                    <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
                                    <div className="p-2">
                                        <div className="flex items-center gap-x-1">
                                            <div className="font-medium">
                                                <span className="text-foreground text-sm">{el?.vote_average}</span>
                                                <span className="text-muted-foreground text-xs">10</span>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>

                            </Link>
                        </div>
                    ))}
                 </div>


                </div>
            </div>
            </div>

        </section>
        <Footer />
        </>
    )
} 
export default ExampleComponent