'use client'
import React, { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Star from "@/app/icons/Star"
import { useParams } from "next/navigation";
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useCallback } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type Movie = {
    id: string,
    title: string
    vote_average: number
    poster_path: string
    original_title: string
}

const movieApiKey = "877ff59e9c1c2cdcec5fb423b387b410"

const ExampleComponent = () => {

    const [selectedMovie, setSelectedMovie] = useState<Movie[]>([])


    const searchParams = useSearchParams();
    const selectedPage = (searchParams.get("page") || '1')
    const router = useRouter()


    const params = useParams<{ categoryName: string }>();



    useEffect(() => {
        if (!params.categoryName) {
            console.log("Movie id is missing");
            return

        }

        console.log("Movie ID type:", params.categoryName);



        const fetchMovies = async (categoryId: string) => {
            try {
                const popularResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${categoryId}?page=${selectedPage}&api_key=${movieApiKey}`
                );
                const popularData = await popularResponse.json();
                setSelectedMovie(popularData.results)

            }
            catch (error) {
                console.log("error fetchin movies");

            }

        };
        fetchMovies(params.categoryName);

    }, [params.categoryName,searchParams])




    const handlePageChange = (direction: "next" | "prev") => {
        if (direction === "next") {
            let newPage = (Number(selectedPage) + 1).toString()
            const params = new URLSearchParams(searchParams.toString())
            params.set("page", newPage)
            const newQueryString = params.toString()
            console.log(newQueryString);
            router.push(`?${newQueryString}`)


        }
        if (direction === "prev") {
            let newPage = (Number(selectedPage) - 1).toString()
            const params = new URLSearchParams(searchParams.toString())
            params.set("page", newPage)
            const newQueryString = params.toString()
            console.log(newQueryString);
            router.push(`?${newQueryString}`)



        }


    };

    return (
        <>
            <Header />
            <div className="flex flex-wrap gap-5 lg:gap-8">
                {selectedMovie.map((movie, idx) => (
                    <div key={idx}>
                        <Link href={`/detail/${movie?.id}`} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
                            <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
                                <span className="box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:absolute;top:0;left:0;bottom:0;right:0">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" />
                                </span>
                                <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30">
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="flex items-center gap-x-1">
                                    <Star />
                                    <div className="">
                                        <span className="text-foreground text-sm">
                                            {movie?.vote_average}
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                            /10
                                        </span>
                                    </div>
                                </div>
                                <h4 className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">{movie?.original_title}</h4>

                            </div>
                        </Link>
                    </div>

                ))}
            </div>


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

}
export default ExampleComponent