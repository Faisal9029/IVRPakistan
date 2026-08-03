import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { email, phone } from "@/lib/siteInfo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Privacy Policy | IVR Pakistan",
    description: "Privacy policy for IVR Pakistan Karachi.",
    path: "/privacy-policy",
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

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Section>
        <Container className="max-w-3xl">
          <h1 className="text-h1 font-bold tracking-tight text-navy dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-small text-muted dark:text-slate-400">
            Last updated: August 2026
          </p>

          <Paragraph>
            IVR Pakistan Karachi (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates this
            website to share information about Dr. Vicky Kumar&apos;s interventional
            radiology practice and to let visitors request an appointment. This
            policy explains what information we collect through the site, how we
            use it, and the choices you have.
          </Paragraph>

          <Heading>Information We Collect</Heading>
          <Paragraph>
            When you submit our appointment or contact form, we collect the
            details you provide — typically your name, phone number, and any
            message describing your symptoms or preferred visit time. We only
            use this information to get in touch with you about your appointment
            request; we do not ask for or store sensitive medical records
            through the website itself.
          </Paragraph>
          <Paragraph>
            If you contact us directly via WhatsApp, phone, or email using the
            links on this site, that conversation takes place on WhatsApp or
            your email/phone provider and is governed by their own privacy
            practices, not this website.
          </Paragraph>
          <Paragraph>
            We also automatically receive standard technical information common
            to all websites, such as your browser type, device type, and pages
            visited, which helps us keep the site working correctly and
            reasonably secure.
          </Paragraph>

          <Heading>Cookies &amp; Third-Party Services</Heading>
          <Paragraph>
            This site uses Google AdSense to display advertising and may show
            embedded YouTube videos of our procedures and patient education
            content. Google, YouTube, and our advertising partners may set
            cookies or use similar technologies on your device to serve ads and
            measure how the site is used. You can control or clear cookies
            through your browser settings at any time, and you can opt out of
            personalized advertising through Google&apos;s{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Ads Settings
            </a>
            .
          </Paragraph>
          <Paragraph>
            Your theme preference (light or dark mode) is saved locally in your
            browser only and is never sent to our servers.
          </Paragraph>

          <Heading>How We Use Your Information</Heading>
          <Paragraph>
            We use the information you submit solely to respond to your
            appointment request or inquiry, confirm visit details, and provide
            the clinic services you have asked about. We do not sell or rent
            your personal information to third parties.
          </Paragraph>

          <Heading>Data Retention</Heading>
          <Paragraph>
            We keep appointment and contact submissions only for as long as
            needed to respond to your request and maintain a basic record of
            clinic visits, after which they may be deleted.
          </Paragraph>

          <Heading>Data Security</Heading>
          <Paragraph>
            We take reasonable technical and organizational precautions to
            protect the information submitted through this site. However, no
            method of transmission over the internet is completely secure, and
            we cannot guarantee absolute security.
          </Paragraph>

          <Heading>Children&apos;s Privacy</Heading>
          <Paragraph>
            This website is intended for adults seeking information about our
            services and is not directed at children. We do not knowingly
            collect personal information from children through this site.
          </Paragraph>

          <Heading>Your Choices</Heading>
          <Paragraph>
            You may ask us to tell you what information we hold about you from
            a form submission, or ask us to delete it, by contacting us using
            the details below.
          </Paragraph>

          <Heading>Changes to This Policy</Heading>
          <Paragraph>
            We may update this policy from time to time as our services or
            applicable requirements change. Any changes will be posted on this
            page with an updated date.
          </Paragraph>

          <Heading>Contact Us</Heading>
          <Paragraph>
            If you have questions about this Privacy Policy or how your
            information is handled, contact us at{" "}
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
