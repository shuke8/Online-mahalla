# Secrets Management — 1Password

Barcha sir tutiladigan ma'lumotlar (API key, parol, token, OAuth secret, DB URL, sertifikat) **faqat 1Password vault "Online-mahalla"** da saqlanadi.

## Vault

- **Nom:** `Online-mahalla`
- **ID:** `goqgs2f5z3z3qobcqcyvrojthm`
- **Egasi:** stemirov777@gmail.com

## Workflow

### 1. Yangi secret qo'shish

```bash
# API key / token
op item create \
  --vault="Online-mahalla" \
  --category="API Credential" \
  --title="<Provider name>" \
  "credential=<value>" \
  "hostname=<provider host>"

# Login + parol
op item create \
  --vault="Online-mahalla" \
  --category="Login" \
  --title="<Service>" \
  "username=<user>" \
  "password=<pass>" \
  "url=<https://...>"

# Database
op item create \
  --vault="Online-mahalla" \
  --category="Database" \
  --title="<DB name>" \
  "server=<host>" \
  "username=<user>" \
  "password=<pass>" \
  "database=<db>"
```

### 2. `.env.template` ga reference qo'shish

`.env.template` fayli git'ga commit qilinadi. Real qiymatlar emas, faqat `op://` reference:

```bash
DATABASE_URL="op://Online-mahalla/Database/url"
RESEND_API_KEY="op://Online-mahalla/Resend/credential"
```

### 3. Lokal `.env.local` yaratish

```bash
op inject -i .env.template -o .env.local
```

Yoki `.env.local` yaratmasdan to'g'ridan-to'g'ri run:

```bash
op run --env-file=.env.template -- npm run dev
```

### 4. Production (Vercel)

Vercel dashboard'ida `Environment Variables` bo'limiga reference emas, **real qiymat** yoziladi. Qiymat 1Password'dan olib qo'lda yoziladi (Vercel `op://` ni qo'llab-quvvatlamaydi).

```bash
# 1Password'dan qiymatni olish (terminal'ga chiqaradi — diqqat!)
op read "op://Online-mahalla/<item>/<field>"

# Yoki to'g'ridan-to'g'ri clipboard'ga
op item get "<item>" --vault="Online-mahalla" --fields=credential --reveal | pbcopy
```

## Xavfsizlik qoidalari

1. **HECH QACHON** real secret qiymatini kodga, `.env`'ga, chat'ga, log'ga, screenshot'ga yozmang
2. `.env*` `.gitignore`'da yopiq (faqat `.env.template` istisno)
3. Kompromислangan kalit topilsa — **DARHOL rotate**, 1Password'dagi qiymatni yangi'ga almashtir, eskini provider'da invalidate qil
4. Yangi developer kirsa — 1Password vault'ga `--add-collaborator` orqali qo'shiladi, repo access bilan emas
5. CI/CD (GitHub Actions) — 1Password Service Account token qo'llaniladi (alohida sozlanadi)

## Hozir vault'da nima bor

| Item | Category | Maqsad | Reference |
|------|----------|--------|-----------|
| GitHub | API Credential | gh CLI orqali git push uchun — auto-rotated | `op://Online-mahalla/GitHub/credential` |

**Naming qoidasi:** item title kebab-case yoki PascalCase, bo'shliq/qavs/maxsus belgi YO'Q (op:// reference parser uchun).

## Migration (eski secrets)

Agar eski `.env`, `local.properties` yoki kod ichida secret bo'lsa:

1. Compromised deb hisoblang
2. Provider'da rotate qiling (yangi kalit)
3. Yangi kalit'ni 1Password'ga `op item create` orqali saqlang
4. Kod/`.env`'ni `op://` reference'ga almashtiring
5. Eski commit'ni tarixdan tozalash (agar push qilingan): `git filter-repo`
6. Gitleaks allowlist'ga eski commit hash'ni qo'shing

## Reference

- 1Password CLI docs: https://developer.1password.com/docs/cli/
- `op` command reference: https://developer.1password.com/docs/cli/reference/
- Secret references format: https://developer.1password.com/docs/cli/secret-reference-syntax/
