import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

describe("ScrollArea", () => {
  describe("rendering", () => {
    it("renders with data-slot='scroll-area'", () => {
      render(
        <ScrollArea data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      )
      expect(screen.getByTestId("scroll-area")).toHaveAttribute(
        "data-slot",
        "scroll-area"
      )
    })

    it("renders children content", () => {
      render(
        <ScrollArea>
          <p>Scrollable content here</p>
        </ScrollArea>
      )
      expect(screen.getByText("Scrollable content here")).toBeInTheDocument()
    })

    it("renders multiple children", () => {
      render(
        <ScrollArea>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </ScrollArea>
      )
      expect(screen.getByText("Item 1")).toBeInTheDocument()
      expect(screen.getByText("Item 2")).toBeInTheDocument()
      expect(screen.getByText("Item 3")).toBeInTheDocument()
    })

    it("applies relative positioning class", () => {
      render(
        <ScrollArea data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      )
      expect(screen.getByTestId("scroll-area").className).toContain("relative")
    })

    it("applies additional className", () => {
      render(
        <ScrollArea className="h-40 w-64" data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      )
      const scrollArea = screen.getByTestId("scroll-area")
      expect(scrollArea.className).toContain("h-40")
      expect(scrollArea.className).toContain("w-64")
    })

    it("includes a viewport element for scroll content", () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
        </ScrollArea>
      )
      // Radix ScrollArea renders a viewport wrapper around the children
      const viewport = container.querySelector(
        "[data-slot='scroll-area-viewport']"
      )
      expect(viewport).toBeInTheDocument()
    })
  })

  describe("real-world usage: sidebar project list", () => {
    it("renders a list of project items in scroll area", () => {
      const projects = ["Project Alpha", "Project Beta", "Project Gamma"]
      render(
        <ScrollArea className="h-64">
          {projects.map((name) => (
            <div key={name} data-testid={`project-${name}`}>
              {name}
            </div>
          ))}
        </ScrollArea>
      )
      projects.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument()
      })
    })

    it("renders chat messages as scrollable content", () => {
      render(
        <ScrollArea className="h-64 w-80">
          <div data-testid="messages">
            <div>User: Design a microservices architecture</div>
            <div>AI: Here is the design...</div>
          </div>
        </ScrollArea>
      )
      expect(
        screen.getByText("User: Design a microservices architecture")
      ).toBeInTheDocument()
      expect(screen.getByText("AI: Here is the design...")).toBeInTheDocument()
    })
  })

  describe("edge cases", () => {
    it("renders without crashing when children is empty", () => {
      expect(() =>
        render(<ScrollArea data-testid="empty-scroll" />)
      ).not.toThrow()
    })

    it("renders without crashing with deeply nested content", () => {
      render(
        <ScrollArea>
          <div>
            <ul>
              <li>
                <span>Nested content</span>
              </li>
            </ul>
          </div>
        </ScrollArea>
      )
      expect(screen.getByText("Nested content")).toBeInTheDocument()
    })

    it("renders many items without crashing (boundary test)", () => {
      const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`)
      render(
        <ScrollArea className="h-40">
          {items.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </ScrollArea>
      )
      expect(screen.getByText("Item 1")).toBeInTheDocument()
      expect(screen.getByText("Item 50")).toBeInTheDocument()
    })
  })
})

describe("ScrollBar (used within ScrollArea)", () => {
  it("ScrollArea wraps content in a viewport with size classes", () => {
    const { container } = render(
      <ScrollArea className="h-full" data-testid="sa">
        <div>Content</div>
      </ScrollArea>
    )
    // ScrollArea applies size to its root (passed via className)
    expect(screen.getByTestId("sa").className).toContain("h-full")
  })

  it("ScrollArea viewport element has data-slot='scroll-area-viewport'", () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = container.querySelector(
      "[data-slot='scroll-area-viewport']"
    )
    expect(viewport).toBeInTheDocument()
  })

  it("ScrollArea viewport uses size-full class for full coverage", () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = container.querySelector(
      "[data-slot='scroll-area-viewport']"
    )
    expect(viewport?.className).toContain("size-full")
  })
})