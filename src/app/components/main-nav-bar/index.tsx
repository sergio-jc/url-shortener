import Link from "next/link"

import { NavBarOptions } from "./nav-bar-options"

export default async function MainNavbar() {
  return (
    <nav className="flex w-full items-center justify-between py-3">
      <Link href="/">
        <h1 className="text-xl font-bold -tracking-wider">URL Shortener</h1>
      </Link>
      <NavBarOptions />
    </nav>
  )
}
