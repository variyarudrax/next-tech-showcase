import { DEBOUNCE_VALUE } from "@/constants"
import { useState, useEffect } from "react"

export const useDebounce = (value: any, delay = DEBOUNCE_VALUE) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )
  return debouncedValue
}
