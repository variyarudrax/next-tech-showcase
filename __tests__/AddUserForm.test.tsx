import React from "react"
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import UserForm from "@/components/user-form"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider, useSession } from "next-auth/react"

jest.mock("axios")
jest.mock("next-auth/react", () => ({
  SessionProvider: jest.fn(({ children }) => children),
  useSession: jest.fn()
}))
jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}))

const queryClient = new QueryClient()

describe("Register user form", () => {
  const mockRouterPush = jest.fn()

  const mockSession = {
    user: { name: "Test User", email: "test@email.com" },
    expires: "2024-12-31T00:00:00.000Z"
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush })
    ;(useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" })
    queryClient.clear()
  })

  afterEach(cleanup)

  const renderPage = () =>
    render(
      <SessionProvider session={mockSession}>
        <QueryClientProvider client={queryClient}>
          <UserForm />
        </QueryClientProvider>
      </SessionProvider>
    )

  it("test form fields render", () => {
    renderPage()

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
  })

  it("test user registration", async () => {
    const mockResponse = {
      data: {
        name: "test name",
        email: "test@email.com",
        password: "hello123"
      }
    }
    ;(axios.post as jest.Mock).mockResolvedValue(mockResponse)

    renderPage()

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test Name" }
    })
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@email.com" }
    })
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "hello123" }
    })

    fireEvent.click(screen.getByText("Register"))

    await waitFor(() =>
      expect(screen.getByText("User Registered Successfully")).toBeInTheDocument()
    )
  })
})
