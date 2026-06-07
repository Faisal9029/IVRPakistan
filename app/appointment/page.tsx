import AppointmentForm from "@/components/AppointmentForm"

export const metadata = {
  title: "Book Appointment | IVR Pakistan",
  description: "Schedule an appointment with IVR Pakistan healthcare clinic.",
}

export default function AppointmentPage() {
  return (
    <main className="min-h-screen bg-[#f5fbff] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 rounded-[40px] bg-white p-10 shadow-2xl border border-slate-200">
          <p className="text-sm uppercase tracking-[0.35em] text-[#1677ff]">Appointment</p>
          <h1 className="mt-6 text-4xl font-black text-slate-900 sm:text-5xl">
            Online appointment booking made easy
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Use our secure online form to request a preferred date and service. Our care team will contact you quickly to finalize your visit.
          </p>
        </div>

        <AppointmentForm />
      </div>
    </main>
  )
}
