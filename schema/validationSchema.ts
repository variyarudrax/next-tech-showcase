import { z } from "zod"

export const userSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  })
})
