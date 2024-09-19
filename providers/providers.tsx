"use client"

import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Session } from "@/lib/types"

interface ProvidersProps {
  children: ReactNode
  session: Session | null
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default Providers
