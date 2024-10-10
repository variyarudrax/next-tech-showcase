"use client"

import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorResponse, UserFormData } from "@/lib/types"
import { Eye, EyeOff } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { userSchema } from "@/schema/validationSchema"
import { postUserFormData } from "@/services"

const UserForm = () => {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserFormData | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showRegisteredPassword, setShowRegisteredPassword] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  })

  const registerMutation = useMutation<UserFormData, Error, UserFormData>({
    mutationFn: postUserFormData,
    onSuccess: (data) => {
      setUser(data)
      setLoading(null)
    },
    onError: (err) => {
      const error = err as ErrorResponse
      setError(error.response?.data?.message || "Something went wrong")
      setLoading(null)
    }
  })

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    setLoading("credentials")
    setError(null)
    registerMutation.mutate(data)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={loading !== null || !!user}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name?.message as string}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading !== null || !!user}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email?.message as string}</p>
            )}
          </div>
          <div className="grid gap-1 relative">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={loading !== null || !!user}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading !== null || !!user}
              className="absolute z-2 bg-white right-2 top-2 text-gray-500"
              style={{ pointerEvents: "all" }}
            >
              {showPassword ? (
                <EyeOff className="dark:bg-black" />
              ) : (
                <Eye className="dark:bg-black" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password?.message as string}</p>
            )}
          </div>
          <Button className="mt-3" type="submit" disabled={loading !== null || !!user}>
            {loading === null ? "Register" : "Loading..."}
          </Button>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </form>

      {user && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl mb-4 font-semibold text-green-900">
            User Registered Successfully
          </h2>
          {(() => {
            const { name, email, password } = user
            return (
              <>
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <div className="flex items-center">
                  <strong>Password:</strong>
                  <span className="ml-2">
                    {showRegisteredPassword ? password : password.replace(/./g, "*")}
                  </span>
                  <button
                    onClick={() => setShowRegisteredPassword(!showRegisteredPassword)}
                    className="ml-2 text-blue-500"
                  >
                    {showRegisteredPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                <Button
                  onClick={() => {
                    setUser(null)
                    setShowRegisteredPassword(false)
                    reset()
                  }}
                  className="mt-6"
                >
                  Register Another User
                </Button>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}

export default UserForm
