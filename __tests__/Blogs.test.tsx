import React from "react"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DataTable } from "@/components/data-table"
import { useRouter } from "next/navigation"
import BlogsPage from "@/app/blogs/page"
import { fetchBlogs } from "@/services"
import { columns } from "@/app/blogs/columns"
import { useSession } from "next-auth/react"

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn()
}))

jest.mock("../services", () => ({
  fetchBlogs: jest.fn()
}))
jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}))

jest.mock("../components/data-table", () => ({
  DataTable: jest.fn(() => <div data-testid="data-table"></div>)
}))

const queryClient = new QueryClient()

const renderPage = () => {
  ;(useSession as jest.Mock).mockReturnValue({
    data: {
      user: { name: "Test User", image: "/test-image.jpg" }
    },
    status: "authenticated"
  })

  render(
    <QueryClientProvider client={queryClient}>
      <BlogsPage />
    </QueryClientProvider>
  )
}
describe("Posts Page Integration Tests", () => {
  const mockRouterPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush })
    queryClient.clear()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("displays skeleton loaders while data is loading", async () => {
    ;(fetchBlogs as jest.Mock).mockResolvedValueOnce([])

    renderPage()

    expect(screen.getAllByTestId("skeleton-item").length).toBe(5)

    await waitFor(() => {
      expect(screen.queryByTestId("skeleton-item")).toBeNull()
    })
  })

  it("renders data in the table after fetching posts", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1", content: "Content 1" },
      { id: 2, title: "Post 2", content: "Content 2" }
    ]

    ;(fetchBlogs as jest.Mock).mockResolvedValueOnce(mockPosts)

    renderPage()

    await waitFor(() => {
      expect(screen.queryByTestId("skeleton-item")).toBeNull()
    })

    expect(DataTable).toHaveBeenCalledWith(
      expect.objectContaining({
        columns,
        data: mockPosts
      }),
      expect.anything()
    )
  })

  it("fetches the next page of posts when the 'Next' button is clicked", async () => {
    const mockPostsPage1 = [
      { id: 1, title: "Post 1", content: "Content 1" },
      { id: 2, title: "Post 2", content: "Content 2" }
    ]

    const mockPostsPage2 = [
      { id: 3, title: "Post 3", content: "Content 3" },
      { id: 4, title: "Post 4", content: "Content 4" }
    ]

    ;(fetchBlogs as jest.Mock)
      .mockResolvedValueOnce(mockPostsPage1)
      .mockResolvedValueOnce(mockPostsPage2)

    renderPage()

    await waitFor(() => {
      expect(screen.queryByTestId("skeleton-item")).toBeNull()
    })

    fireEvent.click(screen.getByText("Next"))

    await waitFor(() => {
      expect(screen.queryByTestId("skeleton-item")).toBeNull()
    })

    expect(DataTable).toHaveBeenCalledWith(
      expect.objectContaining({
        columns,
        data: mockPostsPage2
      }),
      expect.anything()
    )
  })
})
