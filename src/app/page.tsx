// import { useState } from "react"
// type formType = {
//   username:string;
//   description:string;
// } 
"use client"
import MovieIcon from './icons/Movieicon.jsx';
import { Button } from "@/components/ui/button"
import Search from "./icons/Search.jsx"
import Moon from './icons/Moon.jsx';
import MailIcon from "./icons/Mail.jsx"
import RightArrow from "./icons/RightArrow.jsx"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import  PhoneIcon  from './icons/Phone.jsx';
import { useState } from 'react';
type searchValue = string;

export default function Home() {
  const [searchValue,setSearchValue] = useState<searchValue>("")
  const [selectedMovies,SetSelectedMovies] = useState({})

  const movieApi = "877ff59e9c1c2cdcec5fb423b387b410"



  



  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    console.log(searchValue);
    
  } 

  // const [form,setForm] = useState<formType>({} as formType)
    return (
    <>
    <header className='fixed top-0 inset-x-0 z-20 h-[59px] bg-background flex items-center justify-center'>
    <div className='flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0'>
      <a href='http://localhost:3000/' className='flex items-center gap-x-2 text-indigo-700'>
    <MovieIcon/>
    <p className='italic font-bold'>BorisinMovie</p>
    </a>
    <div className='flex'>
      <div>
    <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
</div>
<div className='relative text-muted-foreground w-[379px]'>
  <Search className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2" />
  <input placeholder='Search...' value={searchValue} onChange={onChange} className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]' type="text" />

</div>
<div className='flex items-center gap-x-3'>
  <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9'>
<Moon />

  </button>
</div>

    </div>
</div>
</header>
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

    </div>
  </div>
  <div className='space-y-8'></div>
  <div className='space-y-8'></div>
</div>








<footer className='bg-indigo-700 py-10 px-5 text-sm text-[#fafafa]'>
  <div className='mx-auto flex flex-col justify-between gap-y-7 lg:flex-row max-w-screen-xl'>
    <div className='space-y-3'>
      <a className='flex items-center gap-x-2' href="">
        <MovieIcon/>
        <h4 className='italic font-bold'>BorisinMovie</h4>
      </a>
      <p>© 2024 Movie Z. All Rights Reserved.</p>

    </div>
    <div className='flex gap-x-12 lg:gap-x-24'> 
      <div className='space-y-3'>Contact Information
        <div className='space-y-6'>
          <div className='flex items-center gap-x-3'>
            <MailIcon/>
            <div>
              <h5 className='font-medium'>Email
                </h5>
                <p>support@movieZ.com</p>
              </div>
          </div>
          <div className='flex items-center gap-x-3'>

          </div>
        </div>
      </div>
      <div className='space-y-3'>
        <PhoneIcon />
        <div>
          <h5 className='font-medium'>Phone</h5>
          <p>+976 (11) 123-4567</p>
        </div>
      </div>
    </div>
    <div className='space-y-3'>
      <h4>Follow us</h4>
      <div className='flex flex-col gap-3 lg:flex-row'>
        <span className='font-medium'>Facebook</span><span className='font-medium'>Instagram</span><span className='font-medium'>Twitter</span><span className='font-medium'>YouTube</span>
      </div>
    </div>

  </div>


</footer>
  </>

  )

  
}

