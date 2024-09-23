import Header from "@/components/layout/navbar"
import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/react"

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn()
}))

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the menu and links for authenticated users", () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: { name: "Test User", image: "/test-image.jpg" }
      },
      status: "authenticated"
    })

    render(<Header />)

    // Verifies that user-specific options are rendered
    expect(screen.getByText("Users")).toBeInTheDocument()
    expect(screen.getByText("Blogs")).toBeInTheDocument()
    expect(screen.getByAltText("Test User")).toBeInTheDocument()
    expect(screen.getByText("Toggle theme")).toBeInTheDocument()
  })
})
