"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useLocation } from "react-router-dom"

export const ExampleComponent = () => {

    
    const searchParams = useSearchParams()
    const page =searchParams.get('page') || "1"
    console.log(searchParams);
    const location = useLocation()
    console.log(location.pathname);
    
    
    const params = useParams()
    console.log(params +  " sss");

    
    return(
        <>
        <div>fasffasfasfasfa</div>
        </>
    )
}
export default ExampleComponent