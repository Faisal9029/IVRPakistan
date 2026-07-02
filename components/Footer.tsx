export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
              IVR Pakistan Karachi
            </p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-300">
              Leading interventional radiology care in Karachi with compassionate support, modern imaging, and minimally invasive procedures.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
              Contact
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=923442587864"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-cyan-300"
                >
                  WhatsApp
                </a>
              </li>
              <li>Email: cathlabintervention@gmail.com</li>
              <li>Address: Lucky Star Saddar Karachi</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
              Working Hours
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>Mon, Tue, Fri, Sat: 7pm–8pm</li>
              <li>Wed, Thu: 5pm–6pm</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>Services</li>
              <li>Reviews</li>
              <li>Appointment</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-sm text-slate-500 sm:flex sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} IVR Pakistan Karachi. All rights reserved.</p>
          <p className="mt-4 sm:mt-0">Design by Faisal</p>
        </div>
      </div>
    </footer>
  )
}
