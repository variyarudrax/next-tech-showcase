"use client"
import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Post } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { fetchBlogs } from "@/services"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import Layout from "@/components/layout"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
const BlogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10
  const { data: session } = useSession()
  if (session === undefined) {
    redirect("/login")
  }
  const {
    data: posts,
    isLoading,
    isError,
    error
  } = useQuery<Post[]>({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchBlogs(currentPage, postsPerPage)
  })

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <p>Error loading posts.</p>
        <pre>{error instanceof Error ? error.message : "Unknown error"}</pre>
      </div>
    )
  }

  return (
    <Layout>
      <div className="py-6">
        {isLoading ? (
          <div className="space-y-0">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="border p-4 rounded shadow" data-testid="skeleton-item">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-1" />
                </div>
              ))}
          </div>
        ) : (
          <DataTable columns={columns} data={posts || []} />
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outline" onClick={handleNextPage} disabled={currentPage === 10}>
            Next
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default BlogsPage
