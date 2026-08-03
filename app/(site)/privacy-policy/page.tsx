import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Privacy Policy | IVR Pakistan",
    description: "Privacy policy for IVR Pakistan Karachi.",
    path: "/privacy-policy",
  }),
  // Placeholder copy below is pending real legal content — keep out of search results until finalized.
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Section>
        <Container>
          <h1 className="text-h1 font-bold tracking-tight text-navy dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-2xl text-body text-muted dark:text-slate-300">
            {
              "{{ ASK_FAISAL: Provide the clinic's privacy policy copy — how patient data, appointment requests, and contact form submissions are collected, stored, and used. }}"
            }
          </p>
        </Container>
      </Section>
    </main>
  );
}
