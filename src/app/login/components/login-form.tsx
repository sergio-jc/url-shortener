"use client"

import Link from "next/link"
import { useActionState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { Github, Google } from "@/src/components/brand-icons"
import { login, LoginFormState } from "@/src/actions/log-in"
import { signInWithGithub, signInWithGoogle } from "@/src/lib/auth-client"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const handleLogin = async (_prevState: LoginFormState | null, formData: FormData) => {
    const result = await login({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    })

    if (result.success) {
      toast.success("Logged in successfully.")
    } else {
      toast.error(result.message ?? "Failed to login.")
    }

    return result
  }

  const [state, formAction, isPending] = useActionState(handleLogin, null)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your GitHub or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <Button type="button" variant="outline" onClick={signInWithGithub}>
                  <Github />
                  Login with GitHub
                </Button>
                <Button type="button" variant="outline" onClick={signInWithGoogle}>
                  <Google />
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
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
                {!state?.success && state?.error?.type === "validation" && (
                  <FieldError>{state?.error?.issues?.password}</FieldError>
                )}
              </Field>
              <Field>
                <Button disabled={isPending} type="submit">
                  {isPending ? <Loader2 className="animate-spin" /> : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
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
