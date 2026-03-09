import {
  Link2,
  Shield,
  Zap,
  BarChart3,
  FolderOpen,
  Infinity,
  UserPlus,
  Clock,
  Lock,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"

const freeFeatures = [
  {
    icon: Link2,
    text: "Shorten URLs instantly, no registration needed",
  },
  {
    icon: Shield,
    text: "Secure and reliable links",
  },
  {
    icon: Zap,
    text: "Simple and fast, 100% free",
  },
  {
    icon: Clock,
    text: "Temporary URLs with expiration dates",
  },
]

const registeredFeatures = [
  {
    icon: FolderOpen,
    text: "Full history of your links",
  },
  {
    icon: BarChart3,
    text: "Click statistics per URL",
  },
  {
    icon: Infinity,
    text: "No limit on saved URLs",
  },
  {
    icon: Lock,
    text: "Permanent URLs with custom slugs",
  },
]

export default function ProductFeaturesCta() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-muted-foreground mt-1 text-sm">
          Free forever. With or without an account.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-muted/60 bg-muted/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <span className="bg-muted rounded-full px-2 py-0.5 text-xs">No account</span>
              What you already have
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {freeFeatures.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm">
                <Icon aria-hidden className="text-muted-foreground size-4 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                With account
              </span>
              Much more
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {registeredFeatures.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm">
                <Icon aria-hidden className="text-primary/80 size-4 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-muted-foreground text-sm">
          Create a free account and unlock all features.
        </p>
        <Button asChild className="gap-2">
          <Link href="/sign-up">
            <UserPlus aria-hidden className="size-4" />
            Create account
          </Link>
        </Button>
      </div>
    </div>
  )
}
