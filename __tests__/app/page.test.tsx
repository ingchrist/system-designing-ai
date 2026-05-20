import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Home from "@/app/page"

describe("Home page", () => {
  it("renders without crashing", () => {
    expect(() => render(<Home />)).not.toThrow()
  })

  it("renders the 'ghost AI' text", () => {
    render(<Home />)
    expect(screen.getByText("ghost AI")).toBeInTheDocument()
  })

  it("renders a full-height screen container", () => {
    const { container } = render(<Home />)
    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv.className).toContain("h-screen")
  })

  it("centers content both horizontally and vertically", () => {
    const { container } = render(<Home />)
    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv.className).toContain("items-center")
    expect(outerDiv.className).toContain("justify-center")
  })

  it("displays exactly one element with 'ghost AI' text", () => {
    render(<Home />)
    const elements = screen.getAllByText("ghost AI")
    expect(elements).toHaveLength(1)
  })

  it("does not render old Next.js default landing page content", () => {
    render(<Home />)
    // The old page had "To get started, edit the page.tsx file."
    expect(
      screen.queryByText(/To get started/)
    ).not.toBeInTheDocument()
    // Also should not have Deploy Now link
    expect(screen.queryByText("Deploy Now")).not.toBeInTheDocument()
  })

  it("does not render any navigation links", () => {
    render(<Home />)
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })

  it("renders a flex container", () => {
    const { container } = render(<Home />)
    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv.className).toContain("flex")
  })

  it("renders the inner div containing the text", () => {
    const { container } = render(<Home />)
    // Should have an outer div and an inner div
    const innerDiv = container.querySelector("div > div")
    expect(innerDiv).toBeInTheDocument()
    expect(innerDiv?.textContent).toBe("ghost AI")
  })
})