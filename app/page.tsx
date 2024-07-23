"use client"

import { fetchPosts } from "@/services/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { userSchema } from "@/schema/validationSchema"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

type FormData = z.infer<typeof userSchema>

interface Todo {
  userId: number
  id: number
  title: string
  body: string
}
export default function Home() {
  const { data: session } = useSession()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: ""
    }
  })
  const {
    isLoading,
    isError,
    data: postData
  } = useQuery<Todo[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts
  })
  const handleClick = () => {
    const htmlElement = document.documentElement
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark")
    } else {
      htmlElement.classList.add("dark")
    }
  }
  if (isLoading) {
    return <main className="mt-4 flex justify-center min-h-screen items-center">Loading..</main>
  }
  if (isError) {
    return (
      <main className="mt-4 flex justify-center min-h-screen items-center">There is an error.</main>
    )
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Button className="my-5" onClick={() => handleClick()}>
        Theme change
      </Button>
      {session ? (
        <>
          <Image
            src={session.user?.image as string}
            alt={session.user?.name as string}
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1>Welcome, {session.user?.name}!</h1>
          <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
        </>
      ) : (
        <>
          <h1>Please login to view posts</h1>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}

      <h1 className="text-3xl py-5">Post list</h1>
      <div>{postData?.slice(0, 2)?.map((item: Todo) => <p key={item.id}>{item.title}</p>)}</div>

      <h1>Form with Zod Validation</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  )
}
