"use client";

import { Star } from "lucide-react";

import ReactPlayer from "react-player";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils";

export const Slide = ({
    movie,
    imageUrl,
}: {
    movie: Popular;
    imageUrl: string;
}) => {
    const [movieVideo, setMovieVideo] = useState<string>("");

    useEffect(() => {
        fetchData(`/movie/${movie.id}/videos?language=en-US`).then((response) => {
            setMovieVideo(response?.results[0]?.key);
        });
    }, []);

    return (
        <div className="relative">
            <img
                className="object-cover w-full h-full"
                src={imageUrl}
                alt={movie.title}
            />
            <div className="absolute top-0 left-0 w-full h-[600px] ">
                <div className=" text-white w-full space-y-3  flex justify-start items-center max-w-screen-xl m-auto h-full">
                    <div className="w-[404px] space-y-4">
                        <div className="">
                            <p>Now playing:</p>
                            <p className="text-4xl font-bold">{movie.title}</p>
                            <div className="flex">
                                <Star color="yellow" fill="yellow" />
                                <p>
                                    {movie.vote_average} <span>/10</span>
                                </p>
                            </div>
                        </div>
                        <p>{movie.overview}</p>

                        <Dialog>
                            <DialogTrigger>
                                <div className="text-secondary-foreground bg-background px-2 py-1 rounded-md">
                                    Watch trailer
                                </div>
                            </DialogTrigger>
                            <DialogContent className="w-fit max-w-screen">
                                <DialogTitle></DialogTitle>
                                <DialogDescription></DialogDescription>
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${movieVideo}`}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};
