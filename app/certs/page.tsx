"use client"

import { Terminal, Home, ExternalLink, FileText, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Certification = {
  title: string
  issuer: string
  issued?: string
  credentialId?: string
  verifyUrl?: string
  pdfPath?: string
}

const certifications: Certification[] = [
  {
    title: "HTB Certified Junior Cybersecurity Associate (HTB CJCA)",
    issuer: "Hack The Box",
    issued: "Apr 2026",
    credentialId: "HTBCERT-14AA99D8E0",
    verifyUrl: "https://www.hackthebox.com/certificates",
    pdfPath: "/certs/HTB Certified Junior Cybersecurity Associate_Certificate.pdf",
  },
  {
    title: "HTB Certified Defensive Security Analyst (HTB CDSA)",
    issuer: "Hack The Box",
    issued: "Oct 2025",
    credentialId: "HTBCERT-F5D20EB067",
    verifyUrl: "https://www.hackthebox.com/certificates",
    pdfPath: "/certs/HTB Certified Defensive Security Analyst_Certificate.pdf",
  },
  {
    title: "Ethical Hacking Essentials",
    issuer: "EC-Council",
    issued: "Nov 2025",
    credentialId: "ECC3048129576",
    verifyUrl: "https://aspen.eccouncil.org/Verify",
    pdfPath: "/certs/ECC-EHE-Certificate.pdf",
  },
  {
    title: "CompTIA Security+",
    issuer: "CompTIA",
    issued: "May 2022",
    credentialId: "0NTBSXSSKBFE1658",
    verifyUrl: "https://cp.certmetrics.com/comptia/en/public/verify/credential/0NTBSXSSKBFE1658",
    pdfPath: "/certs/CompTIA Security+ ce certificate.pdf",
  },
  {
    title: "AWS Knowledge: Cloud Essentials",
    issuer: "Amazon Web Services (AWS)",
    verifyUrl: "https://www.credly.com/badges/269335ec-3afa-452f-a7bb-62665cc867da/public_url",
  },
  {
    title: "NCL Spring 2023 Team Game",
    issuer: "National Cyber League",
    credentialId: "6XWEVBCNL0RF",
    verifyUrl: "https://cyberskyline.com/report/6XWEVBCNL0RF",
  },
  {
    title: "NCL Spring 2023 Individual Game",
    issuer: "National Cyber League",
    credentialId: "YHG6UW6V03NA",
    verifyUrl: "https://cyberskyline.com/report/YHG6UW6V03NA",
  },
  {
    title: "Cloud Security Admin",
    issuer: "Skillsoft",
    credentialId: "71808197",
    verifyUrl: "https://skillsoft.digitalbadges.skillsoft.com/08b706f9-8252-43d6-a082-d192c76568d2#acc.q2J3BCTj",
  },
  {
    title: "Security Threat Intelligence",
    issuer: "Skillsoft",
    credentialId: "71741535",
    verifyUrl: "https://skillsoft.digitalbadges.skillsoft.com/3e4802af-612e-423e-ad5a-0019deb3cf85#acc.mN8EbHfA",
  },
  {
    title: "OS Exploits",
    issuer: "Skillsoft",
    credentialId: "71793787",
    verifyUrl: "https://skillsoft.digitalbadges.skillsoft.com/6ad6d44a-c00f-41bf-ab6e-cc2ef7198907#acc.k2nBMzgN",
  },
  {
    title: "NCL Fall 2022 Team Game",
    issuer: "National Cyber League",
    credentialId: "U5YPDEWD6PPF",
    verifyUrl: "https://cyberskyline.com/report/U5YPDEWD6PPF",
  },
  {
    title: "NCL Fall 2022 Individual Game",
    issuer: "National Cyber League",
    credentialId: "VCVJQ7R3YTYN",
    verifyUrl: "https://cyberskyline.com/report/VCVJQ7R3YTYN",
  },
  {
    title: "Mobility and Device Fundamentals",
    issuer: "Microsoft",
    issued: "May 2020",
    credentialId: "wnF2c-48ar",
    verifyUrl: "https://www.certiport.com/portal/pages/credentialverification.aspx",
    pdfPath: "/certs/Cert7551571667.pdf",
  },
  {
    title: "Networking Fundamentals",
    issuer: "Microsoft",
    issued: "May 2021",
    credentialId: "baUB-s2oz",
    verifyUrl: "https://www.certiport.com/portal/pages/credentialverification.aspx",
    pdfPath: "/certs/Cert82015728806.pdf",
  },
  {
    title: "Security Fundamentals",
    issuer: "Microsoft",
    issued: "Apr 2021",
    verifyUrl: "https://www.certiport.com/portal/pages/credentialverification.aspx",
    pdfPath: "/certs/Cert10115731592.pdf",
  },
  {
    title: "Windows Operating System Fundamentals",
    issuer: "Microsoft",
    issued: "Oct 2019",
    credentialId: "8SvK-uGhQ",
    verifyUrl: "https://www.certiport.com/portal/pages/credentialverification.aspx",
    pdfPath: "/certs/Cert33815734849.pdf",
  },
]

export default function CertsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={cn(
      "min-h-screen bg-black text-white transition-opacity duration-1000",
      !isVisible && "opacity-0"
    )}>
      <nav className="border-b border-blue-500 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="text-blue-500" />
            <span className="text-blue-500 font-mono">samir@usf:~$</span>
            <span className="text-white font-mono ml-1 hidden sm:inline">cat certs.json</span>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-3 py-2 text-blue-500 hover:text-blue-400 border border-blue-500 rounded-lg transition-colors hover:bg-blue-500/10"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-4 py-8 pb-16">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-7 h-7 text-green-500" />
          <h1 className="text-3xl font-bold text-green-500 font-mono">Certifications</h1>
        </div>
        <p className="text-blue-500/60 text-sm font-mono mb-8 ml-10">
          // {certifications.length} credentials loaded
        </p>

        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={cn(
                "group border rounded-lg p-4 sm:p-5 transition-all duration-300 cursor-default",
                hoveredIndex === index 
                  ? "border-green-500/60 bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.05)]" 
                  : "border-blue-500/30 hover:border-blue-500/60 bg-transparent"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500/40 font-mono text-xs mt-1 shrink-0 hidden sm:block">
                      [{String(index).padStart(2, '0')}]
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-white font-semibold font-mono text-sm sm:text-base leading-tight">
                        {cert.title}
                      </h2>
                      <p className="text-blue-400/70 text-sm font-mono mt-1">
                        {cert.issuer}
                        {cert.issued && (
                          <span className="text-blue-500/40 ml-2">• {cert.issued}</span>
                        )}
                      </p>
                      {cert.credentialId && (
                        <p className="text-blue-500/30 text-xs font-mono mt-1">
                          ID: {cert.credentialId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 sm:mt-0 ml-6 sm:ml-0">
                  {cert.pdfPath && (
                    <a
                      href={cert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-green-500/40 text-green-500 rounded-md hover:bg-green-500/10 hover:border-green-500 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Cert</span>
                    </a>
                  )}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-blue-500/40 text-blue-500 rounded-md hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-blue-500/20">
          <p className="text-blue-500/30 text-xs font-mono text-center">
            ⚠ This list may not be fully up to date. For the most current credentials, check my{" "}
            <a 
              href="https://linkedin.com/in/samirjihadi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500/50 hover:text-blue-500 underline transition-colors"
            >
              LinkedIn
            </a>.
          </p>
        </div>
      </main>
    </div>
  )
}
