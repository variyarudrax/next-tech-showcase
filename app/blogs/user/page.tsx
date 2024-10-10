import UserForm from "@/components/user-form"
import { auth } from "@/providers/auth"
import { redirect } from "next/navigation"
import React from "react"

const UserRegisterPage = async () => {
  const session = await auth()
  if (!session) redirect("/")
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Register User</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to register your user
            </p>
          </div>
          <UserForm />
        </div>
      </div>
    </div>
  )
}

export default UserRegisterPage
