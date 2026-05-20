import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button, buttonVariants } from "@/components/ui/button"

describe("Button", () => {
  describe("rendering", () => {
    it("renders a button element by default", () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole("button", { name: "Click me" })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe("BUTTON")
    })

    it("renders children correctly", () => {
      render(<Button>Save changes</Button>)
      expect(screen.getByText("Save changes")).toBeInTheDocument()
    })

    it("applies data-slot='button' attribute", () => {
      render(<Button>Test</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("data-slot", "button")
    })

    it("applies data-variant attribute matching the variant prop", () => {
      render(<Button variant="destructive">Delete</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("data-variant", "destructive")
    })

    it("applies data-size attribute matching the size prop", () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("data-size", "lg")
    })

    it("defaults to data-variant='default'", () => {
      render(<Button>Default</Button>)
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        "default"
      )
    })

    it("defaults to data-size='default'", () => {
      render(<Button>Default</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("data-size", "default")
    })
  })

  describe("variants", () => {
    const variants = [
      "default",
      "destructive",
      "outline",
      "secondary",
      "ghost",
      "link",
    ] as const

    variants.forEach((variant) => {
      it(`renders with variant='${variant}'`, () => {
        render(<Button variant={variant}>{variant}</Button>)
        const button = screen.getByRole("button")
        expect(button).toHaveAttribute("data-variant", variant)
      })
    })
  })

  describe("sizes", () => {
    const sizes = [
      "default",
      "xs",
      "sm",
      "lg",
      "icon",
      "icon-xs",
      "icon-sm",
      "icon-lg",
    ] as const

    sizes.forEach((size) => {
      it(`renders with size='${size}'`, () => {
        render(<Button size={size}>{size}</Button>)
        const button = screen.getByRole("button")
        expect(button).toHaveAttribute("data-size", size)
      })
    })
  })

  describe("className merging", () => {
    it("applies additional className while preserving base classes", () => {
      render(<Button className="custom-class">Test</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("custom-class")
    })

    it("merges className with variant classes via cn()", () => {
      render(<Button variant="outline" className="extra-class">Test</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("extra-class")
    })
  })

  describe("asChild prop", () => {
    it("renders as a child element when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )
      const link = screen.getByRole("link", { name: "Link Button" })
      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe("A")
      expect(link).toHaveAttribute("href", "/test")
    })

    it("renders as button element when asChild is false (default)", () => {
      render(<Button asChild={false}>Button</Button>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })
  })

  describe("disabled state", () => {
    it("renders a disabled button when disabled prop is passed", () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("does not fire onClick when disabled", async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      )
      await user.click(screen.getByRole("button"))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe("event handling", () => {
    it("calls onClick handler when clicked", async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click</Button>)
      await user.click(screen.getByRole("button"))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("supports type attribute (submit, button, reset)", () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit")
    })
  })

  describe("forwarding HTML attributes", () => {
    it("forwards aria-label", () => {
      render(<Button aria-label="Close dialog">X</Button>)
      expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument()
    })

    it("forwards data attributes", () => {
      render(<Button data-testid="my-button">Test</Button>)
      expect(screen.getByTestId("my-button")).toBeInTheDocument()
    })
  })
})

describe("buttonVariants", () => {
  it("returns a string of class names", () => {
    const result = buttonVariants({ variant: "default", size: "default" })
    expect(typeof result).toBe("string")
    expect(result.length).toBeGreaterThan(0)
  })

  it("generates different classes for different variants", () => {
    const defaultClasses = buttonVariants({ variant: "default" })
    const destructiveClasses = buttonVariants({ variant: "destructive" })
    expect(defaultClasses).not.toBe(destructiveClasses)
  })

  it("generates different classes for different sizes", () => {
    const defaultSize = buttonVariants({ size: "default" })
    const lgSize = buttonVariants({ size: "lg" })
    expect(defaultSize).not.toBe(lgSize)
  })

  it("uses default variant when no options provided", () => {
    const result = buttonVariants()
    const defaultResult = buttonVariants({ variant: "default", size: "default" })
    expect(result).toBe(defaultResult)
  })
})