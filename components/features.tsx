import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Smartphone, CreditCard, QrCode, Upload, Shield } from "lucide-react"

const features = [
  {
    name: "Web3 Wallet Integration",
    description: "Connect with MetaMask, WalletConnect, or create a passkey for secure authentication.",
    icon: Shield,
  },
  {
    name: "Health Record Management",
    description: "Upload and organize your medical documents with client-side encryption.",
    icon: FileText,
  },
  {
    name: "Medical Passport",
    description: "Generate QR codes to easily share your health records with healthcare providers.",
    icon: QrCode,
  },
  {
    name: "Instant Claims Processing",
    description: "Submit claims with receipts and get automatic approval for amounts under $1,000.",
    icon: CreditCard,
  },
  {
    name: "Document Upload",
    description: "Drag & drop PDFs and images up to 10MB with real-time encryption status.",
    icon: Upload,
  },
  {
    name: "Mobile Optimized",
    description: "Full functionality on all devices with offline support for basic features.",
    icon: Smartphone,
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Modern healthcare coverage
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            AlmaGlobal combines the best of Web3 technology with practical healthcare needs, giving you complete control
            over your health data and insurance claims.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <Card key={feature.name} className="relative">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-base font-semibold leading-7">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-7">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
