'use client'

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import {useEffect, useState } from "react"
import Link from "next/link";
import Star from "@/app/icons/Star"
import { useRouter, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


type Genre = {
    name: string;
    id: number
};
type Movie = {
    title: string
    vote_average: number
    poster_path: string
    original_title: string
    id: string
    total_results: number
    genre_ids: number[]
};
type GetGenreMoviesResponse = {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}


const movieApiKey = "877ff59e9c1c2cdcec5fb423b387b410";

const ExampleComponent = () => {
    const [genresValue, setGenresValue] = useState<Genre[]>([]);
    const [listOfMovies, setListOfMovies] = useState<GetGenreMoviesResponse>({} as GetGenreMoviesResponse);
    const searchParams = useSearchParams();
    const selectedGenres = (searchParams.get('genrelds') || '').split(',');
    const selectedPage = (searchParams.get("page") ||  "1")
    
    
    
    const router = useRouter()
    console.log(router);
    


    const handlePageChange = (direction: "next" | "prev") => {
        if(direction=== "next") {
           let newPage = (Number(selectedPage) + 1).toString()
            const params = new URLSearchParams(searchParams.toString())
            console.log(params);
            params.set('page' ,newPage)
            const newQueryString = params.toString()
            console.log(newQueryString + " sonirhol");
            router.push(`?${newQueryString}`)
            
            


            

        } else if (direction === "prev") {
            let newPage = (Number(selectedPage) - 1).toString()
            const params = new URLSearchParams(searchParams.toString())
            console.log(params);
            params.set('page' ,newPage)
            const newQueryString = params.toString()
            console.log(newQueryString + " sonirhol");
            router.push(`?${newQueryString}`)
        }
        
      };
      

    const getGenres = async () => {
        const respo = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${movieApiKey}`
        );
        const resuult = await respo.json();
        setGenresValue(resuult.genres);
    }

    const getGenreMovies = async () => {
        const movieResponses = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${selectedGenres}&page=${selectedPage}&api_key=${movieApiKey}`);
        const movies = await movieResponses.json();
        setListOfMovies(movies)
        console.log(movies);
        
    }

    useEffect(() => {
        getGenres();
    }, []);
    
    useEffect(() => {
        getGenreMovies();
    }, [searchParams]);

    const handleGenreClick = (genreId: string) => {

        const params = new URLSearchParams(searchParams.toString());  
        console.log(params + " sonirhol" );

        selectedGenres.push(genreId);





        params.set('genrelds', selectedGenres.join(','));
        const newQueryString = params.toString()
        console.log(newQueryString + " tata");

        

        
        router.push(`?${newQueryString}`)

    };

    return (
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
                                    {genresValue.map((el) => (
                                        <div key={el.id}>
                                            <button
                                                onClick={() => handleGenreClick(el.id.toString())

                                                }
                                                className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full cursor-pointer">
                                                {el?.name}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-8 lg:pr-12">
                            <h4 className="text-xl text-foreground font-semibold">{listOfMovies.total_results} "titles"</h4>
                            <div className="flex flex-wrap gap-5 lg:gap-x-12 lg:gap-y-8">
                                {listOfMovies.results?.map((el) => (
                                    <div key={el.id}>
                                        <Link href={`/detail/${el?.id}`} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[190px]">
                                            <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[190px] lg:h-[281px]">
                                                <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
                                                    <img src={`https://image.tmdb.org/t/p/w500${el?.poster_path}`} alt="" />
                                                </span>
                                                <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
                                            </div>
                                            <div className="p-2">
                                                <div className="flex items-center gap-x-1">
                                                    <Star />
                                                    <div className="font-medium">
                                                        <span className="text-foreground text-sm">{el?.vote_average}</span>
                                                        <span className="text-muted-foreground text-xs">/10</span>
                                                    </div>
                                                </div>
                                                <div className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">{el?.original_title}</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => handlePageChange("prev")} />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink></PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink ></PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext onClick={() => handlePageChange("next")} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
            
                        </div>
            <Footer />
        </>
    )
};

export default ExampleComponent;
