import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoginForm from "@/components/login-form"
import { signIn } from "next-auth/react"

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn()
}))

describe("LoginForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = () => render(<LoginForm />)

  it("renders the login form correctly", () => {
    renderComponent()

    expect(screen.getByText("Login to your account")).toBeInTheDocument()
    expect(
      screen.getByText("Enter your details below to login to your account")
    ).toBeInTheDocument()
    expect(screen.getByText("Google")).toBeInTheDocument()
    expect(screen.getByText("GitHub")).toBeInTheDocument()
  })

  it("handles Google login correctly", async () => {
    ;(signIn as jest.Mock).mockResolvedValue({})

    renderComponent()

    fireEvent.click(screen.getByText("Google"))

    // Spinner should appear while loading
    expect(screen.getByRole("button", { name: /google/i })).toHaveAttribute("disabled")

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "http://localhost:3000" })
    )

    // After loading, button should no longer be disabled
    expect(screen.getByRole("button", { name: /google/i })).not.toHaveAttribute("disabled")
  })

  it("handles GitHub login correctly", async () => {
    ;(signIn as jest.Mock).mockResolvedValue({})

    renderComponent()

    fireEvent.click(screen.getByText("GitHub"))

    // Spinner should appear while loading
    expect(screen.getByRole("button", { name: /github/i })).toHaveAttribute("disabled")

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("github", { callbackUrl: "http://localhost:3000" })
    )

    // After loading, button should no longer be disabled
    expect(screen.getByRole("button", { name: /github/i })).not.toHaveAttribute("disabled")
  })

  it("disables both buttons when loading", async () => {
    ;(signIn as jest.Mock).mockResolvedValue({})

    renderComponent()

    // Click Google button
    fireEvent.click(screen.getByText("Google"))

    // Both buttons should be disabled
    expect(screen.getByText("Google")).toBeDisabled()
    expect(screen.getByText("GitHub")).toBeDisabled()

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "http://localhost:3000" })
    )

    // After loading, buttons should be enabled
    expect(screen.getByText("Google")).not.toBeDisabled()
    expect(screen.getByText("GitHub")).not.toBeDisabled()
  })

  it("handles sign-in errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {})
    ;(signIn as jest.Mock).mockRejectedValue(new Error("Sign-in failed"))

    renderComponent()

    // Click Google button and simulate sign-in failure
    fireEvent.click(screen.getByText("Google"))

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "http://localhost:3000" })
    )

    // Check that the error is logged in the console
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Sign-in failed"))

    // Buttons should be enabled again after error
    expect(screen.getByText("Google")).not.toBeDisabled()
    expect(screen.getByText("GitHub")).not.toBeDisabled()

    consoleErrorSpy.mockRestore()
  })
})
