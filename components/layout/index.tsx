import React, { ReactNode } from "react"
import Header from "./navbar"
import SiteFooter from "./footer"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <main className="container flex-1 items-center">{children}</main>
      <SiteFooter />
    </div>
  )
}

export default Layout
