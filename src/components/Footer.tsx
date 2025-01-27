import MovieIcon from "@/app/icons/Movieicon"
import MailIcon from "@/app/icons/Mail"
import PhoneIcon from "@/app/icons/Phone"
export const Footer = () => {


    return <>
    <footer className='bg-indigo-700 py-10 px-5 text-sm text-[#fafafa]'>
  <div className='mx-auto flex flex-col justify-between gap-y-7 lg:flex-row max-w-screen-xl'>
    <div className='space-y-3'>
      <a className='flex items-center gap-x-2' href="">
        <MovieIcon/>
        <h4 className='italic font-bold'>BorisinMovie</h4>
      </a>
      <p>© 2024 Borisinparis B. All Rights Reserved.</p>

    </div>
    <div className='flex gap-x-12 lg:gap-x-24'> 
      <div className='space-y-3'>Contact Information
        <div className='space-y-6'>
          <div className='flex items-center gap-x-3'>
            <MailIcon/>
            <div>
              <h5 className='font-medium'>Email
                </h5>
                <p>mnkymgaa@gmail.com</p>
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
          <p>+976 94-1777-44 </p>
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
}
export default Footer