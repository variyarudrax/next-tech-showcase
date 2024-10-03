"use client"

import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "@/lib/types"
import { fetchUsersData } from "@/services"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

const UsersPage = () => {
  const router = useRouter()

  const {
    data: users,
    isLoading,
    isError
  } = useQuery<User[], Error>({
    queryKey: ["usersData"],
    queryFn: () => fetchUsersData()
  })
  const openUserDetails = (id: string) => {
    router.push(`/users/${id}`)
  }
  if (isError) {
    return <div className="text-red-500">Error fetching photos.</div>
  }
  return (
    <Layout>
      <div className="mx-auto pt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <Card key={idx} className="h-full w-full p-5">
                  <CardHeader>
                    <Skeleton className="h-7 w-3/5 mb-3" />
                    <Skeleton className="h-5 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-5 w-full mb-2" />
                    </div>
                    <div className="mb-3">
                      <Skeleton className="h-5 w-full" />
                    </div>
                    <div className="mb-3">
                      <Skeleton className="h-5 w-full" />
                    </div>
                    <div className="mb-3">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : users?.map((user) => (
                <Card
                  key={user.id}
                  className="h-full w-full p-5 cursor-pointer"
                  onClick={() => openUserDetails(user.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                    <CardDescription className="text-sm">{user.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <strong>Location:</strong>
                      <p>
                        {user.address.street}, {user.address.suite}
                      </p>
                      <p>
                        {user.address.city}, {user.address.zipcode}
                      </p>
                    </div>
                    <div className="mb-3">
                      <strong>Contact:</strong>
                      <p>{user.phone}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Website:</strong>
                      <Link
                        href={`http://${user.website}`}
                        className="text-blue-600"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        rel="noopener noreferrer"
                      >
                        {user.website}
                      </Link>
                    </div>
                    <div className="mb-3">
                      <strong>Business:</strong>
                      <p>{user.company.name}</p>
                      <p>{user.company.catchPhrase}</p>
                      <p>{user.company.bs}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </Layout>
  )
}

export default UsersPage
