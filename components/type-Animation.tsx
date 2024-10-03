"use client"
import React from "react"
import { TypeAnimation as ReactTypeAnimation } from "react-type-animation"

const TypeAnimation = () => {
  return (
    <ReactTypeAnimation
      sequence={[
        "Stay \n Curious",
        1000,
        "Stay\n Driven",
        1000,
        "Stay\n Inspired",
        1000,
        "Stay\n Connected",
        1000
      ]}
      wrapper="span"
      speed={50}
      className="text-[2rem] md:text-[3.5rem] inline-block"
      repeat={Infinity}
    />
  )
}

export default TypeAnimation
