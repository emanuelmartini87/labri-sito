// Labri.it — Cloudflare Pages Functions middleware
// Restituisce 410 Gone per le vecchie pagine delle singole camere,
// non più presenti nel nuovo sito. Il parametro ?lang=... non cambia la risposta.
// Preserva le protezioni SEO esistenti per pages.dev e /domotica.

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Le vecchie pagine camera1.html ... camera5.html sono rimosse definitivamente.
  // La verifica usa il pathname, quindi copre tutte le vecchie lingue (IT/EN/FR/DE).
  if (/^\/pagine\/camera[1-5]\.html\/?$/i.test(url.pathname)) {
    return new Response("Questa pagina non e' piu' disponibile.", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  const response = await context.next();
  if (!url.hostname.endsWith(".pages.dev") && url.pathname !== "/domotica") {
    return response;
  }
  const withSeoHeader = new Response(response.body, response);
  withSeoHeader.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return withSeoHeader;
}
