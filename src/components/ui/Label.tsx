import * as React from "react"
import { cn } from "@/lib/utils"
const base =
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"

export type LabelProps = React.ComponentPropsWithoutRef<"label">

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn(base, className)} {...props} />
  )
)

Label.displayName = "Label"
