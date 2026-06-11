import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Thank You | Ebook Visionary Publishing",
  description:
    "Thank you for contacting Ebook Visionary Publishing. Our team will review your inquiry and respond shortly.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-primary-950 text-white">
      <section className="relative flex min-h-screen items-center px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(44,199,228,0.20),transparent_34%),radial-gradient(circle_at_82%_70%,rgba(255,255,255,0.12),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary-300/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary-300/50 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 border border-white/12 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary-100 backdrop-blur-sm">
              <CheckCircle2 className="h-4 w-4 text-secondary-300" />
              Message Received
            </div>

            <h1 className="font-heading text-5xl font-black leading-[0.95] tracking-normal text-white md:text-7xl">
              Thank you for reaching out.
            </h1>

            <p className="mt-8 max-w-2xl font-body text-lg leading-8 text-white/72">
              Your inquiry has been sent to our publishing team. We will review
              your details and get back to you shortly with the next best step
              for your book.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-3 bg-secondary-400 px-7 py-4 font-heading text-sm font-bold uppercase tracking-[0.12em] text-primary-950 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Back to Home
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center border border-white/18 px-7 py-4 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-secondary-300 hover:text-secondary-200"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="relative border border-white/12 bg-white/[0.04] p-8 shadow-2xl shadow-black/20 backdrop-blur-md md:p-10">
            <div className="absolute left-6 top-6 h-1.5 w-1.5 bg-secondary-300" />
            <div className="absolute right-6 top-6 h-1.5 w-1.5 bg-secondary-300" />
            <div className="absolute bottom-6 left-6 h-1.5 w-1.5 bg-secondary-300" />
            <div className="absolute bottom-6 right-6 h-1.5 w-1.5 bg-secondary-300" />

            <div className="mb-10 flex h-16 w-16 items-center justify-center border border-secondary-300/30 bg-secondary-300/10 text-secondary-200">
              <Mail className="h-7 w-7" />
            </div>

            <p className="font-heading text-2xl font-bold leading-snug text-white">
              We usually respond during business hours.
            </p>
            <p className="mt-5 font-body text-sm leading-7 text-white/65">
              If your project is urgent, you can still contact us directly at
              info@ebookvisionarypublishing.us.
            </p>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                Ebook Visionary Publishing
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
