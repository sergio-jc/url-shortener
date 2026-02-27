import { Star } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { ThemeModeToggle } from "@/src/components/theme-mode-toggle"

export default function MainFooter() {
  return (
    <footer className="flex w-full flex-col">
      <hr />
      <div className="flex w-full items-center justify-between py-3">
        <p>
          ✨ Build by
          <a className="pl-1 font-bold underline" href="https://github.com/sergio-jc">
            sergio-jc
          </a>
        </p>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <a
              href="https://github.com/sergio-jc/url-shortener"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Star />
              Give a star
            </a>
          </Button>
          <ThemeModeToggle />
        </div>
      </div>
    </footer>
  )
}
