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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-clay text-sand shadow-lg transition-all hover:scale-105 hover:bg-umber"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
