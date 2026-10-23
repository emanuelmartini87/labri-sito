// Impedisce che il dominio tecnico pages.dev compaia su Google.
// Sul dominio ufficiale, le pagine pubbliche restano indicizzabili.
// La pagina domotica resta sempre non indicizzabile.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const response = await context.next();
  if (!url.hostname.endsWith(".pages.dev") && url.pathname !== "/domotica") {
    return response;
  }
  const withSeoHeader = new Response(response.body, response);
  withSeoHeader.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return withSeoHeader;
}
