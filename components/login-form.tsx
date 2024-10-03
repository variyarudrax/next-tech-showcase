"use client"

import { signIn } from "next-auth/react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

const LoginForm = () => {
  const [loading, setLoading] = useState<string | null>(null)
  const handleSocialSignIn = async (provider: string) => {
    setLoading(provider)
    try {
      await signIn(provider, { callbackUrl: "https://next-tech-showcase-iota.vercel.app" })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(null)
    }
  }
  return (
    <div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to login to your account
          </p>
        </div>
        <Button
          variant="outline"
          type="button"
          disabled={loading !== null}
          onClick={() => handleSocialSignIn("google")}
        >
          {loading === "google" ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={loading !== null}
          onClick={() => handleSocialSignIn("github")}
        >
          {loading === "github" ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
      </div>
    </div>
  )
}

export default LoginForm
