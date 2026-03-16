"use client"

import { cn } from "@/lib/utils"
import { TypingEffect } from "./typing-effect"
import { useState, useRef, useEffect } from "react"

interface TerminalPromptProps {
  className?: string
  command?: string
  onComplete?: () => void
  isActive?: boolean
  isInteractive?: boolean
  onCommandSubmit?: (cmd: string) => void
}

export function TerminalPrompt({ className, command, onComplete, isActive = true, isInteractive, onCommandSubmit }: TerminalPromptProps) {
  const [inputVal, setInputVal] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isInteractive && isActive) {
      inputRef.current?.focus()
    }
  }, [isInteractive, isActive])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onCommandSubmit) {
      onCommandSubmit(inputVal.trim())
      setInputVal("")
    }
  }

  // Click handler to re-focus the input if user clicks anywhere around it
  useEffect(() => {
    const handleGlobalClick = () => {
      if (isInteractive && isActive && inputRef.current) {
        inputRef.current.focus()
      }
    }
    
    document.addEventListener("click", handleGlobalClick)
    return () => document.removeEventListener("click", handleGlobalClick)
  }, [isInteractive, isActive])

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-blue-500 whitespace-nowrap">samir@usf:~$</span>
      <div className="relative flex-1 flex items-center">
        {isInteractive ? (
          <>
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent outline-none border-none text-white font-mono"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            {/* Custom blinking cursor block that follows text */}
            <span 
              className="absolute pointer-events-none w-2 h-4 bg-blue-500 animate-blink"
              style={{ left: `${inputVal.length}ch` }}
            />
          </>
        ) : command ? (
          <TypingEffect
            text={command}
            className="text-white break-all"
            onComplete={onComplete}
            showCursor={isActive}
          />
        ) : isActive && (
          <span className="w-2 h-4 bg-blue-500 animate-blink block" />
        )}
      </div>
    </div>
  )
} 