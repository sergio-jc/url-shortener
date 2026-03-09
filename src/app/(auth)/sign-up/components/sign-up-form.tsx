"use client"

import Link from "next/link"
import { useActionState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/src/components/ui/field"
import { cn } from "@/src/lib/utils"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Github, Google } from "@/src/components/brand-icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { signUp, SignUpFormState } from "@/src/actions/auth/sign-up"
import { signInWithGithub, signInWithGoogle } from "@/src/lib/auth-client"

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
  const handleSignUp = async (_prevState: SignUpFormState | null, formData: FormData) => {
    const result = await signUp({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
    })

    if (!result?.success) {
      toast.error(result?.message ?? "Failed to create account.")
    }

    return result
  }

  const [state, formAction, isPending] = useActionState(handleSignUp, null)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Fill in the form below to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="userName">Full Name</FieldLabel>
                <Input required id="userName" name="username" placeholder="John Doe" type="text" />
                {!state?.success && state?.error?.type === "validation" && (
                  <FieldError>{state?.error?.issues?.username}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input required id="email" name="email" placeholder="m@example.com" type="email" />
                {!state?.success && state?.error?.type === "validation" && (
                  <FieldError>{state?.error?.issues?.email}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input required id="password" name="password" type="password" />
                {!state?.success && state?.error?.type === "validation" ? (
                  <FieldError>{state?.error?.issues?.password}</FieldError>
                ) : (
                  <FieldDescription>
                    Must be at least 8 characters long, contain at least one letter, one number, and
                    one special character.
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button disabled={isPending} type="submit">
                  {isPending ? <Loader2 className="animate-spin" /> : "Create account"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or register with
              </FieldSeparator>
              <Field>
                <Button type="button" variant="outline" onClick={signInWithGithub}>
                  <Github />
                  Register with GitHub
                </Button>
                <Button type="button" variant="outline" onClick={signInWithGoogle}>
                  <Google />
                  Register with Google
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  )
}
