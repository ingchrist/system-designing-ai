import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "@/components/ui/input"

describe("Input", () => {
  describe("rendering", () => {
    it("renders an input element", () => {
      render(<Input />)
      expect(screen.getByRole("textbox")).toBeInTheDocument()
    })

    it("applies data-slot='input' attribute", () => {
      render(<Input data-testid="input" />)
      expect(screen.getByTestId("input")).toHaveAttribute("data-slot", "input")
    })

    it("renders with type attribute when explicitly provided", () => {
      render(<Input type="text" />)
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
    })

    it("renders with a specified type", () => {
      render(<Input type="email" />)
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email")
    })

    it("renders with type='password' (not accessible by role textbox)", () => {
      render(<Input type="password" data-testid="password" />)
      expect(screen.getByTestId("password")).toHaveAttribute("type", "password")
    })
  })

  describe("placeholder", () => {
    it("renders placeholder text", () => {
      render(<Input placeholder="Enter project name" />)
      expect(
        screen.getByPlaceholderText("Enter project name")
      ).toBeInTheDocument()
    })
  })

  describe("value and onChange", () => {
    it("accepts a value prop", () => {
      render(<Input value="My Project" readOnly />)
      expect(screen.getByRole("textbox")).toHaveValue("My Project")
    })

    it("calls onChange when user types", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)
      await user.type(screen.getByRole("textbox"), "hello")
      expect(handleChange).toHaveBeenCalled()
    })

    it("updates displayed value as user types", async () => {
      const user = userEvent.setup()
      render(<Input defaultValue="" />)
      const input = screen.getByRole("textbox")
      await user.type(input, "test input")
      expect(input).toHaveValue("test input")
    })
  })

  describe("disabled state", () => {
    it("renders as disabled when disabled prop is set", () => {
      render(<Input disabled />)
      expect(screen.getByRole("textbox")).toBeDisabled()
    })

    it("does not accept input when disabled", async () => {
      const user = userEvent.setup()
      render(<Input disabled />)
      const input = screen.getByRole("textbox")
      await user.type(input, "blocked")
      expect(input).toHaveValue("")
    })
  })

  describe("className merging", () => {
    it("applies additional className while preserving base classes", () => {
      render(<Input className="custom-input" data-testid="input" />)
      const input = screen.getByTestId("input")
      expect(input.className).toContain("custom-input")
    })
  })

  describe("accessibility", () => {
    it("supports aria-label", () => {
      render(<Input aria-label="Search projects" />)
      expect(
        screen.getByRole("textbox", { name: "Search projects" })
      ).toBeInTheDocument()
    })

    it("supports aria-required", () => {
      render(<Input aria-required="true" />)
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-required",
        "true"
      )
    })

    it("supports aria-invalid", () => {
      render(<Input aria-invalid="true" />)
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true"
      )
    })
  })

  describe("forwarding HTML attributes", () => {
    it("forwards name attribute", () => {
      render(<Input name="projectName" />)
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "projectName")
    })

    it("forwards maxLength attribute", () => {
      render(<Input maxLength={50} />)
      expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "50")
    })

    it("forwards autoComplete attribute", () => {
      render(<Input autoComplete="off" />)
      expect(screen.getByRole("textbox")).toHaveAttribute("autoComplete", "off")
    })

    it("forwards data-testid through data attributes", () => {
      render(<Input data-testid="project-name-input" />)
      expect(screen.getByTestId("project-name-input")).toBeInTheDocument()
    })
  })

  describe("edge cases", () => {
    it("renders without crashing when all required props are omitted", () => {
      expect(() => render(<Input />)).not.toThrow()
    })

    it("handles rapid user input without errors", async () => {
      const user = userEvent.setup()
      render(<Input />)
      const input = screen.getByRole("textbox")
      await user.type(input, "A very long project name that goes on and on")
      expect(input).toHaveValue("A very long project name that goes on and on")
    })

    it("clears input value when cleared programmatically", async () => {
      const user = userEvent.setup()
      render(<Input defaultValue="initial" />)
      const input = screen.getByRole("textbox")
      await user.clear(input)
      expect(input).toHaveValue("")
    })
  })
})