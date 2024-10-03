import React from "react"
import { Button } from "./ui/button"
import TypeAnimation from "./type-Animation"
import Link from "next/link"

const Banner = () => {
  return (
    <div className="h-full flex justify-center items-center text-center py-32">
      <div className="space-y-8">
        <h3 className="text-md md:text-xl">Welcome to Next Tech ShowCase</h3>
        <TypeAnimation />
        <h3 className="text-sm md:text-xl pb-8">
          Discover stories, thinking, and expertise from writers on any topic
        </h3>
        <Link href="/blogs">
          <Button>Start Reading</Button>
        </Link>
      </div>
    </div>
  )
}

export default Banner
