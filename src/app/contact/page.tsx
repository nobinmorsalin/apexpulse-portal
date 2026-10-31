import { getPortalPage, getPortalSettings } from '@/lib/portal-service';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Editorial Board & Peer Review Desk | ApexPulse Global',
  description: 'Direct institutional, academic citation, and syndication inquiries to ApexPulse Global editorial bureaus.',
  alternates: {
    canonical: 'https://apexpulse-portal.vercel.app/contact',
  },
};

export default async function ContactPage() {
  const page = await getPortalPage('contact');
  const settings = await getPortalSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-8 sm:p-10 shadow-xl space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
          Editorial Office
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {page?.title || 'Editorial Board & Peer Review Desk'}
        </h1>
        <p className="text-xs font-mono text-slate-400">
          {page?.subtitle || 'Direct corporate, academic citation, and publisher inquiries'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-8 shadow-xl space-y-6 text-sm text-slate-300">
          <div>
            <h2 className="text-base font-serif font-bold text-white mb-1">Institutional Communications</h2>
            <p className="text-xs text-cyan-400 font-mono font-semibold">{settings.site_name || 'ApexPulse Global Technical Review'}</p>
            <p className="text-xs text-slate-400 mt-2 font-mono">Editorial Desk: {settings.contact_email || 'editorial@apexpulse.top'}</p>
            <p className="text-xs text-slate-400 font-mono">Legal Compliance: privacy@apexpulse.top</p>
          </div>

          <div className="bg-[#0b0f19] border border-[#171e31] rounded-xl p-4 text-xs text-slate-400 space-y-2 font-mono">
            <div className="font-bold text-white">Peer Review Response Policy</div>
            <p className="leading-relaxed">
              Manuscript submissions, technical corrections, and syndication requests are acknowledged within 24 business hours by our senior editorial review committee.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-8 shadow-xl space-y-4">
          <h3 className="text-base font-serif font-bold text-white">Submit Editorial Inquiry</h3>
          <form className="space-y-3.5 text-xs font-sans">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Full Name &amp; Institution</label>
              <input
                type="text"
                required
                placeholder="Dr. Sarah Vance, Stanford Lab"
                className="w-full bg-[#06080e] border border-[#171e31] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Institutional Email</label>
              <input
                type="email"
                required
                placeholder="sarah.vance@institution.edu"
                className="w-full bg-[#06080e] border border-[#171e31] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Inquiry Type</label>
              <select className="w-full bg-[#06080e] border border-[#171e31] rounded-xl px-3.5 py-2.5 text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-xs">
                <option>Academic Citation Verification</option>
                <option>Peer Review &amp; Manuscript Submission</option>
                <option>Data Telemetry Access Request</option>
                <option>Syndication &amp; Editorial Permissions</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Inquiry Message</label>
              <textarea
                rows={3}
                required
                placeholder="Detail the technical publication ID or citation request..."
                className="w-full bg-[#06080e] border border-[#171e31] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-xs"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-md transition cursor-pointer"
            >
              Transmit Official Inquiry &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
