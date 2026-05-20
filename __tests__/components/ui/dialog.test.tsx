import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

describe("Dialog", () => {
  describe("basic rendering", () => {
    it("renders the trigger without opening dialog by default", () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      expect(screen.getByText("Open")).toBeInTheDocument()
      // Dialog content should not be visible initially
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })

    it("opens dialog when trigger is clicked", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>My Dialog</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open Dialog"))
      expect(screen.getByRole("dialog")).toBeInTheDocument()
    })

    it("renders dialog title when open", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Create Project</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByText("Create Project")).toBeInTheDocument()
    })

    it("renders dialog description when open", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Enter project details below.</DialogDescription>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(
        screen.getByText("Enter project details below.")
      ).toBeInTheDocument()
    })
  })

  describe("close button", () => {
    it("shows close button by default (showCloseButton=true)", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog with Close Button</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      // The close button renders an sr-only span "Close"
      expect(screen.getByText("Close")).toBeInTheDocument()
    })

    it("hides close button when showCloseButton=false", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle>No Close Button</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.queryByText("Close")).not.toBeInTheDocument()
    })

    it("closes the dialog when close button is clicked", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByRole("dialog")).toBeInTheDocument()
      // Click the close button (sr-only labeled "Close")
      await user.click(screen.getByText("Close"))
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
  })

  describe("controlled mode", () => {
    it("renders open when defaultOpen=true", () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Already Open</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      expect(screen.getByRole("dialog")).toBeInTheDocument()
      expect(screen.getByText("Already Open")).toBeInTheDocument()
    })

    it("calls onOpenChange when dialog is opened", async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()
      render(
        <Dialog onOpenChange={handleOpenChange}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Controlled Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(handleOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe("DialogHeader", () => {
    it("renders children in the header", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Header Title</DialogTitle>
              <DialogDescription>Header Description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByText("Header Title")).toBeInTheDocument()
      expect(screen.getByText("Header Description")).toBeInTheDocument()
    })

    it("renders with data-slot='dialog-header'", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader data-testid="dialog-header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByTestId("dialog-header")).toHaveAttribute(
        "data-slot",
        "dialog-header"
      )
    })
  })

  describe("DialogFooter", () => {
    it("renders footer actions", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogFooter>
              <button>Cancel</button>
              <button>Confirm Delete</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByText("Cancel")).toBeInTheDocument()
      expect(screen.getByText("Confirm Delete")).toBeInTheDocument()
    })

    it("shows a Close button in footer when showCloseButton=true", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Dialog</DialogTitle>
            <DialogFooter showCloseButton>
              <button>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument()
    })

    it("renders with data-slot='dialog-footer'", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter data-testid="footer">
              <button>OK</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByTestId("footer")).toHaveAttribute(
        "data-slot",
        "dialog-footer"
      )
    })
  })

  describe("DialogTitle", () => {
    it("renders title text", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Rename Project</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByText("Rename Project")).toBeInTheDocument()
    })

    it("applies data-slot='dialog-title'", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle data-testid="title">Title</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByTestId("title")).toHaveAttribute(
        "data-slot",
        "dialog-title"
      )
    })
  })

  describe("DialogDescription", () => {
    it("renders description text", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Are you sure you want to delete?</DialogDescription>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(
        screen.getByText("Are you sure you want to delete?")
      ).toBeInTheDocument()
    })

    it("applies data-slot='dialog-description'", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription data-testid="desc">Description</DialogDescription>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByTestId("desc")).toHaveAttribute(
        "data-slot",
        "dialog-description"
      )
    })
  })

  describe("keyboard accessibility", () => {
    it("closes dialog on Escape key", async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Keyboard Close</DialogTitle>
          </DialogContent>
        </Dialog>
      )
      await user.click(screen.getByText("Open"))
      expect(screen.getByRole("dialog")).toBeInTheDocument()
      await user.keyboard("{Escape}")
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
  })
})