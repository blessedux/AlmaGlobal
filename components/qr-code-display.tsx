"use client"

import { useEffect, useRef } from "react"

interface PassportData {
  passportId: string
  patientId: string
  accessLevel: string
  expires: string | null
  url: string
}

interface QRCodeDisplayProps {
  data: PassportData
  size?: number
}

export function QRCodeDisplay({ data, size = 256 }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Generate a simple QR code pattern (mock implementation)
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Generate a mock QR code pattern
    const moduleSize = size / 25
    ctx.fillStyle = "#000000"

    // Create a simple pattern based on the passport ID
    const pattern = data.passportId
      .split("")
      .map((char) => char.charCodeAt(0))
      .join("")

    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const index = i * 25 + j
        const shouldFill = Number.parseInt(pattern[index % pattern.length]) % 2 === 0

        if (shouldFill) {
          ctx.fillRect(j * moduleSize, i * moduleSize, moduleSize, moduleSize)
        }
      }
    }

    // Add corner squares (typical QR code markers)
    const cornerSize = moduleSize * 7
    const positions = [
      [0, 0],
      [size - cornerSize, 0],
      [0, size - cornerSize],
    ]

    positions.forEach(([x, y]) => {
      // Outer square
      ctx.fillStyle = "#000000"
      ctx.fillRect(x, y, cornerSize, cornerSize)
      // Inner white square
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(x + moduleSize, y + moduleSize, cornerSize - 2 * moduleSize, cornerSize - 2 * moduleSize)
      // Inner black square
      ctx.fillStyle = "#000000"
      ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, cornerSize - 4 * moduleSize, cornerSize - 4 * moduleSize)
    })
  }, [data, size])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <canvas ref={canvasRef} className="block" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">Medical Passport QR Code</p>
        <p className="text-xs text-muted-foreground">Scan to access health summary</p>
      </div>
    </div>
  )
}
