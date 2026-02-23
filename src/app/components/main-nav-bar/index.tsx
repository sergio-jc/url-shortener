// import { Button } from "@/src/components/ui/button";

import { ThemeModeToggle } from "@/src/components/theme-mode-toggle"

export default function MainNavbar() {
  return (
    <nav className="flex w-full justify-between py-5">
      <span className="text-xl font-bold -tracking-wider">URL Shortener</span>
      <div className="flex items-center gap-4">
        {/* <a href="#">Home</a>
        <a href="#">Settings</a> */}
        <ThemeModeToggle />
      </div>
      {/* <div className="flex gap-2">
        <Button>Sign In</Button>
        <Button variant="outline">Sign Up</Button>
      </div> */}
    </nav>
  )
}
