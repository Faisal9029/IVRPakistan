import type { Metadata } from "next";
import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ThemeToggle from "../../components/ThemeToggle";

export const metadata: Metadata = {
  title: "Styleguide (Internal)",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "Navy", className: "bg-navy", note: "Primary text & dark surfaces" },
  { name: "Primary Blue", className: "bg-primary", note: "CTAs, active states" },
  { name: "Cyan Accent", className: "bg-cyan", note: "Secondary accents, gradients" },
  { name: "Surface", className: "bg-surface border border-slate-200", note: "Card / section backgrounds" },
  { name: "Muted Grey", className: "bg-muted", note: "Body copy on light surfaces" },
  { name: "Success", className: "bg-success", note: "Trust badges, form success" },
];

const typeScale = [
  { label: "Display / H1 — text-h1", className: "text-h1 font-bold tracking-tight" },
  { label: "H2 — text-h2", className: "text-h2 font-bold tracking-tight" },
  { label: "H3 — text-h3", className: "text-h3 font-semibold tracking-tight" },
  { label: "Lead — text-lead", className: "text-lead" },
  { label: "Body — text-body", className: "text-body" },
  { label: "Small — text-small", className: "text-small" },
];

export default function StyleguidePage() {
  return (
    <main className="min-h-screen">
      <Section>
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-small font-semibold uppercase tracking-[0.3em] text-primary">
                Design system
              </p>
              <h1 className="text-h1 font-bold tracking-tight text-navy dark:text-white">
                Styleguide
              </h1>
              <p className="mt-2 max-w-xl text-body text-muted dark:text-slate-300">
                Every colour, type step, spacing/radius token, button state, and card
                variant the rebuild is allowed to use. No component defines its own
                colours or spacing outside of this system.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <h2 className="text-h3 font-semibold tracking-tight text-navy dark:text-white">
            Colour tokens
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {colors.map((c) => (
              <Card
                key={c.name}
                className="overflow-hidden rounded-card border border-slate-200 shadow-rest dark:border-slate-800"
              >
                <div className={`h-20 w-full ${c.className}`} />
                <div className="p-4">
                  <p className="text-small font-semibold text-navy dark:text-white">{c.name}</p>
                  <p className="text-small text-muted dark:text-slate-400">{c.note}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-h3 font-semibold tracking-tight text-navy dark:text-white">
            Type scale
          </h2>
          <div className="mt-6 space-y-4">
            {typeScale.map((t) => (
              <div key={t.label} className="border-b border-slate-200 pb-4 dark:border-slate-800">
                <p className={`${t.className} text-navy dark:text-white`}>
                  The quick brown fox jumps over the lazy dog
                </p>
                <p className="mt-1 text-small text-muted dark:text-slate-400">{t.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <h2 className="text-h3 font-semibold tracking-tight text-navy dark:text-white">
            Buttons
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant="primary">Book Appointment</Button>
            <Button variant="secondary">Know More</Button>
            <Button variant="ghost">Learn More</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <p className="mt-4 text-small text-muted dark:text-slate-400">
            Tab to a button to see the focus ring. Hover the primary button to see the
            rest → hover shadow transition.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-h3 font-semibold tracking-tight text-navy dark:text-white">
            Card variant
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="rounded-card border border-slate-200 bg-white p-6 shadow-rest transition hover:shadow-hover dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-h3 font-semibold text-navy dark:text-white">Card {i}</p>
                <p className="mt-2 text-body text-muted dark:text-slate-300">
                  One card radius, one rest shadow, one hover shadow — every section
                  reuses this same recipe.
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <h2 className="text-h3 font-semibold tracking-tight text-navy dark:text-white">
            Spacing, radius & shadow
          </h2>
          <ul className="mt-6 space-y-2 text-body text-muted dark:text-slate-300">
            <li>
              Section rhythm: <code className="text-small">py-20 lg:py-24</code> — owned
              by the <code className="text-small">Section</code> primitive, never set
              per-component.
            </li>
            <li>
              Card radius: <code className="text-small">rounded-card</code> (1.5rem)
            </li>
            <li>
              Button radius: <code className="text-small">rounded-button</code> (full pill)
            </li>
            <li>
              Rest shadow: <code className="text-small">shadow-rest</code>
            </li>
            <li>
              Hover shadow: <code className="text-small">shadow-hover</code>
            </li>
          </ul>
        </Container>
      </Section>
    </main>
  );
}
