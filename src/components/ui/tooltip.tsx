import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-white px-3 py-1.5 text-sm text-gray-700 shadow-md shadow-black/5",
      "backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-200",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=top]:slide-in-from-bottom-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "select-none",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

const Tooltip = ({
  children,
  content,
  delayDuration = 200,
  className,
  ...props
}: {
  children: React.ReactNode
  content: React.ReactNode
  delayDuration?: number
  className?: string
}) => (
  <TooltipProvider delayDuration={delayDuration}>
    <TooltipPrimitive.Root>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className={className} {...props}>
        {content}
      </TooltipContent>
    </TooltipPrimitive.Root>
  </TooltipProvider>
)

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
