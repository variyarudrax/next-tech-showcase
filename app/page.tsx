import { Metadata } from "next"
import Layout from "@/components/layout"
import Banner from "@/components/banner"

export const metadata: Metadata = {
  title: "Blogger",
  description: "A simple blogger site"
}
export default async function Home() {
  return (
    <div className="flex flex-col h-[100vh]">
      <Layout>
        <Banner />
      </Layout>
    </div>
  )
}
