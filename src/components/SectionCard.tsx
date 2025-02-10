import Link from "next/link";
import Star from "@/app/icons/Star";

type movieType = {
    id: string;
    vote_average: number;
    original_title: string;
    poster_path: string;
  };
  

export const SectionCard = ({ id, vote_average, original_title, poster_path }: movieType) => {
  return (
    <Link href={`/detail/${id}`} className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
      <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
        <span>
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={original_title} />
        </span>
        <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
      </div>
      <div className="p-2">
        <div className="flex items-center">
          <Star />
          <div>
            <span className="text-foreground text-sm">{vote_average}</span>
            <span className="text-muted-foreground text-xs">/10</span>
          </div>
        </div>
        <h4>{original_title}</h4>
      </div>
    </Link>
  );
};
