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
// import Movie from "@/components/movie"
import React, { useEffect, useState } from "react"

type Movie = {
  title: string
  vote_average: number
  poster_path: string
  original_title:string
}
type Top = {
  title : string
  vote_average: number
  poster_path:string
  original_title:string
}
type Popular = {
  title : string
  vote_average: number
  poster_path:string
  original_title:string
}


export const Section = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie[]>([])
  const [topRated, setTopRated] = useState<Top[]>([])
  const [popularMovie,setPopularMovie] =useState<Popular []>([])

  const PopularMovies = async () => {
    try {
      const reps = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}`)
      const resu = await reps.json()
      setPopularMovie(resu.results)
      console.log(resu);

    }
    catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    PopularMovies()
  }, [])




  const getTopMovies = async () => {
    try {
      const rep = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${movieApiKey}`)
      const res = await rep.json()
      setTopRated(res.results)
      console.log(res);

    }
    catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getTopMovies()
  }, [])


  const movieApiKey = "877ff59e9c1c2cdcec5fb423b387b410"

  const getMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${movieApiKey}`)
      const result = await response.json()
      setSelectedMovie(result.results)
      console.log(result);


    }
    catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getMovies()
  }, [])

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
          <a className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2' href="">
            "See more"
            <RightArrow />
          </a>
        </div>
        <div className='flex flex-wrap gap-5 lg:gap-8'>
          {selectedMovie?.map((movie, idx) => (

            <a key={idx} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
              <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
                <span className="box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:absolute;top:0;left:0;bottom:0;right:0">
                  <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" />
                </span>
                <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30">
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
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className='space-y-8'>
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-2xl font-semibold">Popular</h3>
          <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2" href="">"See more"
            <RightArrow />
          </a>
        </div>
        <div className="flex flex-wrap gap-5 lg:gap-8">
          {popularMovie?.map((movie, idx) => (

            <a key={idx} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
              <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
                <span className="box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:absolute;top:0;left:0;bottom:0;right:0">
                  <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" />
                </span>
                <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30">
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
                </div>
              </div>
            </a>
          ))}


        </div>
      </div>
      <div className='space-y-8'>
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-2xl font-semibold">Top-rated</h3>
          <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2" href="">"See more"
            <RightArrow />
          </a>
        </div>
        <div className="flex flex-wrap gap-5 lg:gap-8">
          {topRated?.map((movie, idx) => (

            <a key={idx} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
              <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
                <span className="box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:absolute;top:0;left:0;bottom:0;right:0">
                  <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" />
                </span>
                <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30">
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
                </div>
              </div>
            </a>
          ))}

        </div>
      </div>
    </div>
  </>)
}
export default Section