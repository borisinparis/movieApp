'use client'

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useEffect, useState } from "react"
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
import { SectionCard } from "@/components/SectionCard";
import { DynamicPagination } from "@/components/DynamicPagination";


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
    const selectedPage = (searchParams.get("page") || "1")
    const [totalPage,setTotalPage] = useState<number>(1)

    const router = useRouter()
    console.log(router);

    const getGenres = async () => {
        const respo = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${movieApiKey}`
        );
        const resuult = await respo.json();
        setGenresValue(resuult.genres);
        setTotalPage(resuult.total_pages)
    }
    const getGenreMovies = async () => {
        const movieResponses = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${selectedGenres}&page=${selectedPage}&api_key=${movieApiKey}`);
        const movies = await movieResponses.json();
        setListOfMovies(movies)
        console.log(movies);
        setTotalPage(movies.total_pages)
    }

    useEffect(() => {
        getGenres();
    }, []);

    useEffect(() => {
        getGenreMovies();
    }, [searchParams]);

    const handleGenreClick = (genreId: string) => {

        const params = new URLSearchParams(searchParams.toString());
        console.log(params + " sonirhol");
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
                                    <div key={el.id} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]" >
                                        <SectionCard {...el} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
<DynamicPagination total_page={totalPage} />
            <Footer />
        </>
    )
};

export default ExampleComponent;
