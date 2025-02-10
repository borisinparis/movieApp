'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import RightArrow from "@/app/icons/RightArrow"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import LoadingPage from "@/components/loading"
import { SectionCard } from "./SectionCard"

type Movie = {
  id: string,
  title: string
  vote_average: number
  poster_path: string
  original_title: string
}
type Top = {
  title: string
  vote_average: number
  poster_path: string
  original_title: string
  id: string
}
type Popular = {
  title: string
  vote_average: number
  poster_path: string
  original_title: string
  id: string

}
const movieApiKey = "877ff59e9c1c2cdcec5fb423b387b410"

const category = [
  { name: "upcoming" },
  { name: "popular" },
  { name: "top_rated" }
]


export const Section = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false);
  const [topRated, setTopRated] = useState<Top[]>([])
  const [popularMovie, setPopularMovie] = useState<Popular[]>([])

  useEffect(() => {
    const fetchMovies = async () => {

      try {
        setLoading(true)
        // Fetch Popular Movies
        const popularRes = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}`
        );
        const popularData = await popularRes.json();
        setPopularMovie(popularData.results);
        console.log(popularData.results);


        // Fetch Top-Rated Movies
        const topRatedRes = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${movieApiKey}`
        );
        const topRatedData = await topRatedRes.json();
        setTopRated(topRatedData.results);

        // Fetch Upcoming Movies
        const upcomingRes = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${movieApiKey}`
        );
        const upcomingData = await upcomingRes.json();
        setSelectedMovie(upcomingData.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);

      }
    };
    fetchMovies();

  }, []);
  return (<>
    {loading && <>
      <LoadingPage />
    </>

    }
    <div className='relative w-[1290px] m-auto '>
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem><img className='w-[100%] h-full' src="coverpng.jpeg" alt="" /></CarouselItem>
          <CarouselItem><img className="w-[100%] h-full" src="coverpng.jpeg" /></CarouselItem>
          <CarouselItem> < img className="w-[100%] h-full" src="coverpng.jpeg" /></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    <div className='page-primary py-8 lg:py-13 space-y-8 lg:space-y-13'>
      <div className='w-[80%] m-auto'>
        <div className='flex items-center justify-between'>
          <h3 className='text-foreground text-2xl font-semibold'>Upcoming </h3>
          <Link href={`/category/${category[0].name}`} className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2'>
            "See more"
            <RightArrow />
          </Link>
        </div>
        <div className='flex flex-wrap gap-7'>
          {selectedMovie?.map((movie, idx) => (
            <div key={idx} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
              <SectionCard {...movie} />
            </div>
          ))}
        </div>

      </div>


      <div className='w-[80%] m-auto'>
        <div className='flex items-center justify-between'>
          <h3 className='text-foreground text-2xl font-semibold'>Popular </h3>
          <Link href={`/category/${category[1].name}`} className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2'>
            "See more"
            <RightArrow />
          </Link>
        </div>
        <div className='flex flex-wrap gap-7'>
          {popularMovie?.map((movie, idx) => (
            <div key={idx} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
              <SectionCard {...movie} />
            </div>
          ))}
        </div>

      </div>



        <div className="w-[80%] m-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-2xl font-semibold">Top-rated</h3>
          <Link className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2" href={`/category/${category[1].name}`}>
          "See more"
            <RightArrow />
          </Link>
        </div>
        <div className="flex flex-wrap gap-7">
          {topRated?.map((movie, idx) => (
            <div key={idx} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
              <SectionCard {...movie} />
            </div>
          ))}


        </div>
        </div>
      </div>
  </>)
}
export default Section