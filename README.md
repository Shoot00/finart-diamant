# FinART-Diamant Website

Acest proiect conține site-ul FinART-Diamant și un backend Node pentru trimiterea de mesaje din formularul de contact.

## Ce face proiectul

- Servește site-ul static `index.html`, `style.css`, `galerie/` etc.
- Are un backend Node cu Express în `server.js`
- Primiți mesaje din formular la ruta `POST /contact`
- Trimite emailuri folosind `nodemailer` și variabile de mediu SMTP

## Fișiere principale

- `index.html` - conține formularul și scriptul care trimite cererea POST
- `server.js` - backend Express + nodemailer
- `package.json` - dependențe și script start
- `.env.example` - exemplu de variabile de mediu
- `.gitignore` - ignoră `node_modules` și `.env`

## Configurare pe GitHub

1. Salvează toate modificările în proiect
2. Fă commit și push în repository-ul tău GitHub

```bash
git add .
git commit -m "Configure contact form backend and email SMTP"
git push
```

## Configurare pe Render

1. Creează un serviciu Web Service pe Render
2. Folosește `start` ca command: `npm start`
3. Adaugă variabilele de mediu:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `RECEIVER_EMAIL`

### Exemplu Gmail

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=adresa-ta@gmail.com`
- `SMTP_PASS=<parolă-de-aplicație>`
- `RECEIVER_EMAIL=adresa-ta@gmail.com`

> `SMTP_PASS` trebuie să fie o parolă de aplicație Gmail, nu parola normală a contului.

## Testare locală

```bash
npm install
npm start
```

Apoi deschide:

```
http://localhost:3000
```

Trimite un mesaj din formular și verifică că primești confirmarea.
