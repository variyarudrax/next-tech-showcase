import { Metadata } from "next"
import Layout from "@/components/layout"
import Banner from "@/components/banner"
import { auth } from "@/providers/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Blogger",
  description: "A simple blogger site"
}
export default async function Home() {
  const session = await auth()
  if (!session) redirect("/login")
  return (
    <div className="flex flex-col h-[100vh]">
      <Layout>
        <Banner />
      </Layout>
    </div>
  )
}
