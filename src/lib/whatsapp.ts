export function toWhatsAppLink(phoneNumber: string, text?: string) {
  const digits = phoneNumber.replace(/[^\d+]/g, "");
  const normalized = digits.startsWith("+") ? digits.slice(1) : digits;
  const base = `https://wa.me/${encodeURIComponent(normalized)}`;

  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
