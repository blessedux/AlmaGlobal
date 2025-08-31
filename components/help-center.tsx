import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, Mail, Phone, FileText, CreditCard, Shield, QrCode } from "lucide-react"

const faqCategories = [
  {
    title: "Getting Started",
    icon: Shield,
    questions: [
      "How do I sign up for AlmaGlobal?",
      "What is the coverage limit?",
      "How much does it cost per month?",
      "Do I need KYC verification?",
    ],
  },
  {
    title: "Claims & Payments",
    icon: CreditCard,
    questions: [
      "How do I submit a claim?",
      "When will I receive payment?",
      "What documents do I need?",
      "What is instant processing?",
    ],
  },
  {
    title: "Health Records",
    icon: FileText,
    questions: [
      "How do I upload medical records?",
      "Are my records encrypted?",
      "How do I share records with doctors?",
      "What file types are supported?",
    ],
  },
  {
    title: "Medical Passport",
    icon: QrCode,
    questions: [
      "What is a medical passport?",
      "How do I generate a QR code?",
      "How do I control access?",
      "Can I use it offline?",
    ],
  },
]

const contactOptions = [
  {
    title: "Live Chat",
    description: "Chat with our support team",
    icon: MessageCircle,
    action: "Start Chat",
    available: "24/7",
  },
  {
    title: "Email Support",
    description: "Send us a detailed message",
    icon: Mail,
    action: "Send Email",
    available: "Response within 2 hours",
  },
  {
    title: "Phone Support",
    description: "Speak with a representative",
    icon: Phone,
    action: "Call Now",
    available: "Mon-Fri 9AM-6PM EST",
  },
]

export function HelpCenter() {
  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search for help articles..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {faqCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-primary" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.questions.map((question) => (
                  <Button key={question} variant="ghost" className="w-full justify-start text-left h-auto p-2">
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Need more help? Our support team is here for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {contactOptions.map((option) => (
              <Card key={option.title}>
                <CardContent className="p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-3">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                  <Badge variant="outline" className="text-xs mb-3">
                    {option.available}
                  </Badge>
                  <Button size="sm" className="w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
              <FileText className="h-5 w-5" />
              <span className="text-sm">User Guide</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Privacy Policy</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm">Terms of Service</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">Community</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
