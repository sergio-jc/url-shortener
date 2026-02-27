"use client"

import { LogOutIcon } from "lucide-react"

import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu"
import { logOut } from "@/src/actions/log-out"

const LogOutOption = () => {
  return (
    <DropdownMenuItem onClick={logOut}>
      <LogOutIcon />
      Sign Out
    </DropdownMenuItem>
  )
}

export default LogOutOption
