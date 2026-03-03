"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"

import { Input } from "@/src/components/ui/input"
import { useUpdateSearchParams } from "@/src/hooks/use-update-search-params"

const DEBOUNCE_MS = 400

interface DataTableSearchProps {
  placeholder?: string
}

export function DataTableSearch({ placeholder = "Search..." }: DataTableSearchProps) {
  const searchParams = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const [value, setValue] = useState(searchParams.get("search") ?? "")
  const isMounted = useRef(false)

  useEffect(() => {
    setValue(searchParams.get("search") ?? "")
  }, [searchParams])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true

      return
    }

    const timeout = setTimeout(() => {
      updateSearchParams({ search: value, page: null })
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeout)
    // Just fire when value changes, not when updateSearchParams changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Input
      className="max-w-sm"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
