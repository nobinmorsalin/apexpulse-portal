import { getPortalPage, getPortalSettings } from '@/lib/portal-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  const page = await getPortalPage('contact');
  const settings = await getPortalSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
          Editorial Office
        </span>
        <h1 className="text-3xl font-serif font-black text-slate-900 tracking-tight">
          {page?.title || 'Editorial Board & Peer Review Desk'}
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {page?.subtitle || 'Direct corporate, academic citation, and publisher inquiries'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6 text-sm text-slate-700">
          <div>
            <h2 className="text-base font-serif font-bold text-slate-900 mb-1">Institutional Communications</h2>
            <p className="text-xs text-slate-500 font-semibold">{settings.site_name || 'ApexPulse Educational Institute'}</p>
            <p className="text-xs text-slate-500 mt-1">Editorial Desk: {settings.contact_email || 'editorial@apexpulse.top'}</p>
            <p className="text-xs text-slate-500">Legal Compliance: privacy@apexpulse.top</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-900">Peer Review Response Policy</div>
            <p className="leading-relaxed">
              Manuscript submissions, technical corrections, and syndication requests are acknowledged within 24 business hours by our senior editorial review committee.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-4">
          <h3 className="text-base font-serif font-bold text-slate-900">Submit Editorial Inquiry</h3>
          <form className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Full Name & Institution</label>
              <input
                type="text"
                required
                placeholder="Dr. Sarah Vance, Stanford Lab"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Institutional Email</label>
              <input
                type="email"
                required
                placeholder="sarah.vance@institution.edu"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Inquiry / Subject</label>
              <input
                type="text"
                required
                placeholder="Citation verification / Technical inquiry"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Brief outline of your inquiry..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <button
              type="button"
              className="w-full py-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition"
            >
              Submit Inquiry to Review Board
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
