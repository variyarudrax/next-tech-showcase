"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import {
  BookIcon,
  CircleUser,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Moon,
  MountainIcon,
  Sun,
  UserIcon,
  UsersIcon
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"

interface NavbarProps {
  session: any
}

const ThemeSwitcher = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const UserMenu = ({ session }: NavbarProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      {session ? (
        <Image
          src={session.user.image}
          alt={session.user.name}
          width={37}
          height={37}
          className="rounded-full cursor-pointer"
        />
      ) : (
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      )}
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {session?.user ? (
        <>
          <DropdownMenuItem>
            <Link href="/account">My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        </>
      ) : (
        <DropdownMenuItem>
          <Link href="api/auth/signin">Sign In</Link>
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
)

export default function Header() {
  const { data: session } = useSession()

  return (
    <nav className="border-b-2">
      <div className="container w-full mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div>
            <Link href="/" className="flex items-center" prefetch={false}>
              <MountainIcon className="h-6 w-6 mr-2" />
              <span className="tracking-widest text-lg">TechShowCase</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center">
            <div className="flex gap-3 items-center">
              {session && (
                <>
                  <Link href="/users" className="font-medium text-sm mr-2" prefetch={false}>
                    Users
                  </Link>
                  <Link href="/blogs" className="font-medium text-sm mr-2" prefetch={false}>
                    Blogs
                  </Link>
                </>
              )}
              <ThemeSwitcher />
              <UserMenu session={session} />
            </div>
          </div>
          <div className="block sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <MenuIcon className="cursor-pointer" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Quick access</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-2">
                    <UserIcon />
                    <Link href="/account">My Account</Link>
                  </div>
                  <Separator />
                  {session ? (
                    <>
                      <div className="flex items-center gap-2">
                        <UsersIcon />
                        <Link href="/users" prefetch={false}>
                          Users
                        </Link>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <BookIcon />
                        <Link href="/blogs" prefetch={false}>
                          Blogs
                        </Link>
                      </div>
                      <Separator />

                      <div className="flex items-center gap-2">
                        <LogOutIcon />
                        <Link href="api/auth/signout">Sign out</Link>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogInIcon />
                      <Link href="api/auth/signin">Sign In</Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
