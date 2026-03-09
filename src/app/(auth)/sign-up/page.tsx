import { SignUpForm } from "./components/sign-up-form"

export default function LoginPage() {
  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-sm min-w-xs flex-col gap-6 sm:min-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}
