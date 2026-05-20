import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

describe("Card", () => {
  it("renders as a div with data-slot='card'", () => {
    render(<Card data-testid="card" />)
    const card = screen.getByTestId("card")
    expect(card).toBeInTheDocument()
    expect(card.tagName).toBe("DIV")
    expect(card).toHaveAttribute("data-slot", "card")
  })

  it("renders children correctly", () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText("Card content")).toBeInTheDocument()
  })

  it("applies base classes including border and shadow", () => {
    render(<Card data-testid="card" />)
    const card = screen.getByTestId("card")
    expect(card.className).toContain("rounded-xl")
    expect(card.className).toContain("border")
  })

  it("merges additional className with base classes", () => {
    render(<Card className="custom-card" data-testid="card" />)
    const card = screen.getByTestId("card")
    expect(card.className).toContain("custom-card")
    expect(card.className).toContain("rounded-xl")
  })

  it("forwards additional HTML attributes", () => {
    render(<Card aria-label="Project card" data-testid="card" />)
    expect(screen.getByTestId("card")).toHaveAttribute(
      "aria-label",
      "Project card"
    )
  })
})

describe("CardHeader", () => {
  it("renders as a div with data-slot='card-header'", () => {
    render(<CardHeader data-testid="header" />)
    const header = screen.getByTestId("header")
    expect(header).toHaveAttribute("data-slot", "card-header")
    expect(header.tagName).toBe("DIV")
  })

  it("renders children", () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText("Header content")).toBeInTheDocument()
  })

  it("applies additional className", () => {
    render(<CardHeader className="extra" data-testid="header" />)
    expect(screen.getByTestId("header").className).toContain("extra")
  })
})

describe("CardTitle", () => {
  it("renders as a div with data-slot='card-title'", () => {
    render(<CardTitle data-testid="title">My Project</CardTitle>)
    const title = screen.getByTestId("title")
    expect(title).toHaveAttribute("data-slot", "card-title")
    expect(title.tagName).toBe("DIV")
  })

  it("renders the title text", () => {
    render(<CardTitle>Architecture Diagram</CardTitle>)
    expect(screen.getByText("Architecture Diagram")).toBeInTheDocument()
  })

  it("applies semibold font class", () => {
    render(<CardTitle data-testid="title">Title</CardTitle>)
    expect(screen.getByTestId("title").className).toContain("font-semibold")
  })
})

describe("CardDescription", () => {
  it("renders as a div with data-slot='card-description'", () => {
    render(<CardDescription data-testid="desc">Some description</CardDescription>)
    const desc = screen.getByTestId("desc")
    expect(desc).toHaveAttribute("data-slot", "card-description")
  })

  it("renders description text", () => {
    render(<CardDescription>A brief description</CardDescription>)
    expect(screen.getByText("A brief description")).toBeInTheDocument()
  })

  it("applies muted foreground text class", () => {
    render(<CardDescription data-testid="desc">Desc</CardDescription>)
    expect(screen.getByTestId("desc").className).toContain(
      "text-muted-foreground"
    )
  })
})

describe("CardAction", () => {
  it("renders as a div with data-slot='card-action'", () => {
    render(<CardAction data-testid="action">Action</CardAction>)
    const action = screen.getByTestId("action")
    expect(action).toHaveAttribute("data-slot", "card-action")
  })

  it("renders children", () => {
    render(<CardAction>Edit</CardAction>)
    expect(screen.getByText("Edit")).toBeInTheDocument()
  })
})

describe("CardContent", () => {
  it("renders as a div with data-slot='card-content'", () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    const content = screen.getByTestId("content")
    expect(content).toHaveAttribute("data-slot", "card-content")
    expect(content.tagName).toBe("DIV")
  })

  it("renders children", () => {
    render(<CardContent>Main content here</CardContent>)
    expect(screen.getByText("Main content here")).toBeInTheDocument()
  })

  it("applies padding classes", () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    expect(screen.getByTestId("content").className).toContain("px-6")
  })
})

describe("CardFooter", () => {
  it("renders as a div with data-slot='card-footer'", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    const footer = screen.getByTestId("footer")
    expect(footer).toHaveAttribute("data-slot", "card-footer")
  })

  it("renders children", () => {
    render(
      <CardFooter>
        <button>Cancel</button>
        <button>Save</button>
      </CardFooter>
    )
    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("Save")).toBeInTheDocument()
  })

  it("applies flex layout", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    expect(screen.getByTestId("footer").className).toContain("flex")
  })
})

describe("Card composite", () => {
  it("renders a full card with all sub-components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Project Alpha</CardTitle>
          <CardDescription>An architecture project</CardDescription>
          <CardAction>
            <button>Edit</button>
          </CardAction>
        </CardHeader>
        <CardContent>Canvas content goes here</CardContent>
        <CardFooter>
          <button>Delete</button>
        </CardFooter>
      </Card>
    )
    expect(screen.getByText("Project Alpha")).toBeInTheDocument()
    expect(screen.getByText("An architecture project")).toBeInTheDocument()
    expect(screen.getByText("Canvas content goes here")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument()
  })
})