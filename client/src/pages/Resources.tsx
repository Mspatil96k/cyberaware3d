import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CyberBackground } from "@/components/CyberBackground";
import { ExternalLink, AlertCircle, Shield, FileText, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Resources() {
  const indianCyberPortals = [
    {
      name: "National Cyber Crime Reporting Portal (NCRP)",
      description: "Official portal for reporting cyber crimes in India",
      url: "https://cybercrime.gov.in/",
      icon: AlertCircle,
      features: ["24/7 reporting", "Anonymous reporting option", "Track complaint status"],
    },
    {
      name: "Cyber Crime Complaint",
      description: "Ministry of Home Affairs cyber crime cell for reporting cybercrimes",
      url: "https://www.cybercrime.gov.in/",
      icon: Shield,
      features: ["Integrated reporting", "Online submission", "Official documentation"],
    },
    {
      name: "Indian Police Cybercrime Cell",
      description: "Contact your local cyber police station for cyber fraud complaints",
      url: "https://www.cybercrime.gov.in/",
      icon: Phone,
      features: ["Local support", "Direct assistance", "Legal action support"],
    },
    {
      name: "RBI Complaint Portal",
      description: "Report financial fraud and cyber attacks to Reserve Bank of India",
      url: "https://www.rbi.org.in/",
      icon: FileText,
      features: ["Banking fraud reporting", "Secure submission", "Official channel"],
    },
  ];

  const fraudReportingSteps = [
    {
      step: 1,
      title: "Gather Evidence",
      description: "Collect all evidence of the cyber fraud including screenshots, emails, transaction details, and any communication records.",
    },
    {
      step: 2,
      title: "Document Details",
      description: "Write down the date, time, amount involved, method of fraud, and any contact information of the fraudster if available.",
    },
    {
      step: 3,
      title: "Preserve Evidence",
      description: "Save all evidence in a safe location. Do not delete emails, messages, or files that could be useful for investigation.",
    },
    {
      step: 4,
      title: "Visit NCRP Portal",
      description: "Go to cybercrime.gov.in and select 'Report' to file a complaint online with all relevant details.",
    },
    {
      step: 5,
      title: "Get Complaint Number",
      description: "After submission, you'll receive a unique complaint number. Save this for tracking and reference.",
    },
    {
      step: 6,
      title: "Contact Local Police",
      description: "For serious cases, file an FIR (First Information Report) at your nearest police station with the complaint number.",
    },
    {
      step: 7,
      title: "Notify Your Bank",
      description: "If financial fraud is involved, immediately contact your bank and request to freeze your accounts if necessary.",
    },
    {
      step: 8,
      title: "Monitor Accounts",
      description: "Check your bank and credit card accounts regularly for unauthorized transactions and consider credit monitoring services.",
    },
  ];

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span className="font-medium">Resources & Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Report Cyber Fraud</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how to report cyber fraud and access official Indian cyber crime reporting portals
          </p>
        </div>

        {/* Indian Cyber Portals */}
        <section className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Official Indian Cyber Portals</h2>
            <p className="text-muted-foreground">Report fraud through official government channels</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {indianCyberPortals.map((portal, idx) => {
              const Icon = portal.icon;
              return (
                <Card
                  key={idx}
                  className="p-6 hover-elevate transition-all hover:-translate-y-1 flex flex-col"
                  data-testid={`card-portal-${idx}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{portal.name}</h3>
                      <p className="text-sm text-muted-foreground">{portal.description}</p>
                    </div>
                  </div>

                  <div className="mb-6 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Key Features:</p>
                    <ul className="text-sm space-y-1">
                      {portal.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href={portal.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                    <Button className="w-full gap-2" variant="outline" data-testid={`button-visit-portal-${idx}`}>
                      <ExternalLink className="w-4 h-4" />
                      Visit Portal
                    </Button>
                  </a>
                </Card>
              );
            })}
          </div>
        </section>

        {/* How to Report Fraud */}
        <section className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">How to Report Cyber Fraud</h2>
            <p className="text-muted-foreground">Step-by-step guide to file an official complaint</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {fraudReportingSteps.map((item, idx) => (
              <Card
                key={idx}
                className="p-6 border-l-4 border-l-primary hover-elevate transition-all"
                data-testid={`card-step-${item.step}`}
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-semibold text-primary">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg pt-1">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm ml-14">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Emergency Contacts</h2>
            <p className="text-muted-foreground">Important numbers for immediate assistance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover-elevate transition-all" data-testid="card-contact-ncrp">
              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary">1930</div>
                <p className="font-semibold">National Cybercrime Portal</p>
                <p className="text-sm text-muted-foreground">Cyber crime reporting toll-free number</p>
              </div>
            </Card>

            <Card className="p-6 text-center hover-elevate transition-all" data-testid="card-contact-police">
              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary">100</div>
                <p className="font-semibold">Police Emergency</p>
                <p className="text-sm text-muted-foreground">Call for urgent cybercrime emergencies</p>
              </div>
            </Card>

            <Card className="p-6 text-center hover-elevate transition-all" data-testid="card-contact-rbi">
              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary">155260</div>
                <p className="font-semibold">RBI Anti-Fraud</p>
                <p className="text-sm text-muted-foreground">Report banking/financial fraud</p>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 border border-primary/20 rounded-lg p-12 text-center space-y-6">
          <h2 className="text-2xl font-bold">Learn More About Cybersecurity</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding cyber threats and how to protect yourself is the first step. Explore our learning resources.
          </p>
          <Link href="/learn">
            <Button size="lg" data-testid="button-explore-articles">
              Explore Articles
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
