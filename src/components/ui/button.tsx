// Test edit to verify hot reloading
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#275E91] text-white hover:bg-[#1A4D80] hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow focus-visible:ring-[#5B7B9C]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive",
        outline:
          "border border-[#275E91] bg-white text-[#275E91] hover:bg-[#275E91]/5 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-[#275E91]",
        secondary:
          "bg-[#7A8D79] text-white hover:bg-[#697B68] hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow focus-visible:ring-[#7A8D79]",
        tertiary:
          "bg-[#C9D4DC] text-[#1C1C1C] hover:bg-[#C9D4DC]/80 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow focus-visible:ring-[#275E91]",
        ghost: "hover:bg-[#275E91]/5 hover:text-[#275E91] focus-visible:ring-[#275E91]",
        link: "text-[#275E91] underline-offset-4 hover:underline focus-visible:ring-[#275E91]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
        xl: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
