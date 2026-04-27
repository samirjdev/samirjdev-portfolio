import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('file')

  const writeupsDir = path.join(process.cwd(), 'writeups')

  try {
    // List all files if no filename query is provided
    if (!filename) {
      const files = await fs.readdir(writeupsDir)
      const mdFiles = files.filter(f => f.endsWith('.md'))
      return NextResponse.json({ files: mdFiles })
    }

    // Securely resolve the file path to prevent directory traversal
    const safeFilename = path.basename(filename)
    const filePath = path.join(writeupsDir, safeFilename)

    // Check if the resolved file actually resides in the WRITEUPS directory
    if (!filePath.startsWith(writeupsDir)) {
      return NextResponse.json({ error: 'Invalid file access' }, { status: 403 })
    }

    const content = await fs.readFile(filePath, 'utf-8')

    return NextResponse.json({ content })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'File not found or unreadable' }, { status: 404 })
  }
}
