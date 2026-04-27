"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { FileText, FolderGit2, Shield } from "lucide-react"

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
  rightButtonHref = "/projects"
}: TerminalLayoutProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      window.location.href = '/posts'
    }, 1000)
  }

  const handleGreen = () => {
    window.location.href = '/resume.pdf'
  }

  const handleYellow = () => {
    window.location.href = 'https://www.youtube.com/watch?v=yPYZpwSpKmA'
  }

  return (
    <div className={cn(
      "min-h-screen bg-black flex items-center justify-center p-4 transition-opacity duration-1000",
      isClosing && "opacity-0"
    )}>
      <div className={cn(
        "w-full max-w-3xl h-[660px] bg-black border border-blue-500 rounded-lg p-4 flex flex-col relative transition-opacity duration-700", 
        className,
        isClosing && "opacity-0"
      )}>
        <div className="flex items-center gap-2 mb-4">
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
        <div className="flex-1 overflow-y-auto mb-12 pr-2">
          {children}
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <button
            onClick={() => window.location.href = '/resume.pdf'}
            className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors group relative"
          >
            <FileText className="w-5 h-5" />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-1.5 py-0.5 bg-black border border-green-500 text-green-500 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap max-w-[60px]">
              Resume
            </span>
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={() => window.location.href = '/certs'}
            className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors group relative"
          >
            <Shield className="w-5 h-5" />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-1.5 py-0.5 bg-black border border-green-500 text-green-500 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Certs
            </span>
          </button>
        </div>
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={() => window.location.href = rightButtonHref}
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