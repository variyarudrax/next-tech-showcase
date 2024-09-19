import React from "react"
import { Button } from "./ui/button"
import TypeAnimation from "./type-Animation"

const Banner = () => {
  return (
    <div className="h-full flex justify-center items-center text-center py-32">
      <div className="space-y-8">
        <h3 className="text-xl">Welcome to Next Tech ShowCase</h3>
        <TypeAnimation />
        <h3 className="text-xl">
          Discover stories, thinking, and expertise from writers on any topic
        </h3>
        <Button>Start Reading</Button>
      </div>
    </div>
  )
}

export default Banner
