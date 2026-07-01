"use client";

import { contactInfo } from "@/lib/data";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${contactInfo.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#173F35] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
