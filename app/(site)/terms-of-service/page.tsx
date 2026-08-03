import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { email, phone } from "@/lib/siteInfo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Terms of Service | IVR Pakistan",
    description: "Terms of service for IVR Pakistan Karachi.",
    path: "/terms-of-service",
  }),
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-h3 font-semibold text-navy dark:text-white">
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-body leading-8 text-muted dark:text-slate-300">
      {children}
    </p>
  );
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Section>
        <Container className="max-w-3xl">
          <h1 className="text-h1 font-bold tracking-tight text-navy dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-4 text-small text-muted dark:text-slate-400">
            Last updated: August 2026
          </p>

          <Paragraph>
            These Terms of Service govern your use of the IVR Pakistan Karachi
            website. By browsing this site or submitting an appointment
            request, you agree to these terms. If you do not agree, please
            discontinue using the site.
          </Paragraph>

          <Heading>Use of This Website</Heading>
          <Paragraph>
            This website is provided to share information about Dr. Vicky
            Kumar&apos;s interventional radiology services, clinic locations, and
            timings, and to let visitors request an appointment. You agree to
            use the site only for these lawful purposes and not to misuse the
            appointment form, for example by submitting false, abusive, or
            automated spam submissions.
          </Paragraph>

          <Heading>Not a Substitute for Medical Advice</Heading>
          <Paragraph>
            The descriptions of procedures, conditions, and services on this
            site are provided for general educational purposes only and do not
            constitute medical advice. They are not a substitute for an
            in-person consultation, examination, or diagnosis by Dr. Vicky
            Kumar or another qualified physician. No doctor-patient
            relationship is created simply by visiting this website or
            submitting the appointment form.
          </Paragraph>

          <Heading>Appointment Requests</Heading>
          <Paragraph>
            Submitting the appointment form is a request only — it does not
            guarantee a confirmed time slot. Our clinic team will contact you
            by phone or WhatsApp to confirm your appointment details. Please
            let us know as early as possible by phone or WhatsApp if you need
            to reschedule or cancel a visit.
          </Paragraph>

          <Heading>Medical Emergencies</Heading>
          <Paragraph>
            This website and its appointment form, WhatsApp links, and contact
            details are not monitored continuously and must not be used for
            medical emergencies. If you are experiencing a medical emergency,
            call your local emergency services or go to the nearest emergency
            room immediately.
          </Paragraph>

          <Heading>Third-Party Links &amp; Content</Heading>
          <Paragraph>
            This site links to third-party services such as Google Maps,
            YouTube, WhatsApp, and our social media channels, and displays
            advertising through Google AdSense. We do not control these
            third-party services and are not responsible for their content,
            accuracy, or privacy practices. Use of those services is subject to
            their own terms.
          </Paragraph>

          <Heading>Intellectual Property</Heading>
          <Paragraph>
            The text, images, logo, and other content on this website belong to
            IVR Pakistan Karachi unless otherwise noted, and may not be copied,
            reproduced, or used without our prior permission.
          </Paragraph>

          <Heading>Limitation of Liability</Heading>
          <Paragraph>
            We make reasonable efforts to keep the information on this site
            accurate and up to date, but we do not warrant that the site will
            be uninterrupted or error-free. To the fullest extent permitted by
            law, IVR Pakistan Karachi is not liable for any loss or damage
            arising from your use of this website or reliance on its content.
          </Paragraph>

          <Heading>Changes to These Terms</Heading>
          <Paragraph>
            We may update these Terms of Service from time to time. Continued
            use of the site after changes are posted means you accept the
            revised terms.
          </Paragraph>

          <Heading>Governing Law</Heading>
          <Paragraph>
            These terms are governed by the laws of Pakistan, without regard to
            its conflict of law principles.
          </Paragraph>

          <Heading>Contact Us</Heading>
          <Paragraph>
            If you have questions about these Terms of Service, contact us at{" "}
            <a href={`mailto:${email}`} className="font-medium text-primary hover:underline">
              {email}
            </a>{" "}
            or{" "}
            <a href={`tel:${phone.tel}`} className="font-medium text-primary hover:underline">
              {phone.display}
            </a>
            .
          </Paragraph>
        </Container>
      </Section>
    </main>
  );
}
