"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { FileText, FolderGit2 } from "lucide-react"

interface TerminalLayoutProps {
  children: React.ReactNode
  className?: string
  rightButtonTooltip?: string
  rightButtonHref?: string
}

export function TerminalLayout({ 
  children, 
  className,
  rightButtonTooltip = "Projects",
  rightButtonHref = "https://github.com/samirjdev"
}: TerminalLayoutProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false) // Just reopen it after a second to show it didn't break
    }, 1000)
  }

  const handleGreen = () => {
    window.open('https://www.linkedin.com/in/samirjihadi', '_blank')
  }

  const handleYellow = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
  }

  return (
    <div className={cn(
      "min-h-[100dvh] bg-black flex items-center justify-center p-2 sm:p-4 transition-opacity duration-1000",
      isClosing && "opacity-0"
    )}>
      <div className={cn(
        "w-full max-w-3xl h-[85vh] sm:h-[660px] bg-black border border-blue-500 rounded-lg p-3 sm:p-4 flex flex-col relative transition-opacity duration-700 overflow-hidden", 
        className,
        isClosing && "opacity-0"
      )}>
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <button 
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          />
          <button 
            onClick={handleYellow}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
          />
          <button 
            onClick={handleGreen}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
          />
          <div className="text-sm ml-2 text-blue-500">terminal</div>
        </div>
        <div className="flex-1 overflow-y-auto mb-12 pr-2 overflow-x-hidden break-words">
          {children}
        </div>
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10">
          <button
            onClick={() => window.open('https://www.linkedin.com/in/samirjihadi', '_blank')}
            className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors group relative"
          >
            <FileText className="w-5 h-5" />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-1.5 py-0.5 bg-black border border-green-500 text-green-500 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap max-w-[60px]">
              LinkedIn
            </span>
          </button>
        </div>
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10">
          <button
            onClick={() => window.open(rightButtonHref, '_blank')}
            className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors group relative"
          >
            <FolderGit2 className="w-5 h-5" />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-1.5 py-0.5 bg-black border border-green-500 text-green-500 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap max-w-[60px]">
              {rightButtonTooltip}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
} 