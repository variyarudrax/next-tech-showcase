import { Metadata } from "next"
import Banner from "@/components/banner"

export const metadata: Metadata = {
  title: "Blogger",
  description: "A simple blogger site"
}
export default async function Home() {
  return <Banner />
}
