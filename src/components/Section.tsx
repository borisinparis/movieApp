'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import RightArrow from "@/app/icons/RightArrow"
import Star from "@/app/icons/Star"
import React, { useEffect, useState } from "react"
import Link from "next/link"

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
  const [topRated, setTopRated] = useState<Top[]>([])
  const [popularMovie, setPopularMovie] = useState<Popular[]>([])

  useEffect(() => {
    const fetchMovies = async () => {

      try {
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
      } catch (error) {
        console.error("Error fetching movies:", error);

      }
    };
    fetchMovies();
  }, []);
  return (<>
    <div className='relative mt-[59px] lg:mt-[83px] w-screen overflow-hidden'>
      <div className='flex -ml-10'>
        <div className='m-auto'>
          <Carousel>
            <CarouselContent>
              <CarouselItem><img className='w-[100%]' src="coverpng.jpeg" alt="" /></CarouselItem>
              <CarouselItem></CarouselItem>
              <CarouselItem></CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
    <div className='page-primary py-8 lg:py-13 space-y-8 lg:space-y-13'>
      <div className='space-y-8'>
        <div className='flex items-center justify-between'>
          <h3 className='text-foreground text-2xl font-semibold'>Upcoming </h3>
          <Link href={`/category/${category[0].name}`} className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2'>
            "See more"
            <RightArrow />
          </Link>
        </div>
        <div className='flex flex-wrap gap-5 lg:gap-8'>
          {selectedMovie?.map((movie, idx) => (
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
      </div>
      <div className='space-y-8'>
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-2xl font-semibold">Popular</h3>
          <Link className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2" href={`/category/${category[1].name}`}>"See more"
            <RightArrow />
          </Link>
        </div>
        <div className="flex flex-wrap gap-5 lg:gap-8">
          {popularMovie?.map((movie, idx) => (
            <div key={idx}>

              <Link href={`/detail/${movie?.id}`} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
                <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
                  <span className="box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:absolute;top:0;left:0;bottom:0;right:0">
                    <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" />
                  </span>
                  <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div></div>
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
      </div>
      <div className='space-y-8'>
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-2xl font-semibold">Top-rated</h3>
          <Link className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2" href={`/category/${category[2].name}`}>"See more"
            <RightArrow />
          </Link>
        </div>
        <div className="flex flex-wrap gap-5 lg:gap-8">
          {topRated?.map((movie, idx) => (
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
      </div>
    </div>
  </>)
}
export default Section