"use server"

import React from "react"
import { redirect } from "next/navigation"

import LoginForm from "@/components/login-form"
import { auth } from "@/providers/auth"

const LoginPage = async () => {
  const session = await auth()
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
