import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Textarea } from "@/components/ui/textarea"

describe("Textarea", () => {
  describe("rendering", () => {
    it("renders a textarea element", () => {
      render(<Textarea />)
      expect(screen.getByRole("textbox")).toBeInTheDocument()
    })

    it("applies data-slot='textarea' attribute", () => {
      render(<Textarea data-testid="textarea" />)
      expect(screen.getByTestId("textarea")).toHaveAttribute(
        "data-slot",
        "textarea"
      )
    })

    it("renders as a textarea tag", () => {
      render(<Textarea data-testid="ta" />)
      expect(screen.getByTestId("ta").tagName).toBe("TEXTAREA")
    })
  })

  describe("placeholder", () => {
    it("renders placeholder text", () => {
      render(<Textarea placeholder="Describe the architecture..." />)
      expect(
        screen.getByPlaceholderText("Describe the architecture...")
      ).toBeInTheDocument()
    })
  })

  describe("value and onChange", () => {
    it("accepts a value prop", () => {
      render(<Textarea value="Some content" readOnly />)
      expect(screen.getByRole("textbox")).toHaveValue("Some content")
    })

    it("calls onChange when user types", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Textarea onChange={handleChange} />)
      await user.type(screen.getByRole("textbox"), "test")
      expect(handleChange).toHaveBeenCalled()
    })

    it("updates displayed value as user types", async () => {
      const user = userEvent.setup()
      render(<Textarea defaultValue="" />)
      const textarea = screen.getByRole("textbox")
      await user.type(textarea, "Multi\nline\ncontent")
      expect(textarea).toHaveValue("Multi\nline\ncontent")
    })
  })

  describe("disabled state", () => {
    it("renders as disabled when disabled prop is set", () => {
      render(<Textarea disabled />)
      expect(screen.getByRole("textbox")).toBeDisabled()
    })
  })

  describe("className merging", () => {
    it("applies additional className while preserving base classes", () => {
      render(<Textarea className="h-40" data-testid="ta" />)
      const ta = screen.getByTestId("ta")
      expect(ta.className).toContain("h-40")
    })
  })

  describe("accessibility", () => {
    it("supports aria-label", () => {
      render(<Textarea aria-label="Project description" />)
      expect(
        screen.getByRole("textbox", { name: "Project description" })
      ).toBeInTheDocument()
    })

    it("supports aria-required", () => {
      render(<Textarea aria-required="true" />)
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-required",
        "true"
      )
    })

    it("supports aria-invalid for error states", () => {
      render(<Textarea aria-invalid="true" />)
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true"
      )
    })
  })

  describe("forwarding HTML attributes", () => {
    it("forwards name attribute", () => {
      render(<Textarea name="description" />)
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "description")
    })

    it("forwards rows attribute", () => {
      render(<Textarea rows={5} />)
      expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5")
    })

    it("forwards maxLength attribute", () => {
      render(<Textarea maxLength={500} />)
      expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "500")
    })
  })

  describe("base classes", () => {
    it("includes minimum height class for field sizing", () => {
      render(<Textarea data-testid="ta" />)
      const ta = screen.getByTestId("ta")
      expect(ta.className).toContain("min-h-16")
    })

    it("includes full width class", () => {
      render(<Textarea data-testid="ta" />)
      expect(screen.getByTestId("ta").className).toContain("w-full")
    })

    it("includes border class", () => {
      render(<Textarea data-testid="ta" />)
      expect(screen.getByTestId("ta").className).toContain("border")
    })
  })

  describe("edge cases", () => {
    it("renders without crashing when no props passed", () => {
      expect(() => render(<Textarea />)).not.toThrow()
    })

    it("handles Enter key without form submission", async () => {
      const user = userEvent.setup()
      render(<Textarea />)
      const textarea = screen.getByRole("textbox")
      await user.type(textarea, "line1{Enter}line2")
      expect(textarea).toHaveValue("line1\nline2")
    })
  })
})