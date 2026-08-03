import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import AppointmentForm from "@/components/AppointmentForm"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"

export const metadata: Metadata = buildMetadata({
  title: "Book Appointment | IVR Pakistan",
  description: "Schedule an appointment with IVR Pakistan healthcare clinic.",
  path: "/appointment",
})

export default function AppointmentPage() {
  return (
    <main className="min-h-screen bg-surface dark:bg-navy">
      <Section>
        <Container>
          <div className="mb-12 rounded-card border border-slate-200 bg-white p-10 shadow-hover dark:border-slate-700 dark:bg-slate-900">
            <p className="text-small font-semibold uppercase tracking-[0.35em] text-primary">Appointment</p>
            <h1 className="mt-6 text-h1 font-black text-navy dark:text-white">
              Online appointment booking made easy
            </h1>
            <p className="mt-4 max-w-2xl text-body text-muted dark:text-slate-300">
              Share your details below and our care team will confirm your visit on WhatsApp shortly.
            </p>
          </div>

          <AppointmentForm />
        </Container>
      </Section>
    </main>
  )
}
