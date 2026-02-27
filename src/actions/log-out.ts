"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"

import { auth } from "../lib/auth"
import { ActionState } from "../types/action"

export const logOut = async (): Promise<ActionState<null> | never> => {
  try {
    await auth.api.signOut({
      headers: await headers(),
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
