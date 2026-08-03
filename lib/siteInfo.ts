import { FaFacebook, FaInstagram, FaSnapchat, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons";

export const phone = {
  display: "+92 346 2236220",
  tel: "+923462236220",
  whatsapp: "923462236220",
};

export const email = "cathlabintervention@gmail.com";

export type Clinic = {
  title: string;
  detail: string;
  hours: string;
  mapLink: string;
  accent: string;
};

export const clinics: Clinic[] = [
  {
    title: "IDC Lab Saddar Karachi",
    detail: "Lucky Star Saddar Karachi, opposite Shell Petrol Pump",
    hours: "Mon, Tue, Fri, Sat - 7pm-8pm",
    mapLink: "https://maps.app.goo.gl/vn1kpJQeugRFbAKr5",
    accent: "from-[#0f62ff] to-[#06b6d4]",
  },
  {
    title: "National Medical Centre (NMC), DHA Karachi",
    detail: "DHA Karachi",
    hours: "Wed & Thu - 5pm-6pm",
    mapLink: "https://share.google/qhLuVj34ZAdKAo37X",
    accent: "from-cyan-500 to-sky-400",
  },
  {
    title: "Farooq Hospital, Lahore",
    detail: "DHA Lahore",
    hours: "Every Sunday",
    mapLink: "https://maps.app.goo.gl/j5gyBG1KbwFoq6T19?g_st=ac",
    accent: "from-sky-500 to-blue-600",
  },
];

export type SocialLink = {
  href: string;
  label: string;
  icon: IconType;
  color: string;
};

export const socialLinks: SocialLink[] = [
  { href: "https://www.facebook.com/share/1MUs7JYPff/", label: "Facebook", icon: FaFacebook, color: "text-blue-600" },
  { href: "https://www.instagram.com/ivr_pakistan_karachi?igsh=MXU4MTA1MW8wMWltaQ==", label: "Instagram", icon: FaInstagram, color: "text-pink-600" },
  { href: "https://www.tiktok.com/@ivrpakistan.com?_r=1&_t=ZN-98R5RejpH1S", label: "TikTok", icon: FaTiktok, color: "text-black" },
  { href: "https://youtube.com/@ivr_pakistan?si=-Y-wlfs25T7PoEMr", label: "YouTube", icon: FaYoutube, color: "text-red-600" },
  { href: "https://whatsapp.com/channel/0029VbBN0Yq2v1Iq8uvsbT1Z", label: "WhatsApp", icon: FaWhatsapp, color: "text-green-600" },
  { href: "https://www.snapchat.com/add/ivr-pakistan?share_id=d_kM3i3iuNQ&locale=en-US", label: "Snapchat", icon: FaSnapchat, color: "text-yellow-500" },
];
