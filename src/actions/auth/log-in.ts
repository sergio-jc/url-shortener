"use server"

import * as z from "zod"
import { redirect } from "next/navigation"

import { auth } from "@/src/lib/auth"
import { ActionState } from "@/src/types/action"

const LoginSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password field must not be empty." }).trim(),
})

export type Login = z.infer<typeof LoginSchema>

export type LoginFormState = ActionState<Login>

export const login = async (login: Login): Promise<LoginFormState> => {
  const result = LoginSchema.safeParse(login)

  if (!result.success) {
    return {
      success: false,
      message: "Invalid credentials.",
      error: {
        type: "validation",
        issues: z.flattenError(result.error).fieldErrors,
      },
    }
  }

  const { email, password } = result.data

  try {
    await auth.api.signInEmail({
      body: { email, password },
    })
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred.",
      error: {
        type: "unknown",
        error: error instanceof Error ? error : undefined,
      },
    }
  }
  redirect("/")
}
