"use client";

export default function FeaturesLayout() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-24 mb-16 animate-fade-in-up delay-700">
      <div className="text-center mb-12">
        <h2 className="text-slate-800 text-2xl font-bold tracking-tight mb-3">Enterprise-grade SEO Intel</h2>
        <p className="text-slate-500 font-medium max-w-lg mx-auto">Skip the expensive tools. Get automated deep insights directly from your browser, completely free.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col items-start text-left">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h3 className="text-slate-900 font-bold mb-2">Lightning Fast</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Our advanced parser processes your entire DOM tree in milliseconds, delivering real-time actionable metrics.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col items-start text-left">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <h3 className="text-slate-900 font-bold mb-2">Deep Insights</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Catch missing alt tags, evaluate header structures, and ensure optimal meta lengths to rank higher on Google.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col items-start text-left">
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <h3 className="text-slate-900 font-bold mb-2">100% Private</h3>
          <p className="text-slate-500 text-sm leading-relaxed">We don't use paid APIs. Everything is scraped on the fly. No registration, no databases, no tracked queries.</p>
        </div>
      </div>
    </div>
  );
}
