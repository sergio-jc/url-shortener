import { LoginForm } from "./components/login-form"

export default function LoginPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="flex max-w-sm min-w-xs flex-col gap-6 sm:min-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
