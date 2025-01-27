import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import RightArrow from "@/app/icons/RightArrow"
// import Movie from "@/components/movie"
import React, { useEffect, useState } from "react"
export const Section = () => {
    const [selectedMovie,SetSelectedMovie] = useState([])

    const movieApiKey="877ff59e9c1c2cdcec5fb423b387b410"

    const getMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieApiKey}`)
            const result = await response.json()
            SetSelectedMovie(result)
            console.log(result);
            
            
        }
        catch(error) {
            console.log(error);
            
        }
    }
    useEffect(()=> {
        getMovies()
    },[])

    return(<>
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
      <RightArrow/>
        </a>
    </div>
    <div className='flex flex-wrap gap-5 lg:gap-8'>
        {/* {selectedMovie.map((movie) =>(
            <li key={movie.id}>{movie.title}</li>
        ))} */}
    </div>
  </div>
  <div className='space-y-8'></div>
  <div className='space-y-8'></div>
</div>
    </>)
}
export default Section