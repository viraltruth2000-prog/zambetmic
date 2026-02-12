import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium text-black/60">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Pagina nu a fost găsită
      </h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-black/70">
        Link-ul poate fi greșit sau pagina a fost mutată.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Înapoi acasă</ButtonLink>
        <Link
          href="/contact"
          className="text-sm font-medium text-black/70 underline-offset-4 hover:underline"
        >
          Contact
        </Link>
      </div>
    </Container>
  );
}
