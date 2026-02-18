"use client"

interface NoteContentProps {
  content: string
}

export function NoteContent({ content }: NoteContentProps) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      elements.push(
        <div key={key++} className="my-4 overflow-x-auto rounded-lg border border-border bg-muted">
          {lang && (
            <div className="border-b border-border px-4 py-2 text-xs font-medium text-muted-foreground">
              {lang}
            </div>
          )}
          <pre className="p-4 text-sm leading-relaxed">
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      )
      continue
    }

    // Tables
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i])
        i++
      }
      if (tableLines.length >= 2) {
        const headerCells = tableLines[0].split("|").filter((c) => c.trim())
        const bodyRows = tableLines.slice(2) // skip header + separator
        elements.push(
          <div key={key++} className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {headerCells.map((cell, ci) => (
                    <th key={ci} className="px-4 py-2.5 text-left font-medium">
                      {cell.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => {
                  const cells = row.split("|").filter((c) => c.trim())
                  return (
                    <tr key={ri} className="border-b border-border last:border-0">
                      {cells.map((cell, ci) => (
                        <td key={ci} className="px-4 py-2.5">
                          {cell.trim()}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
        continue
      }
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="mb-2 mt-6 text-lg font-semibold font-[family-name:var(--font-space-grotesk)]">
          {line.slice(4)}
        </h3>
      )
      i++
      continue
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="mb-3 mt-8 text-xl font-bold font-[family-name:var(--font-space-grotesk)]">
          {line.slice(3)}
        </h2>
      )
      i++
      continue
    }
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="mb-4 mt-6 text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
          {line.slice(2)}
        </h1>
      )
      i++
      continue
    }

    // List items
    if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={key++} className="my-3 flex flex-col gap-1.5 pl-5 list-disc text-sm leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx}>{renderInlineFormatting(item)}</li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""))
        i++
      }
      elements.push(
        <ol key={key++} className="my-3 flex flex-col gap-1.5 pl-5 list-decimal text-sm leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx}>{renderInlineFormatting(item)}</li>
          ))}
        </ol>
      )
      continue
    }

    // Empty lines
    if (line.trim() === "") {
      i++
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="my-2 text-sm leading-relaxed">
        {renderInlineFormatting(line)}
      </p>
    )
    i++
  }

  return <div className="prose-custom">{elements}</div>
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}
