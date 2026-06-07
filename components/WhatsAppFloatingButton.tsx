import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/923462236220"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-slate-950/15 transition duration-200 hover:scale-105 hover:ring-4 hover:ring-[#25D366]/30"
    >
      <FaWhatsapp size={24} />
    </a>
  );
}
