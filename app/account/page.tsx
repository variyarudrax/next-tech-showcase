"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { useSession } from "next-auth/react"
import Image from "next/image"
import React from "react"

const UserProfile = () => {
  const { data: session, status } = useSession()

  return (
    <>
      {status === "loading" ? (
        <div className="flex justify-center mt-28">
          <Icons.spinner className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <div className="my-10">
          <Card className="bg-slate-100 dark:bg-slate-800">
            <CardContent className="p-0">
              <figure className="lg:flex rounded-xl p-8 lg:p-0">
                {session &&
                  (() => {
                    const { user } = session
                    const { name, email, image } = user || {}
                    return (
                      <>
                        <Image
                          className="w-24 h-24 lg:w-56 lg:h-auto lg:rounded-none rounded-full mx-auto md:mx-0"
                          src={image as string}
                          alt=""
                          width="384"
                          height="512"
                        />
                        <div className="pt-6 lg:p-8 text-center lg:text-left space-y-4">
                          <blockquote>
                            <p className="text-lg font-medium">
                              Welcome back, {name}! Dive into your favorite topics and share your
                              thoughts with the community
                            </p>
                          </blockquote>
                          <figcaption className="font-medium">
                            <div className="text-sky-500 dark:text-sky-400">{name}</div>
                            <div className="text-slate-700 dark:text-slate-500">{email}</div>
                          </figcaption>
                        </div>
                      </>
                    )
                  })()}
              </figure>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default UserProfile
