"use server"

import React from "react"

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import LoginForm from "@/components/login-form"

const LoginPage = async () => {
  const session = await getServerSession(authOptions)
  if (session?.user) redirect("/")

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage
