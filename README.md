# L'Abrì — versione TEST indipendente da Emergent

**Repository completo del frontend React**, derivato dall'esportazione Emergent del 23 ottobre 2026 e adattato per una pubblicazione gratuita con **GitHub + Cloudflare Pages**. Conserva layout, Framer Motion, Lenis, Tailwind CSS, quattro lingue, pagine interne, fotografie, collegamenti e design.

**Attenzione: questa è una versione TEST non ancora sottoposta a build completa con installazione npm in questo ambiente.** La build e il download delle fotografie saranno eseguiti da Cloudflare Pages. Non spostare ancora il dominio `labri.it`.

## 1. Pubblicazione TEST (Cloudflare Pages)

1. Crea un **nuovo repository GitHub** (esempio: `labri-nuovo-test`) senza sovrascrivere `emanuelmartini87/labri-sito`.
2. Carica il **contenuto di questa cartella alla radice** del nuovo repository. NON caricare la cartella superiore dello ZIP, soltanto i file che contiene, come `package.json`, `index.html` e `src/`.
3. In Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** scegli il nuovo repository e il branch `main`.
4. Imposta:
   - **Framework preset:** `Vite` oppure `None`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (radice del repository)
   - **Node version:** 22 (`NODE_VERSION=22` se Cloudflare non usa già Node 22).
5. Premi Deploy. Cloudflare scarica le foto originali dal repository GitHub `emanuelmartini87/labri-sito` durante la build e le copia nel nuovo sito.
6. Apri l'indirizzo `nome-progetto.pages.dev` e prova `/`, `/accesso`, `/domotica`, `/dove-mangiare`, `/privacy`, `/#camere` e i collegamenti.
7. **Non collegare** `labri.it` al progetto TEST finché tutti i test non sono superati.

## 2. Avvio sul tuo PC

Richiede Node.js 20.19+ oppure 22.12+:

```bash
npm install
npm run dev
```

Apri `http://localhost:5173`.

Per compilare il sito:

```bash
npm run build
npm run preview
```

La build scarica **una sola volta** le immagini originali nella cartella `public/immagini/` (20 fotografie) se mancanti, usando GitHub. Per visualizzarle anche in sviluppo, esegui prima `npm run download:images`.

Se non riesce a scaricarle, la compilazione **si ferma volontariamente**: bisogna poter verificare tutte le immagini prima di pubblicare.

## 3. Funzionalità realmente operative nella versione statica

- **5 camere:** dati salvati localmente in `src/data/rooms.js`, senza MongoDB.
- **Galleria e fotografie:** copiate dalla repository originale pubblica durante la build; non caricate da Emergent.
- **Animazioni originali:** Framer Motion, Lenis e CSS/Tailwind mantenuti.
- **IT / EN / FR / DE:** selettore lingue conservato.
- **Prenotazioni vere:** il link *BedBooking* apre il servizio esistente. Il modulo nel sito **prepara un'email o WhatsApp**: non è una prenotazione confermata, non riceve disponibilità dal gestionale, non invia email autonomamente.
- **Contatti:** il modulo prepara un messaggio nell'app email dell'ospite; NON invia email dal server. L'utente deve confermare l'invio.
- **Chat AI Emergent:** sostituita da una **guida rapida multilingue**, con link utili e WhatsApp. Nessun chatbot AI o token API viene simulato.
- **Domotica:** resta il link LAN `domotica.labri.lan`, accessibile soltanto nella tua rete.
- **Collegamenti storici:** Cloudflare `_redirects` + route React preservano i link `/pagine/...`.
- **Cloudflare Tunnel, CT90, CT91, posta:** non vengono toccati, perché questo progetto modifica soltanto il frontend del sito.

### Differenze rispetto a Emergent

Il backend `FastAPI/MongoDB`, le disponibilità e richieste di prenotazione del database Emergent, i cron email Emergent e l'AI conversazionale **non sono trasferiti**. Per riaverli servono backend/API separati (ad esempio Cloudflare Workers + D1 e integrazioni autorizzate). Non è stato implementato un collegamento diretto a BedBooking per le disponibilità e non va supposto.

## 4. Foto

Lo ZIP contiene il **codice completo e l'elenco dei file**, non i file JPG originali (non erano inclusi nello ZIP Emergent). Il download è automatico alla prima build e li aggiunge dentro il sito pubblicato.

Origine: `https://github.com/emanuelmartini87/labri-sito/tree/main/immagini`. Non eliminare il vecchio repository prima che Cloudflare abbia copiato le fotografie.

## 5. Privacy e indicizzazione

Questa versione TEST include `noindex` in `index.html` e `Disallow: /` in `public/robots.txt` per impedire che i domini di prova vengano indicizzati. **Al momento del passaggio definitivo** a `www.labri.it` bisogna cambiare queste due impostazioni, verificare privacy/cookie policy, canonical, sitemap e le immagini Open Graph. Non usare il TEST come produzione senza questo passaggio.

## 6. Come ripristinare il sito originale

Il repository esistente `labri-sito` resta intatto. Anche i DNS Cloudflare non vengono modificati da questo progetto. L'eventuale collegamento del dominio si farà in una fase successiva, con backup DNS.

## 7. Checklist rapida prima del cambio DNS

- [ ] La build termina con successo su Cloudflare Pages
- [ ] Fotografie originali e animazioni caricano su cellulare e PC
- [ ] IT, EN, FR, DE verificati
- [ ] Link BedBooking, WhatsApp, webcam e mappe verificati
- [ ] Moduli email/WhatsApp provati su dispositivo reale
- [ ] Tutte le pagine e URL delle email precedenti verificati
- [ ] Metadata e robots aggiornati per produzione
- [ ] Privacy policy e eventuali servizi terzi riesaminati
- [ ] DNS attuali esportati da Cloudflare e piano di ripristino pronto
