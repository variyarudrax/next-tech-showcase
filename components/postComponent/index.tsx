import Image from "next/image"
import React from "react"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

interface PostDetails {
  id: number
  autherName: string
  autherImg: string
  title: string
  content: string
  createdAt: string
  postImage: string
}

const PostComponent = ({ postDetails }: { postDetails: PostDetails }) => {
  const router = useRouter()

  const handlePostClick = (postId: number) => {
    router.push(`/post/${postId}`)
  }

  return (
    <>
      <div className="my-10 cursor-pointer" onClick={() => handlePostClick(postDetails.id)}>
        <div className="flex gap-2 items-center">
          <div>
            <Image
              className="rounded-full"
              src={postDetails.autherImg}
              alt="userProfileImage"
              width={20}
              height={20}
            />
          </div>
          <div>
            <span className="text-xs">{postDetails.autherName}</span>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-12 gap-3 justify-between">
            <div className="col-span-12 md:col-span-9">
              <span className="text-2xl font-semibold block mt-5">{postDetails.title}</span>
              <span className="text-sm block mt-8">{postDetails.content.substring(0, 320)}...</span>
              <span className="text-sm text-gray-400 font-semibold mt-5">
                {postDetails.createdAt}
              </span>
            </div>
            <div className="col-span-12 md:col-span-3">
              <Image src={postDetails.postImage} alt="postImage" width={350} height={20} />
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
    </>
  )
}

export default PostComponent
