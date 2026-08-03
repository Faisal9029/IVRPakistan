import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Terms of Service | IVR Pakistan",
    description: "Terms of service for IVR Pakistan Karachi.",
    path: "/terms-of-service",
  }),
  // Placeholder copy below is pending real legal content — keep out of search results until finalized.
  robots: { index: false, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Section>
        <Container>
          <h1 className="text-h1 font-bold tracking-tight text-navy dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-6 max-w-2xl text-body text-muted dark:text-slate-300">
            {
              "{{ ASK_FAISAL: Provide the clinic's terms of service copy — appointment/cancellation policy, medical disclaimer, and liability terms. }}"
            }
          </p>
        </Container>
      </Section>
    </main>
  );
}
