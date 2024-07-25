"use client"
import { Button } from "@/components/ui/button"
import { JSX, SetStateAction, SVGProps, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function Header() {
  const { data: session } = useSession()
  const [theme, setTheme] = useState("light")

  const handleTheme = (value: SetStateAction<string>) => {
    const htmlElement = document.documentElement
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark")
      setTheme(value)
    } else {
      htmlElement.classList.add("dark")
      setTheme(value)
    }
  }
  return (
    <nav className="z-50 shadow-sm ">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">TechShowCase</span>
          </Link>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="flex gap-5">
              <Link href="/new-story" className="font-medium text-sm mr-2" prefetch={false}>
                Write
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Theme</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={theme} onValueChange={handleTheme}>
                  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {!session ? (
              <Button onClick={() => signIn()}>Sign in</Button>
            ) : (
              <>
                <Link href={"/profile"} className="mr-2 font-medium text-sm">
                  Profile
                </Link>
                <Button onClick={() => signOut()}>Sign out</Button>
              </>
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
