# L'Abrì — aggiornamento per eliminare la dipendenza dal vecchio `main`

Questa cartella contiene **solo i file da sostituire o aggiungere** sul branch React. Non elimina la grafica, le animazioni o altri file del sito.

## IMPORTANTE — Leggere prima

- Esegui prima sul branch **emergent-react-prod** e poi, dopo il deploy riuscito, ripeti su **emergent-react-test**.
- Non eseguire sul branch `main`. Non modificare Cloudflare DNS.
- Le **20 foto JPEG originali non sono dentro lo ZIP**. Vengono recuperate una sola volta sul tuo computer con `IMPORTA-FOTO-LABRI.cmd` prima di cancellare il vecchio `main`.
- Le normali compilazioni dopo questo aggiornamento usano solo `public/immagini` e **NON scaricano più le foto da main**.

## Per ciascuno dei due branch React

1. Apri GitHub Desktop e scegli `emergent-react-prod` (prima esecuzione).
2. Apri `Repository > Show in Explorer`.
3. Estrai lo ZIP e copia nella cartella `labri-sito` i seguenti contenuti, mantenendo le sottocartelle:
   - `package.json` (sovrascrivi)
   - `.gitignore` (sovrascrivi)
   - `scripts/verify-photos.mjs` (nuovo)
   - `IMPORTA-FOTO-LABRI.cmd` (nuovo, escluso da Git)
4. **Non eliminare ancora** `scripts/download-photos.mjs`: lo utilizzeremo una sola volta.
5. Fai doppio clic su `IMPORTA-FOTO-LABRI.cmd` nella cartella del repository. Il programma scarica le 20 foto dal vecchio main in `public/immagini`, verifica che siano JPEG valide, poi rimuove automaticamente `scripts/download-photos.mjs`.
6. Controlla in GitHub Desktop: dovresti vedere 20 immagini aggiunte, `package.json` e `.gitignore` modificati, un nuovo `scripts/verify-photos.mjs` e la cancellazione di `scripts/download-photos.mjs`.
7. Commit: `Foto locali - nessuna dipendenza da main`; poi **Push origin**.
8. In Cloudflare Pages, controlla un deploy **Success** del progetto `labri-ufficiale`.
9. Cambia branch in GitHub Desktop a `emergent-react-test`. Ripeti i passaggi 2–7. Controlla il deploy TEST.

> Il file `.cmd` resta sul PC ma è escluso dal repository tramite `.gitignore`.

## Controlli prima di eliminare main

- Il deploy PROD su `www.labri.it` e quello TEST su `labri-emergent-test.pages.dev` sono riusciti dopo l'aggiunta delle foto locali.
- La galleria e tutte e 5 le camere hanno foto visibili in entrambi gli ambienti.
- Sono verificate anche le pagine `/accesso`, `/privacy`, `/dove-mangiare`, `/domotica`.
- Gli altri sottodomini `campanello`, `retro`, `tetto`, `casabalcone` e GitHub Pages sono controllati e indipendenti dal vecchio `main`.
- Disponi di una copia ZIP o un tag del vecchio sito prima di eliminarlo.
- In GitHub > Settings > Branches cambi **Default branch** da `main` a `emergent-react-prod`.
- In GitHub > Settings > Pages verifichi la vecchia pubblicazione GitHub Pages: non deve dipendere più da `main`.
- Solo quando tutto è verificato, puoi eliminare `main`. **Non farlo prima.**

## Perché questa procedura

In origine `npm run build` eseguiva `download-photos.mjs` e scaricava immagini da `https://raw.githubusercontent.com/emanuelmartini87/labri-sito/main/immagini/` a ogni compilazione. Ora `npm run build` esegue `verify-photos.mjs`, che controlla unicamente i file locali e fallisce se mancano immagini.

## Nota

In questo ambiente non è stato possibile scaricare e incorporare le fotografie nel pacchetto. Lo script di importazione le recupera sul tuo PC (che ha accesso a GitHub); i file vengono poi salvati permanentemente sul tuo branch tramite GitHub Desktop.
