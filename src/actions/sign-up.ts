"use server"

import * as z from "zod"
import { redirect } from "next/navigation"

import { auth } from "../lib/auth"
import { ActionState } from "../types/action"

const SignUpSchema = z.object({
  email: z.email({ message: "Invalid email address." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  username: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
})

export type SignUp = z.infer<typeof SignUpSchema>

export type SignUpFormState = ActionState<SignUp>

export const signUp = async (signUp: SignUp): Promise<SignUpFormState> => {
  console.log("🚀 ~ signUp ~ signUp:", signUp)
  const result = SignUpSchema.safeParse(signUp)

  if (!result.success) {
    return {
      success: false,
      message: "Invalid data.",
      error: {
        type: "validation",
        issues: z.flattenError(result.error).fieldErrors,
      },
    }
  }

  const { email, password, username } = result.data

  try {
    await auth.api.signUpEmail({
      body: { email, password, name: username },
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
