"use client"

import { useRef, useState, DragEvent } from "react"
import UploadFileIcon from "@/components/Icons/UploadFileIcon/UploadFileIcon"

interface FileDropZoneProps {
  onFileSelect: (file: File) => void
  accept?: string
}

export default function FileDropZone({ onFileSelect, accept }: FileDropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      onFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      onFileSelect(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-12 cursor-pointer transition-colors
        flex flex-col items-center justify-center gap-4
        bg-page-white/10
        ${isDragging
          ? 'border-ame-gold bg-ame-gold/10'
          : 'border-page-white/50 hover:border-ame-gold hover:bg-ame-gold/5'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />

      <UploadFileIcon className="w-16 h-16 fill-ame-gold" />

      <div className="text-center">
        <p className="text-page-white text-lg font-semibold">
          Drop your watch_history.json here
        </p>
        <p className="text-page-white/70 text-sm mt-2">
          or click to browse files
        </p>
      </div>
    </div>
  )
}
