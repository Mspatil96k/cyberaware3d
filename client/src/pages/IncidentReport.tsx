import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CyberBackground } from "@/components/CyberBackground";
import { AlertTriangle, CheckCircle, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insertIncidentReportSchema, type InsertIncidentReport } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

export default function IncidentReport() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const { data: reports } = useQuery({
    queryKey: ["/api/incident-reports"],
    enabled: isAuthenticated,
  });

  const form = useForm<InsertIncidentReport>({
    resolver: zodResolver(insertIncidentReportSchema),
    defaultValues: {
      title: "",
      description: "",
      incidentType: "phishing",
      affectedAreas: "",
      severity: "medium",
      reportedToAuthorities: false,
      attachments: undefined,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertIncidentReport) => {
      const response = await apiRequest("/api/incident-reports", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit report");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your incident report has been submitted successfully.",
      });
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit report",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertIncidentReport) => {
    submitMutation.mutate(data);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center space-y-4">
          <AlertTriangle className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">Authentication Required</h2>
          <p className="text-muted-foreground">Please log in to report a cyber incident.</p>
          <a href="/api/login">
            <Button className="w-full">Log In</Button>
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span className="font-medium">Incident Reporting</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Report a Cyber Incident</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Document and report cybersecurity incidents to help protect your organization
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-400">Report Submitted</p>
                    <p className="text-sm text-green-600 dark:text-green-300">Thank you for reporting this incident.</p>
                  </div>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Incident Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief title of the incident" {...field} data-testid="input-incident-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Detailed description of what happened"
                            rows={4}
                            {...field}
                            data-testid="textarea-incident-description"
                          />
                        </FormControl>
                        <FormDescription>Provide as much detail as possible</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="incidentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Incident Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-incident-type">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="phishing">Phishing Attack</SelectItem>
                            <SelectItem value="malware">Malware Infection</SelectItem>
                            <SelectItem value="data-breach">Data Breach</SelectItem>
                            <SelectItem value="unauthorized-access">Unauthorized Access</SelectItem>
                            <SelectItem value="ransomware">Ransomware</SelectItem>
                            <SelectItem value="social-engineering">Social Engineering</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="affectedAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Affected Areas/Systems</FormLabel>
                        <FormControl>
                          <Input placeholder="Email, Network, Servers, etc." {...field} data-testid="input-affected-areas" />
                        </FormControl>
                        <FormDescription>Which systems or areas were affected?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="severity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Severity Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-severity">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low - Minor issue</SelectItem>
                            <SelectItem value="medium">Medium - Some impact</SelectItem>
                            <SelectItem value="high">High - Significant impact</SelectItem>
                            <SelectItem value="critical">Critical - Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full gap-2"
                    data-testid="button-submit-report"
                  >
                    {submitMutation.isPending && <Loader className="w-4 h-4 animate-spin" />}
                    Submit Report
                  </Button>
                </form>
              </Form>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-3">What to Include</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>When the incident occurred</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>What systems were affected</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Scope of impact</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Actions already taken</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Evidence or artifacts</span>
                </li>
              </ul>
            </Card>

            {reports && reports.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Your Reports</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Total reports: <span className="font-semibold text-foreground">{reports.length}</span>
                  </p>
                  <div className="space-y-1 text-sm">
                    {reports.slice(0, 3).map((report: any) => (
                      <div key={report.id} className="flex items-start gap-2 p-2 rounded hover-elevate">
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            report.severity === "critical"
                              ? "bg-red-500"
                              : report.severity === "high"
                                ? "bg-orange-500"
                                : report.severity === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium text-sm">{report.title}</p>
                          <p className="text-xs text-muted-foreground">{new Date(report.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
