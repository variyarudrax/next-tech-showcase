"use client"

import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface ProvidersProps {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default Providers
