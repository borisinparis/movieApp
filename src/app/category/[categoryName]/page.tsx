'use client'
import React, { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useParams } from "next/navigation";
import { useSearchParams, useRouter } from "next/navigation"
import { SectionCard } from "@/components/SectionCard"
import { DynamicPagination } from "@/components/DynamicPagination";

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
    const [totalPage, setTotalPage] = useState<number>(1)
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
                setSelectedMovie(popularData?.results)
                console.log(popularData);
                setTotalPage(popularData?.total_pages)


            }
            catch (error) {
                console.log("error fetchin movies");

            }

        };
        fetchMovies(params.categoryName);

    }, [params.categoryName, searchParams])
    return (
        <>
            <Header />
            <div className="w-[80%] m-auto mt-[60px]">
                <div className="flex flex-wrap gap-7 lg:gap-8">
                    {selectedMovie.map((movie, idx) => (
                        <div key={idx} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
                            <SectionCard {...movie} />
                        </div>

                    ))}
                </div>
            </div>
            <DynamicPagination total_page={totalPage} />
            <Footer />
        </>
    )

}
export default ExampleComponent