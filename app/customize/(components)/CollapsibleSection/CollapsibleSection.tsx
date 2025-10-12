'use client'

import { useState, ReactNode, useId } from "react"
import ChevronDownIcon from "@/components/Icons/ChevronDownIcon/ChevronDownIcon"

type CollapsibleSectionProps = {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export default function CollapsibleSection({ title, children, defaultOpen = true }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()
  const titleId = useId()

  return (
    <div
      className="
        w-full 
        border-ame-gold border-t-4 border-b-4 border-solid
      "
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex justify-between items-center w-full hover:cursor-pointer bg-page-white bg-opacity-10 p-4 hover:opacity-80 transition-opacity"
        type="button"
      >
        <h2 id={titleId} className="text-page-white text-lg md:text-xl lg:text-2xl font-bold line-clamp-1 text-left">{title}</h2>
        <div aria-hidden="true" className="w-6 h-6">
          <ChevronDownIcon
            fill="currentColor"
            className={`text-ame-gold transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
      </button>
      {isOpen && (
        <div id={contentId} role="region" aria-labelledby={titleId} className="py-4">
          {children}
        </div>
      )}
    </div>
  )
}
