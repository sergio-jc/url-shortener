import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/src/components/ui/button"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col items-center justify-center">
      <Button asChild className="absolute top-4 left-4 z-10" variant="ghost">
        <Link className="flex items-center gap-2" href="/">
          <ArrowLeftIcon />
          Back
        </Link>
      </Button>
      {children}
    </div>
  )
}
