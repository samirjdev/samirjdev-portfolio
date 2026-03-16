"use client"

import { TerminalLayout } from "./components/terminal-layout"
import { TerminalPrompt } from "./components/terminal-prompt"
import { useState, useEffect, useRef } from "react"
import React from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type CommandEntry = {
  id: string
  command: string
  output?: React.ReactNode | null
  isTyping?: boolean
  isLoading?: boolean
}

export default function Home() {
  const [history, setHistory] = useState<CommandEntry[]>([])
  const [isInteractive, setIsInteractive] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [history, isInteractive])

  const handleCommandSubmit = async (cmd: string) => {
    if (cmd.toLowerCase() === 'clear') {
      setHistory([])
      return
    }

    const commandId = Math.random().toString(36).substring(7)
    
    // Add command to history as loading
    setHistory(prev => [
      ...prev,
      {
        id: commandId,
        command: cmd,
        isTyping: false,
        isLoading: true,
        output: null
      }
    ])

    // Fetch and calculate output payload
    const outputNode = await getContentForCommandAsync(cmd)

    // Update history entry with result
    setHistory(prev => prev.map(entry => 
      entry.id === commandId ? { ...entry, isLoading: false, output: outputNode } : entry
    ))
  }

  const getContentForCommandAsync = async (cmd: string): Promise<React.ReactNode | null> => {
    const lowerCmd = cmd.toLowerCase().trim()
    
    // Check if the command matches "cat writeups/<filename>" or "cat writeups"
    const catWriteupMatch = lowerCmd.match(/^cat\s+writeups\/([^\s]+)$/)
    
    if (lowerCmd === "writeups" || lowerCmd === "ls writeups" || lowerCmd === "ls writeups/") {
      try {
        const res = await fetch('/api/writeups')
        const data = await res.json()
        if (data.files && data.files.length > 0) {
          return (
            <div className="text-white mt-2 mb-4">
              <p className="text-cyan-400 font-bold mb-2">Available Writeups:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-200">
                {data.files.map((file: string) => (
                  <li key={file}>
                    <button 
                      onClick={() => handleCommandSubmit(`cat writeups/${file}`)}
                      className="text-emerald-400 font-medium hover:text-emerald-300 hover:underline focus:outline-none transition-colors"
                    >
                      {file}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-400 mt-2">Use <code className="text-emerald-400 font-bold">cat writeups/filename.md</code> or simply click a file to read it.</p>
            </div>
          )
        }
        return <p className="text-yellow-400 mt-2 mb-4">No writeups found.</p>
      } catch (err) {
        return <p className="text-red-400 mt-2 mb-4">Error fetching writeups.</p>
      }
    }
    
    if (catWriteupMatch) {
      const filename = catWriteupMatch[1]
      try {
        const res = await fetch(`/api/writeups?file=${encodeURIComponent(filename)}`)
        
        if (res.status === 404 || res.status === 403) {
           return <p className="text-red-400 mt-2 mb-4">cat: writeups/{filename}: No such file or directory</p>
        }
        
        const data = await res.json()
        
        return (
          <div className="text-white mt-4 mb-6 bg-black/50 border border-gray-800 p-4 rounded-lg overflow-x-auto max-w-full prose prose-invert prose-green max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.content}
            </ReactMarkdown>
          </div>
        )
      } catch (err) {
        return <p className="text-red-400 mt-2 mb-4">Failed to read the writeup file.</p>
      }
    }

    switch (lowerCmd) {
      case "whoami":
        return <p className="text-white mt-2 mb-4">Samir Jihadi | Cybersecurity Student @ USF • Defensive Security • Full Stack Development • AI & Automation</p>
      case "about":
      case "cat about.txt":
        return (
          <p className="text-white mt-2 mb-4 leading-relaxed max-w-2xl">
            Hello, I&apos;m a cybersecurity professional and hobbyist software developer based in Tampa, attending the University of South Florida.
            I am passionate about the role of blue teaming, incident response, and exploring the intersection of security and
            cutting-edge tech. I enjoy participating in hackathons and security competitions, where I
            sharpen my skills in high-pressure environments. I&apos;m committed to innovating secure solutions that empower users and strengthen defenses.
          </p>
        )
      case "experience":
      case "cat experience.txt":
        return (
          <div className="text-white mt-4 mb-6 grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="border border-emerald-500/60 bg-emerald-950/40 p-4 rounded-lg hover:border-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <p className="text-emerald-400 font-extrabold text-lg">ReliaQuest Labs Program</p>
              <p className="text-sm text-emerald-100 mb-2">ReliaQuest • Feb 2026 - Present</p>
              <p className="text-sm leading-relaxed text-gray-200">Participated in a four-week hands-on cybersecurity experience with exposure to security operations, alert triage, enterprise log analysis using GreyMatter, Elastic, and Splunk.</p>
            </div>
            <div className="border border-emerald-500/60 bg-emerald-950/40 p-4 rounded-lg hover:border-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <p className="text-emerald-400 font-extrabold text-lg">CyberHerd Member</p>
              <p className="text-sm text-emerald-100 mb-2">USF • Jun 2024 - Present</p>
              <p className="text-sm leading-relaxed text-gray-200">Competed in national and international cybersecurity competitions. Developed advanced skills in incident response, pentesting, reverse engineering, and digital forensics.</p>
            </div>
          </div>
        )
      case "projects":
      case "ls projects/":
        return (
          <div className="text-white mt-4 mb-6 grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="border border-cyan-500/60 bg-cyan-950/40 p-4 rounded-lg hover:border-cyan-400 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.1)]">
              <p className="text-cyan-400 font-extrabold text-lg mb-1">AI-Powered Exploitation Model</p>
              <p className="text-sm text-gray-200 leading-relaxed">Multi-agent pipeline leveraging LLMs and RAG techniques. 2nd place at US Navy CRAM Challenge.</p>
            </div>
            <div className="border border-cyan-500/60 bg-cyan-950/40 p-4 rounded-lg hover:border-cyan-400 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.1)]">
              <p className="text-cyan-400 font-extrabold text-lg mb-1">Mindful Trends Platform</p>
              <p className="text-sm text-gray-200 leading-relaxed">Full-stack AI-driven Next.js/FastAPI platform integrating Gemini for dynamic news generation.</p>
            </div>
            <div className="border border-cyan-500/60 bg-cyan-950/40 p-4 rounded-lg hover:border-cyan-400 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.1)]">
              <p className="text-cyan-400 font-extrabold text-lg mb-1">Privacy-Focused Messenger</p>
              <p className="text-sm text-gray-200 leading-relaxed">Engineered a secure, decentralized system using Python, Django, and Argon2 password hashing.</p>
            </div>
            <div className="border border-cyan-500/60 bg-cyan-950/40 p-4 rounded-lg hover:border-cyan-400 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.1)]">
              <p className="text-cyan-400 font-extrabold text-lg mb-1">Active Directory Home Lab</p>
              <p className="text-sm text-gray-200 leading-relaxed">Virtual enterprise network with Windows Server, AD pentesting (Kerberoasting) with Kali Linux.</p>
            </div>
          </div>
        )
      case "certifications":
      case "certs":
        return (
          <div className="text-white mt-4 mb-6 grid gap-4 grid-cols-2 md:grid-cols-3">
            {[
              { name: "CompTIA Security+", date: "2023", color: "border-yellow-400/60 bg-yellow-950/50 text-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.15)]" },
              { name: "HackTheBox CDSA", date: "2025", color: "border-emerald-400/60 bg-emerald-950/50 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.15)]" },
              { name: "HackTheBox CJCA", date: "2025", color: "border-emerald-400/60 bg-emerald-950/50 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.15)]" },
              { name: "xxxxx", date: "20XX", color: "border-emerald-400/60 bg-emerald-950/50 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.15)]" },
              { name: "xxxxx", date: "20XX", color: "border-yellow-400/60 bg-yellow-950/50 text-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.15)]" },
              { name: "AWS Cloud Essentials", date: "2024", color: "border-orange-400/60 bg-orange-950/50 text-orange-300 shadow-[0_0_10px_rgba(251,146,60,0.15)]" }
            ].map((cert, i) => (
              <div key={i} className={`border ${cert.color} p-3 rounded-lg flex flex-col justify-center items-center text-center hover:brightness-125 transition-all`}>
                <p className="font-extrabold text-sm mb-1">{cert.name}</p>
                <p className="text-xs opacity-80 font-medium">Acquired {cert.date}</p>

              </div>
            ))}
          </div>
        )
      case "languages":
      case "langs":
        return (
          <div className="text-white mt-4 mb-6 flex flex-wrap gap-3">
            {[
              { name: "Python", color: "bg-blue-500/20 border-blue-500/50 text-blue-300" },
              { name: "C / C++", color: "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" },
              { name: "Go", color: "bg-cyan-500/20 border-cyan-500/50 text-cyan-300" },
              { name: "TypeScript / JS", color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" },
              { name: "SQL", color: "bg-orange-500/20 border-orange-500/50 text-orange-300" },
              { name: "Bash", color: "bg-gray-500/20 border-gray-500/50 text-gray-300" }
            ].map((lang, i) => (
              <div key={i} className={`border ${lang.color} px-3 py-1.5 rounded-md font-mono text-sm shadow-sm`}>
                {lang.name}
              </div>
            ))}
          </div>
        )
      case "contact":
      case "cat contact.txt":
        return (
          <div className="text-white mt-2 mb-4 space-y-2">
            <p className="mb-2 font-bold text-emerald-400">Find me online:</p>
            <p>GitHub: <a href="https://github.com/samirjdev" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold hover:underline hover:text-cyan-300 transition-colors">github.com/samirjdev</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/samirjihadi" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold hover:underline hover:text-cyan-300 transition-colors">linkedin.com/in/samirjihadi</a></p>
          </div>
        )
      case "resume":
        // This triggers a realistic download action instead of just text
        setTimeout(() => {
          window.open('/resume.pdf', '_blank')
        }, 500)
        return <p className="text-blue-400 mt-2 mb-4">Opening resume.pdf...</p>
      case "help":
        return (
          <div className="text-white mt-2 mb-4">
            <p className="mb-2 font-bold text-cyan-400">Available commands:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-200">
              <li><span className="text-emerald-400 font-bold">whoami</span> - Display short identity</li>
              <li><span className="text-emerald-400 font-bold">about</span> - About me</li>
              <li><span className="text-emerald-400 font-bold">experience</span> - View my professional experience</li>
              <li><span className="text-emerald-400 font-bold">projects</span> - View my recent projects</li>
              <li><span className="text-emerald-400 font-bold">certifications</span> - View my cybersecurity certifications</li>
              <li><span className="text-emerald-400 font-bold">languages</span> - View programming languages I use</li>
              <li><span className="text-emerald-400 font-bold">writeups</span> - View security writeups</li>
              <li><span className="text-emerald-400 font-bold">contact</span> - Show social links</li>
              <li><span className="text-emerald-400 font-bold">resume</span> - Download/view my PDF resume</li>
              <li><span className="text-emerald-400 font-bold">clear</span> - Clear the terminal</li>
            </ul>
          </div>
        )
      case "":
        return null
      default:
        return <p className="text-red-400 mt-2 mb-4">Command not found: {cmd}. Type &apos;help&apos; for a list of commands.</p>
    }
  }

  // Initial animation sequence
  useEffect(() => {
    let isMounted = true

    const sequence = [
      { command: 'whoami', delay: 1000 },
      { command: 'about', delay: 1500 },
    ]

    const runSequence = async () => {
      for (const step of sequence) {
        if (!isMounted) break
        await new Promise(r => setTimeout(r, step.delay))

        setHistory(prev => [...prev, {
          id: Math.random().toString(36).substring(7),
          command: step.command,
          isTyping: true,
          output: null
        }])

        // Wait for typing to complete
        await new Promise(r => setTimeout(r, step.command.length * 100 + 500))

        // Get output
        const outputNode = await getContentForCommandAsync(step.command)

        if (isMounted) {
          setHistory(prev => {
            const newHistory = [...prev]
            const lastIndex = newHistory.length - 1
            if (lastIndex >= 0) {
              newHistory[lastIndex].isTyping = false
              newHistory[lastIndex].output = outputNode
            }
            return newHistory
          })
        }
      }

      if (isMounted) {
        // Add a small pause before giving control
        await new Promise(r => setTimeout(r, 1000))
        setHistory(prev => [...prev, {
          id: Math.random().toString(36).substring(7),
          command: "Type 'help' to see available commands.",
          isTyping: false,
          output: <p className="text-gray-500 mb-4 italic">Type &apos;help&apos; to see available commands.</p>
        }])
        setIsInteractive(true)
      }
    }

    runSequence()

    return () => { isMounted = false }
  }, [])

  return (
    <TerminalLayout>
      <div className="space-y-1 font-mono text-sm sm:text-base selection:bg-blue-500/30 selection:text-blue-100">
        {history.map((entry) => (
          <div key={entry.id} className="mb-2">
            {!entry.output && entry.command === "Type 'help' to see available commands." && !entry.isLoading ? null : (
              <TerminalPrompt
                command={entry.command}
                isActive={entry.isTyping}
                onComplete={() => { }} 
              />
            )}
            
            {entry.isLoading && <p className="text-gray-500 mt-2 mb-4 text-xs animate-pulse">Running...</p>}
            
            {!entry.isTyping && !entry.isLoading && entry.output}
          </div>
        ))}

        {isInteractive && (
          <TerminalPrompt
            isInteractive={true}
            isActive={true}
            onCommandSubmit={handleCommandSubmit}
          />
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </TerminalLayout>
  )
}
