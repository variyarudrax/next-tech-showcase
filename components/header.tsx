"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import DarkThemeIcon from "@/public/darkMode.png"
import lightModeIcon from "@/public/lightMode.png"
export default function Header() {
  const { data: session } = useSession()
  const [theme, setTheme] = useState(localStorage.getItem("theme"))
  const handleTheme = () => {
    const htmlElement = document.documentElement
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setTheme("light")
    } else {
      htmlElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setTheme("dark")
    }
  }
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">TechShowCase</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Services
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-8">
            {theme === "light" ? (
              <Image
                src={DarkThemeIcon}
                alt="darkTheme"
                width={25}
                height={25}
                className="cursor-pointer"
                onClick={handleTheme}
              />
            ) : (
              <Image
                src={lightModeIcon}
                alt="lightTheme"
                width={25}
                height={25}
                className="cursor-pointer"
                onClick={handleTheme}
              />
            )}
            {!session ? (
              <Button onClick={() => signIn()}>Sign in</Button>
            ) : (
              <Button onClick={() => signOut()}>Sign out</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
