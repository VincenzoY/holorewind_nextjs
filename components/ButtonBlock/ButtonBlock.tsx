import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonBlockProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function ButtonBlock({ children, className = '', ...props }: ButtonBlockProps) {
  return (
    <button
      className={`
        p-2 text-ame-gold rounded-sm transition-colors bg-[#3C3C3C] hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-wait disabled:opacity-75
        flex items-center justify-center text-xl gap-2 fill-ame-gold
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
