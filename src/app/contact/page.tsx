import { getPortalPage, getPortalSettings } from '@/lib/portal-service';

export const revalidate = 60;

export default async function ContactPage() {
  const page = await getPortalPage('contact');
  const settings = await getPortalSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {page?.title || 'Contact & Editorial Desk'}
        </h1>
        <p className="text-xs text-slate-400">
          {page?.subtitle || 'Direct corporate and publisher inquiries'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 text-sm text-slate-300">
          <div>
            <h2 className="text-base font-bold text-white mb-1">Corporate Communications</h2>
            <p className="text-xs text-slate-400">{settings.site_name}</p>
            <p className="text-xs text-slate-400">Editorial Email: {settings.contact_email}</p>
            <p className="text-xs text-slate-400">Compliance: privacy@apexpulse.top</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-2">
            <div className="font-semibold text-white">Editorial Response SLA</div>
            <p>Verification requests and syndicated partnership communications are processed within 24 business hours.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Send Inquiry</h3>
          <form className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Marcus Vance"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Business Email</label>
              <input
                type="email"
                required
                placeholder="vance@enterprise.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Inquiry details..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="button"
              className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
