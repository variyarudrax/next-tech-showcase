"use client"

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
    return <div className="text-red-500">Error fetching Users data.</div>
  }

  const LoaderSkeleton = () => {
    return Array.from({ length: 8 }).map((_, idx) => (
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
  }

  const UsersCard = ({ id, address, company, email, name, phone, website }: User) => {
    return (
      <Card
        key={id}
        className="h-full w-full p-5 cursor-pointer"
        onClick={() => openUserDetails(id)}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <CardDescription className="text-sm">{email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <strong>Location:</strong>
            <p>
              {address.street}, {address.suite}
            </p>
            <p>
              {address.city}, {address.zipcode}
            </p>
          </div>
          <div className="mb-3">
            <strong>Contact:</strong>
            <p>{phone}</p>
          </div>
          <div className="mb-3">
            <strong>Website:</strong>
            <Link
              href={`http://${website}`}
              className="text-blue-600"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
            >
              {website}
            </Link>
          </div>
          <div className="mb-3">
            <strong>Business:</strong>
            <p>{company.name}</p>
            <p>{company.catchPhrase}</p>
            <p>{company.bs}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto pt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {isLoading ? (
          <LoaderSkeleton />
        ) : (
          users?.map(({ id, name, email, address, phone, company, website }) => (
            <UsersCard
              key={id}
              id={id}
              name={name}
              email={email}
              address={address}
              phone={phone}
              company={company}
              website={website}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default UsersPage
