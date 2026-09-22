# CivicWatch

A civic incident reporting platform for Lagos State, built with Next.js 15 (App Router), TypeScript, Firebase, and Zustand. Citizens report local issues — blocked drainage, broken streetlights, illegal dumping — and reports are routed to the responsible Lagos State agency. Admins triage, verify, and update status. The public feed is filterable, paginated, and localized.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Firebase Setup](#firebase-setup)
- [Project Structure](#project-structure)
- [Theming](#theming)
- [Internationalization](#internationalization)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [Reporting Flow](#reporting-flow)
- [Data Model](#data-model)
- [Firestore Security Rules](#firestore-security-rules)
- [Seeding Data](#seeding-data)
- [Accessibility](#accessibility)
- [Low-Bandwidth Considerations](#low-bandwidth-considerations)
- [Privacy & Security](#privacy--security)
- [Scripts](#scripts)
- [Roadmap](#roadmap)

---

## Features

### Citizen-facing

- Multi-step incident reporting wizard (Category → Description → Location → Media & privacy)
- Anonymous submissions — automatically enforced for restricted categories (Personal Safety / GBV)
- Google sign-in for users who want to track their reports
- Email/password sign-in for admin accounts
- "My Reports" page showing the signed-in user's filings
- Public civic issues feed with category filters, status tabs, and pagination
- Reference ID lookup — report status can be checked without an account
- Post-submission "Next Steps" card with the assigned agency, SLA, escalation path, and direct contact links
- Multilingual UI (English, Nigerian Pidgin, Yorùbá, Hausa, Igbo)
- Light and dark theme with persisted preference
- Offline-aware UX with a connectivity banner and queued-submission hints
- Text-only friendly: no reliance on heavy media for core flows

### Admin-facing

- Inline status control (Open → In Progress → Resolved) directly on issue cards
- Report verification action, separate from status changes
- Priority override per report
- Editable agency routing table per category

### Cross-cutting

- Centralized regional config (`config/regions/lagos.json`)
- Centralized category, status, and priority configs
- SLA tracking with escalation threshold per category
- Voice input for the description field (Web Speech API, feature-detected)
- Client-side image compression and EXIF metadata stripping before upload

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19, CSS Modules |
| Icons | Font Awesome + inline SVG assets |
| State | Zustand (with `persist` middleware) |
| Auth | Firebase Authentication (Google + Email/Password) |
| Database | Cloud Firestore |
| Storage | Firebase Storage (for media) |
| Fonts | System stack (`-apple-system`, `Segoe UI`, `Roboto`) |

---

## Getting Started

```bash
# Clone
git clone <repo-url>
cd civic-watch

# Install
npm install

# Configure environment
cp .env.local.example .env.local
# Fill in the values (see "Environment Variables")

# Run dev server
npm run dev
Open http://localhost:3000.

Environment Variables
All Firebase variables must be prefixed with NEXT_PUBLIC_ so they are available in client components.

bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# App
NEXT_PUBLIC_REGION=lagos
NEXT_PUBLIC_ADMIN_EMAIL=admin@civicwatch.ng
Variable	Purpose
NEXT_PUBLIC_REGION	Selects the active region config (lagos, etc.)
NEXT_PUBLIC_ADMIN_EMAIL	The single email allowed to sign in via the admin form
Firebase Setup
Create a project at console.firebase.google.com.

Authentication → Sign-in method:

Enable Google

Enable Email/Password (used for admin accounts)

Firestore Database → Create database (start in test mode for development).

Project Settings → General → Your apps → Add Web App — copy the config values into .env.local.

Create an admin user in Authentication → Users with the same email as NEXT_PUBLIC_ADMIN_EMAIL.

Publish the Firestore rules.

See SETUP.md for a longer walkthrough if you prefer step-by-step instructions.

Project Structure
text
civic-watch/
├── app/                       # Next.js App Router pages
│   ├── layout.tsx             # Root layout + AuthProvider + theme boot script
│   ├── globals.css            # Theme tokens, base styles, responsive rules
│   ├── signin/                # Unified sign-in page
│   ├── report-incident/       # Multi-step reporting wizard
│   ├── issues/                # Public civic issues feed
│   ├── reports/               # Signed-in user's reports
│   └── search/                # Search results
│
├── components/                # Reusable UI + feature components
│   ├── navbar/                # Global navbar (desktop + mobile drawer)
│   ├── reportNav/             # Wizard-specific top bar
│   ├── stepper/               # Wizard progress indicator
│   ├── privacyCard/           # Anonymity toggle
│   ├── category/              # Wizard step 1
│   ├── description/           # Wizard step 2
│   ├── location/              # Wizard step 3
│   ├── media/                 # Wizard step 4
│   ├── successModal/          # Post-submission dialog
│   ├── nextStepsCard/         # Guidance after submission
│   ├── notifications/         # Notification dropdown
│   ├── howItWorks/            # Explainer modal
│   ├── offlineBanner/         # Connectivity banner
│   ├── languageSwitcher/      # Locale picker
│   ├── verificationBadge/     # Verified-by-residents chip
│   ├── contactLinks/          # Phone / website / email chips
│   ├── escalationButton/      # "Escalate" action
│   ├── voiceInput/            # Web Speech API wrapper
│   ├── agencyLeaderboard/     # Sidebar agency stats
│   ├── consentScreen/         # Pre-auth disclosure
│   ├── geolocationPrompt/     # GPS opt-in
│   ├── slaTracker/            # SLA countdown / escalation flag
│   ├── imageCompressor/       # Canvas-based downscaling
│   └── AuthProvider.tsx       # Zustand auth bootstrapper
│
├── config/
│   ├── constants.ts           # App-wide constants
│   ├── categories.json/.ts    # Categories, statuses, priorities
│   ├── sla.json/.ts           # SLA rules + escalation logic
│   └── regions/
│       ├── index.ts           # Region loader
│       └── lagos.json         # LGAs, agencies, routing, contacts
│
├── lib/
│   ├── firebase.ts            # Firebase client init
│   ├── report.ts              # Firestore read/write helpers
│   ├── i18n.ts                # Translation helper + locale storage
│   ├── format.ts              # Date / number formatting
│   └── metadata.ts            # EXIF stripping for uploads
│
├── locales/
│   ├── en.json                # English strings
│   ├── pcm.json               # Nigerian Pidgin
│   ├── yo.json                # Yorùbá
│   ├── ha.json                # Hausa
│   └── ig.json                # Igbo
│
├── store/
│   └── authStore.ts           # Zustand store (user + isAdmin)
│
├── scripts/
│   └── seedReports.ts         # Firestore seed script
│
└── public/
    └── assets/
        └── images/            # SVG icon set
Theming
Colors, shadows, and surfaces are defined as CSS custom properties in app/globals.css. Switching themes is done by toggling data-theme="dark" on <html>.

Tokens
css
:root {
  --bg-page: #f8f9fa;
  --bg-surface: #ffffff;
  --bg-subtle: #f3f4f6;
  --bg-accent-soft: #e6f4ea;
  --bg-accent-strong: #065f46;
  --bg-accent-hover: #044e38;

  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-muted: #6b7280;
  --text-faint: #9ca3af;
  --text-accent: #065f46;

  --border-default: #e5e7eb;
  --border-strong: #d1d5db;
  --border-accent: #a7f3d0;
  --border-accent-focus: #059669;

  --accent-primary: #059669;
  --accent-danger: #b91c1c;

  --shadow-sm: ...;
  --shadow-md: ...;
  --shadow-lg: ...;
}

[data-theme='dark'] {
  --bg-page: #0f172a;
  --bg-surface: #1e293b;
  /* ... */
}
Never hardcode hex values in component modules. Always consume tokens.

Boot script
A tiny inline script in app/layout.tsx reads localStorage.theme and applies data-theme before hydration, avoiding a flash of light mode.

Internationalization
Translations live in locales/*.json.

Access via t('namespace.key', { vars }) from lib/i18n.ts.

Locale is persisted in localStorage.locale and reflected on <html lang>.

Supported locales are declared in lib/i18n.ts under supportedLocales.

The LanguageSwitcher component is dropped into both navbars and the mobile drawer.

Adding a new language
Copy locales/en.json to locales/<code>.json and translate.

Register the dictionary in lib/i18n.ts.

Add the code to supportedLocales.

Add the code to REGION.supportedLocales in config/regions/lagos.json.

Configuration
Region config (config/regions/lagos.json)
Defines everything that varies per deployment:

LGAs and their zones

Agencies with contacts, websites, SLAs, and category assignments

Category → agency routing map

Category-level SLA hours

Emergency numbers and service hours

Restricted categories (currently safety)

To add a new region, create config/regions/<id>.json following the same shape, register it in config/regions/index.ts, and set NEXT_PUBLIC_REGION in env.

Categories (config/categories.json)
Defines category ids, icons, restriction flags, and default priority. Statuses and priorities with their colors live here too.

SLA (config/sla.json)
Default SLA windows and per-category overrides. Includes escalation thresholds and reminder windows.

Authentication
Implemented with Firebase Auth and managed via a Zustand store (store/authStore.ts) with persist.

User flow
/signin shows a single card with:

Continue with Google (primary, for citizens)

Sign in as admin form (email + password, verified against NEXT_PUBLIC_ADMIN_EMAIL)

Authenticated users are redirected to / when visiting /signin.

The navbar displays the signed-in email (with a 🛡️ prefix for admins) and a Sign out button.

Store shape
ts
{
  user: User | null
  loading: boolean
  initialized: boolean
  isAdmin: boolean
  init(): void
  signInWithGoogle(): Promise<void>
  signInAsAdmin(email, password): Promise<void>
  logout(): Promise<void>
}
AuthProvider calls init() once on mount, which subscribes to onAuthStateChanged.

Admin enforcement
signInAsAdmin verifies the returned user's email against NEXT_PUBLIC_ADMIN_EMAIL and immediately signs out if there's a mismatch. isAdmin is what unlocks the status dropdown on the Civic Issues page and the verification action.

Reporting Flow
The wizard lives in app/report-incident/page.tsx and orchestrates four steps:

Step	Component	Purpose
1	Category	Pick the issue type (routed to a specific agency)
2	Description	Short title + full description with voice input option
3	Location	GPS prompt, street address, LGA, optional landmark
4	Media	Optional photo/video attachments + final submit
State
All wizard state lives in the parent (ReportData).

Drafts are persisted to localStorage under civicwatch:draft and cleared on successful submission.

isRestricted is derived from RESTRICTED_CATEGORIES. When true, anonymous is forced to true and the privacy toggle is locked.

Submission
createReport writes a document to the reports collection with status: 'open' and a priority derived from the category.

On success, the parent renders SuccessModal with the new Firestore document ID, formatted into a reference ID via buildReferenceId.

The modal renders a NextStepsCard that resolves the assigned agency, its SLA, and its contacts from the region config.

Data Model
Firestore collection: reports

ts
{
  category: string                 // 'infrastructure' | 'environment' | 'sanitation' | 'safety'
  title: string
  description: string
  address: string
  area: string
  landmark?: string
  anonymous: boolean
  restricted?: boolean
  userId: string | null            // null when anonymous
  userEmail: string | null         // null when anonymous
  status: 'open' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  mediaUrls?: string[]
  verified: boolean
  lastVerifiedAt: Timestamp | null
  createdAt: Timestamp
  updatedAt: Timestamp
}
Indexes needed:

status (asc) + createdAt (desc)

userId (asc) + createdAt (desc)

category (asc) + createdAt (desc)

area (asc) + createdAt (desc)

verified (asc) + createdAt (desc)

Firestore Security Rules
javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reports/{reportId} {
      allow read: if true;

      allow create: if
        (request.auth != null
          && request.resource.data.userId == request.auth.uid)
        || (request.resource.data.anonymous == true
          && request.resource.data.userId == null);

      allow update: if request.auth != null
        && request.auth.token.email == 'admin@civicwatch.ng';
    }
  }
}
Replace the admin email with your actual NEXT_PUBLIC_ADMIN_EMAIL before publishing.

Seeding Data
A seed script is included to populate Firestore with realistic reports for development.

bash
# Requires a Firebase service account key
npx ts-node scripts/seedReports.ts
The script creates 20 reports, four of which are assigned to a fixed seed email so you can verify the "My Reports" page. See scripts/seedReports.ts for the template list and the TARGET_EMAIL constant.

⚠️ Never deploy a seed endpoint to production. Delete scripts/serviceAccountKey.json after seeding and rotate the service account key if it was exposed.

Accessibility
All interactive elements are proper <button> or <a> elements.

Focus rings are visible via a global :focus-visible rule.

The Stepper announces step changes with aria-live="polite".

Modals use role="dialog" and aria-modal="true".

Reduced-motion is respected via a global prefers-reduced-motion rule.

Contrast is verified for both themes against WCAG AA.

Category cards use role="radio" and aria-checked when selected.

Low-Bandwidth Considerations
Images are compressed client-side (lib/imageCompressor.ts) before upload.

EXIF metadata is stripped client-side (lib/metadata.ts) before upload.

The offline banner (components/offlineBanner) is a sticky status indicator.

Drafts persist to localStorage, so an interrupted session survives a lost connection.

The navbar exposes a low-tech search input that submits on Enter without a heavy JS search UI.

Privacy & Security
Anonymous reports never carry userId or userEmail.

Restricted categories are enforced to anonymous both client-side and by Firestore rules.

EXIF stripping removes GPS coordinates, camera model, and timestamps from photos.

Firestore rules restrict updates to the admin email only.

The admin sign-in flow immediately signs out any user who authenticates with a non-admin email.

Media uploads should be paired with a storage rule restricting writes to authenticated users.

Scripts
Command	Description
npm run dev	Start the Next.js dev server
npm run build	Production build
npm run start	Start the production server
npm run lint	Run ESLint
npx ts-node scripts/seedReports.ts	Seed Firestore with sample reports
Roadmap
□ Server-side rendering for the civic issues feed to remove the Firestore client query
□ Push notifications when a report's status changes
□ USSD/SMS fallback for feature phones
□ Community-contributed translations with an admin review queue
□ Escalation workflow that routes stale reports to the next-tier authority
□ Public agency response-time leaderboard backed by live Firestore data
□ Region picker for multi-state deployment
□ Offline queue with automatic retry on reconnect
□ Optional email digest for users who file multiple reports
□ Account deletion flow that scrubs personal data from reports