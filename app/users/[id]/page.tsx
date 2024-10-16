"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"
import { User } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { CircleArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { fetchUserData } from "@/services"

type Params = {
  params: {
    id: number
  }
}

const LoadingSkeleton = () => {
  return (
    <div className="container mx-auto p-4 ">
      <Card className="h-auto w-full p-4">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
          </div>
          <div className="mb-2">
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="mb-2">
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="mb-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const UserNotFound = () => {
  return (
    <div className="container mx-auto p-4">
      <CardTitle>User Details</CardTitle>
      <Card className="h-auto w-full p-4 text-center text-red-500">
        <CardHeader>
          <h1>Oops! User not found</h1>
        </CardHeader>
      </Card>
    </div>
  )
}

const BackButton = ({ router }: { router: ReturnType<typeof useRouter> }) => {
  return (
    <div className="flex mt-4 text-md">
      <div>
        <Button onClick={() => router.back()}>
          <div className="flex items-center">
            <CircleArrowLeft className="h-7 w-5 mr-1" />
            <span>Go Back</span>
          </div>
        </Button>
      </div>
    </div>
  )
}

const UserInfo = ({ params: { id } }: Params) => {
  const router = useRouter()

  const {
    data: user,
    isLoading,
    isFetching,
    isError
  } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => fetchUserData(id)
  })

  if (isError) {
    return <div className="container mx-auto p-4 text-red-500">Error fetching User Info.</div>
  }

  return (
    <>
      {" "}
      {isLoading || isFetching ? (
        <LoadingSkeleton />
      ) : !user || Object.keys(user).length === 0 ? (
        <UserNotFound />
      ) : (
        <BackButton router={router} />
      )}
      {!isFetching && (
        <div className="container mx-auto p-4">
          {user &&
            (() => {
              const { name, email, address, phone, website, company } = user
              return (
                <>
                  <CardTitle className="my-4">User Details</CardTitle>
                  <Card className="h-auto w-full p-4">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{name}</CardTitle>
                      <CardDescription className="text-sm">{email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2">
                        <strong>Address:</strong>
                        <p>{`${address?.street}, ${address?.suite}`}</p>
                        <p>{`${address?.city}, ${address?.zipcode}`}</p>
                      </div>
                      <div className="mb-2">
                        <strong>Phone:</strong>
                        <p>{phone}</p>
                      </div>
                      <div className="mb-2">
                        <strong>Website:</strong>
                        <a
                          href={`http://${website}`}
                          className="text-blue-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {website}
                        </a>
                      </div>
                      <div className="mb-2">
                        <strong>Company:</strong>
                        <p>{company?.name}</p>
                        <p className="italic">{company?.catchPhrase}</p>
                        <p>{company?.bs}</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )
            })()}
        </div>
      )}
    </>
  )
}

export default UserInfo
