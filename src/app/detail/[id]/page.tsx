"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Star from "@/app/icons/Star"
import RightArrow from "@/app/icons/RightArrow";
import Play from "@/app/icons/Play"
import ReactPlayer from 'react-player'
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SectionCard } from "@/components/SectionCard";

type trailerSelected = {
  site: string
  id: string
  key: string
}
type posterSelected = {
  id: number
  title: string
  vote_count: number
  release_date: string
  vote_average: number
  poster_path: string
  backdrop_path: string
  overview: string
}
type similarSelected = {
  poster_path: string
  vote_average: number
  original_title: string
  id: string

}
type creditSelected = {

}
type genresSelected = {
  name: string
}
const movieApiKey = "877ff59e9c1c2cdcec5fb423b387b410";

const ExampleComponent = () => {
  const [trailerValue, setTrailerValue] = useState<trailerSelected>({} as trailerSelected)
  const [posterValue, setIdPosterValue] = useState<posterSelected>({} as posterSelected)
  const [similarValue, setSimilarValue] = useState<similarSelected[]>([])
  const [creditValue, setCreditValue] = useState<creditSelected[]>([])
  const [genresValue, setGenresValue] = useState<genresSelected[]>([])
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || "1"

  console.log('page', page)


  const params = useParams<{ id: string }>();
  console.log(params);
  

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
        console.log(trailerData.results[0], "videos");
        setTrailerValue(trailerData.results[0])


        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${movieApiKey}`
        );
        const creditsData = await creditsRes.json();
        console.log(creditsData, "credits");
        setCreditValue(creditsData)



        const moviePoster = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieApiKey}`
        );
        const posterData = await moviePoster.json();
        console.log(posterData, "poster DAta");
        setIdPosterValue(posterData)
        setGenresValue(posterData.genres)



        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&api_key=${movieApiKey}&page=1`
        );
        const similarData = await similarRes.json();
        console.log(similarData.results.slice(0, 5), "similar movies");
        setSimilarValue(similarData.results.slice(0, 5))



      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData(params.id);
  }, [params.id]);




  return (
    <>
      <Header />
      <section className="ml-auto mr-auto min-h-[100vh] max-w-[1080px] p-[59px] text-foreground">
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
            <span className="w-full absolute h-[428px] ">
              <img src={`https://image.tmdb.org/t/p/w500${posterValue?.poster_path}`} alt="" className="position absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-[100%] max-w-[100%] min-h-[100%] object-cover;" />
            </span>
            <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 z-10 bg-black/40">         </div>
            <div className="relative overflow-hidden w-[480px] lg:w-[760px] h-[211px] lg:h-[428px] lg:rounded">
              <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
                <img className="w-[100%]" src={`https://image.tmdb.org/t/p/w500${posterValue?.backdrop_path}`} alt="" />
              </span>
            </div>
            <div key={trailerValue?.id} className="absolute left-6 bottom-6 z-20">
              <div className="flex items-center space-x-3 text-white">
                <div>
                  <Dialog>
                    <DialogTrigger>
                      <div className="text-secondary-foreground bg-background px-2 py-1 rounded-md">
                        Watch trailer
                      </div>
                      </DialogTrigger>
                    <DialogContent className="w-fit max-w-screen">
                    <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${trailerValue?.key}`} />
                    </DialogContent>
                  </Dialog>
                </div>
                <Play />
              </div>
            </div>

          </div>
        </div>
        <div className="flex gap-x-[34px] lg:block">
          <div className="space-y-5 mb-5">
            <div className="flex flex-wrap gap-3">
              {genresValue?.map((el, index) => (
                <div key={index} className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full text-xs">{el?.name}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-base">{posterValue?.overview}</div>
        <div className="space-y-5 text-foreground mb-8">
          <div className="space-y-1 ">
            <div className="flex pb-1">
              <h4 className="font-bold w-16 mr-13">Director</h4>
              <div className="flex flex-1 flex-wrap">
              </div>
            </div>
          </div>
          <div className="space-y-1 "></div>
          <div className="space-y-1 "></div>
        </div>
        <div className="pb-8 lg:pb-[130.62px]">
          <div className="flex justify-between mb-8">
            <h3 className="text-2xl font-semibold">More like this</h3>
            <Link href={`/category/${params.id}/similar`} className="flex items-center">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"> See More</button>
              <RightArrow />
            </Link>
          </div>
          <div className="flex flex-wrap gap-7 lg:gap-8">
            {similarValue.map((el, index) => (
              <div key={index} className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
                <SectionCard {...el} />
              </div>
            ))}


          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ExampleComponent;