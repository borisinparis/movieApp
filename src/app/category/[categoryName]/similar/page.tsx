'use client'
import { useParams, useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import React, { useEffect, useState } from "react"
import { SectionCard } from "@/components/SectionCard"
import { DynamicPagination } from "@/components/DynamicPagination"
type Movie = {
    id: string,
    title: string
    vote_average: number
    poster_path: string
    original_title: string
}
const movieApiKey = "877ff59e9c1c2cdcec5fb423b387b410"
export const ExampleComponent = () => {

    const [selectedMovie,setSelectedMovie] = useState<Movie []>([])
    const [totalPage,setTotalPage] = useState<number>(1)

    
    const searchParams = useSearchParams()
    const selectedPage =searchParams.get('page') || "1"
    const router = useRouter()
    console.log(searchParams);
    
    
    const params = useParams<{categoryName: string}>()
    console.log(params);

    useEffect(() => {
        if(!params.categoryName) {
            console.log("movie id missing");
            return
        }
        const fetchMovies = async () => {
            try{
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${params.categoryName}/similar?page=${selectedPage}language=en-US&api_key=${movieApiKey}`
                );
                const result = await response.json();
                setSelectedMovie(result?.results)
                setTotalPage(result?.total_pages)
                console.log(result);
                
            }
            catch(error) {
                console.log("error fetching");
                
            }
        };
        fetchMovies();
    },[params.categoryName,searchParams])    
    return(
        <>
<Header />
<h3 className="mt-40 text-[40px] ml-[40px]">more like this</h3>
<div className="flex flex-wrap gap-7 lg:gap-8">
{ selectedMovie?.map((el,index) => (
    <div key={index} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
        <SectionCard {...el} />
    </div>
 
))}
</div>
<DynamicPagination total_page={totalPage}/>
<Footer />
        </>
    )
}
export default ExampleComponent