import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
} from "@/components/ui/tabs"

describe("Tabs", () => {
  function renderTabs(defaultValue = "tab1") {
    return render(
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content for Tab 1</TabsContent>
        <TabsContent value="tab2">Content for Tab 2</TabsContent>
      </Tabs>
    )
  }

  describe("Tabs root", () => {
    it("renders with data-slot='tabs'", () => {
      render(
        <Tabs defaultValue="tab1" data-testid="tabs">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )
      expect(screen.getByTestId("tabs")).toHaveAttribute("data-slot", "tabs")
    })

    it("defaults to horizontal orientation", () => {
      render(
        <Tabs defaultValue="tab1" data-testid="tabs">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )
      expect(screen.getByTestId("tabs")).toHaveAttribute(
        "data-orientation",
        "horizontal"
      )
    })

    it("applies vertical orientation when specified", () => {
      render(
        <Tabs defaultValue="tab1" orientation="vertical" data-testid="tabs">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )
      expect(screen.getByTestId("tabs")).toHaveAttribute(
        "data-orientation",
        "vertical"
      )
    })

    it("applies additional className", () => {
      render(
        <Tabs defaultValue="tab1" className="custom-tabs" data-testid="tabs">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )
      expect(screen.getByTestId("tabs").className).toContain("custom-tabs")
    })
  })

  describe("TabsList", () => {
    it("renders with data-slot='tabs-list'", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList data-testid="list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )
      expect(screen.getByTestId("list")).toHaveAttribute(
        "data-slot",
        "tabs-list"
      )
    })

    it("applies default variant styling", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList data-testid="list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )
      expect(screen.getByTestId("list")).toHaveAttribute("data-variant", "default")
    })

    it("applies line variant", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList variant="line" data-testid="list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )
      expect(screen.getByTestId("list")).toHaveAttribute("data-variant", "line")
    })
  })

  describe("TabsTrigger", () => {
    it("renders with data-slot='tabs-trigger'", () => {
      renderTabs()
      const triggers = screen.getAllByRole("tab")
      triggers.forEach((trigger) => {
        expect(trigger).toHaveAttribute("data-slot", "tabs-trigger")
      })
    })

    it("shows both tab triggers", () => {
      renderTabs()
      expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument()
      expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument()
    })

    it("first tab is active by default (defaultValue='tab1')", () => {
      renderTabs()
      const tab1 = screen.getByRole("tab", { name: "Tab 1" })
      expect(tab1).toHaveAttribute("data-state", "active")
    })

    it("switches active tab when another tab is clicked", async () => {
      const user = userEvent.setup()
      renderTabs()
      const tab2 = screen.getByRole("tab", { name: "Tab 2" })
      await user.click(tab2)
      expect(tab2).toHaveAttribute("data-state", "active")
      expect(
        screen.getByRole("tab", { name: "Tab 1" })
      ).toHaveAttribute("data-state", "inactive")
    })

    it("renders disabled tabs when disabled prop is set", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              Tab 2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )
      expect(screen.getByRole("tab", { name: "Tab 2" })).toBeDisabled()
    })
  })

  describe("TabsContent", () => {
    it("shows content for the active tab", () => {
      renderTabs("tab1")
      expect(screen.getByText("Content for Tab 1")).toBeInTheDocument()
    })

    it("does not render content for inactive tabs in the DOM", () => {
      renderTabs("tab1")
      // Radix UI TabsContent removes inactive tabs from the DOM
      expect(screen.queryByText("Content for Tab 2")).not.toBeInTheDocument()
    })

    it("shows tab2 content when tab2 is active", () => {
      renderTabs("tab2")
      expect(screen.getByText("Content for Tab 2")).toBeInTheDocument()
    })

    it("switches content when a different tab is clicked", async () => {
      const user = userEvent.setup()
      renderTabs("tab1")
      await user.click(screen.getByRole("tab", { name: "Tab 2" }))
      expect(screen.getByText("Content for Tab 2")).toBeVisible()
    })

    it("renders with data-slot='tabs-content'", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-testid="content">
            Content
          </TabsContent>
        </Tabs>
      )
      expect(screen.getByTestId("content")).toHaveAttribute(
        "data-slot",
        "tabs-content"
      )
    })
  })

  describe("controlled mode", () => {
    it("supports controlled value via onValueChange", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(
        <Tabs value="tab1" onValueChange={onValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )
      await user.click(screen.getByRole("tab", { name: "Tab 2" }))
      expect(onValueChange).toHaveBeenCalledWith("tab2")
    })
  })

  describe("real-world usage: My Projects / Shared tabs", () => {
    it("renders My Projects and Shared tabs like the sidebar", async () => {
      const user = userEvent.setup()
      render(
        <Tabs defaultValue="my-projects">
          <TabsList>
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
          <TabsContent value="my-projects">
            No projects yet
          </TabsContent>
          <TabsContent value="shared">
            No shared projects
          </TabsContent>
        </Tabs>
      )
      expect(screen.getByText("No projects yet")).toBeInTheDocument()
      await user.click(screen.getByRole("tab", { name: "Shared" }))
      expect(screen.getByText("No shared projects")).toBeVisible()
    })
  })
})

describe("tabsListVariants", () => {
  it("returns a string of class names for default variant", () => {
    const result = tabsListVariants({ variant: "default" })
    expect(typeof result).toBe("string")
    expect(result).toContain("bg-muted")
  })

  it("returns a string of class names for line variant", () => {
    const result = tabsListVariants({ variant: "line" })
    expect(result).toContain("bg-transparent")
    expect(result).not.toContain("bg-muted")
  })

  it("uses default variant when no options provided", () => {
    const result = tabsListVariants()
    expect(result).toContain("bg-muted")
  })

  it("generates different classes for different variants", () => {
    const defaultResult = tabsListVariants({ variant: "default" })
    const lineResult = tabsListVariants({ variant: "line" })
    expect(defaultResult).not.toBe(lineResult)
  })
})