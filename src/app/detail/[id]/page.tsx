"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Star from "@/app/icons/Star"
type trailerSelected = {
  site:string
} 
type  posterSelected = {
  id:number,
  title:string

}
type similarSelected = {

}
type creditSelected = {

}
const movieApiKey = "877ff59e9c1c2cdcec5fb423b387b410";

const ExampleComponent = () => {
  const [trailerValue,setTrailerValue] = useState<trailerSelected[]>([])
  const [posterValue,setIdPosterValue] = useState<posterSelected[]>([])
  const [similarValue,setSimilarValue] = useState<similarSelected[]>([])
  const [creditValue,setCreditValue] = useState<creditSelected[]>([])





  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (!params.id) {
      console.log("Movie ID is missing");
      return;
    }

    console.log("Movie ID type:", typeof params.id);

    const fetchMovieData = async (movieId: string) => {
      try {
        const trailerRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${movieApiKey}`
        );
        const trailerData = await trailerRes.json();
        console.log(trailerData.results, "videos");
        setTrailerValue(trailerData.results)


        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${movieApiKey}`
        );
        const creditsData = await creditsRes.json();
        console.log(creditsData, "credits");
        setCreditValue(creditsData)



        const moviePoster = await fetch (
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieApiKey}`
        );
        const posterData = await moviePoster.json();
        console.log(posterData , "poster DAta");
        setIdPosterValue(posterData)



  
        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&api_key=${movieApiKey}&page=1`
        );
        const similarData = await similarRes.json();
        console.log(similarData.results, "similar movies");
        setSimilarValue(similarData)



      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData(params.id);
  }, [params.id]);




  return (
    <>
<Header />
<section className="page-detail text-foreground">
  <div className="mt-8 mb-4 px-5 flex justify-between lg:mt-[80px] lg:mb-6 lg:px-0">
    <div className="space-y-1">
      <h1 className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">{posterValue?.title}</h1>
      <h4 className="text-sm lg:text-lg">{posterValue?.release_date}</h4>
    </div>
    <div className="text-xs">
      <h5 className="hidden lg:block">Rating</h5>
      <div className="flex items-center py-[2px] gap-x-1">
        <Star />
        <div>
          <div className="flex items-center gap-x-1">
            <div className="font-medium">
              <span className="text-foreground text-sm">{posterValue?.vote_average}</span><span className="text-muted-foreground text-xs">/10</span>
            </div>
          </div>
          <div className="text-muted-foreground">{posterValue?.vote_count}</div>
        </div>
      </div>
    </div>

  </div>
  <div className="flex gap-x-8 mb-8">
    <div className="overflow-hidden relative hidden lg:block w-[290px] h-[428px] rounded">
      <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
        <img src={`https://image.tmdb.org/t/p/w500${posterValue?.poster_path}`} alt="" />
      </span>
      <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
    </div>
    <div className="relative">
      <div className="absolute inset-0 z-10 bg-black/40">
      <div className="relative overflow-hidden w-[375px] lg:w-[760px] h-[211px] lg:h-[428px] lg:rounded">
        <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
    <img className="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src={`https://image.tmdb.org/t/p/w500${posterValue?.backdrop_path}`} alt="" />
        </span>
        </div>
        </div>
    </div>
  </div>
  </section>


<Footer />
</>
  );
};

export default ExampleComponent;