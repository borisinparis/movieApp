import MovieIcon from "@/app/icons/Movieicon"
import ThemeSwitch from "./ThemeSwitch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useEffect,useState } from "react"
  import Search from "@/app/icons/Search"
  type searchValue = string;

export const Header = () => {
    const [searchValue,setSearchValue] = useState<searchValue>("")

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        console.log(searchValue);
        
      } 
    useEffect (() => {

    },[searchValue])


    return <>
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
 
  <ThemeSwitch />


</div>

    </div>
</div>
</header>
    
    
    </>
}
export default Header