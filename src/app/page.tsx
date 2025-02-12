// import { useState } from "react"
// type formType = {
//   username:string;
//   description:string;
// } 
"use client"
import Section from '@/components/Section'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


export default function Home() {

  return (
    <>
    <div className='h-fit'>
      <Header />
      <Section />
      <Footer />
      </div>
    </>
  )
}

