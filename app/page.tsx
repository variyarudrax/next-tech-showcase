"use client"

import PostComponent from "@/components/postComponent"
import { SkeletonCard } from "@/components/skeletonCards"
import { fetchPosts } from "@/services/ApiServices"
import { useQuery } from "@tanstack/react-query"

interface PostDetails {
  id: number
  autherName: string
  autherImg: string
  title: string
  content: string
  createdAt: string
  postImage: string
}
export default function Home() {
  const {
    isLoading,
    isError,
    data: postData
  } = useQuery<PostDetails[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts
  })

  if (isLoading) {
    return (
      <main className="container">
        {[...Array(4)].map((id) => (
          <SkeletonCard key={id} />
        ))}
      </main>
    )
  }
  if (isError) {
    return <main className="container">There is an error.</main>
  }

  return (
    <main className="flex container flex-col items-center">
      <div className="w-full">
        {postData?.map((postDetails: PostDetails) => (
          <PostComponent key={postDetails.id} postDetails={postDetails} />
        ))}
      </div>
    </main>
  )
}
