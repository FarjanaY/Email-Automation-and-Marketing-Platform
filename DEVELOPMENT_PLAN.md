# Development Plan — User Side & Admin Side

Detailed, step-by-step plan for every feature area, based on the current codebase (backend Express/Mongoose + frontend React/Redux Toolkit). Each section covers: current status, what needs to be built, how to build it (concrete technical steps using the patterns already established in this codebase), and a checklist.

**Conventions already established in this codebase — reuse them everywhere below:**

- Backend: Express router → middleware chain (`refreshTokeGenerate` → `checkLogin` → role/ownership guard → validators → `runValidations` → controller) → controller uses `findDataById` helper + `http-errors` (`createError`) → central `errorHandler` middleware formats all error responses.
- Auth guards: `checkedRole("admin")` for admin-only routes, `isAccOwner` for self-only routes.
- File uploads: `profileImageFolder` + `singleFileUpload`/`multipleFileUpload` middleware, built on `helper/fileUploader.js`.
- Frontend: one Redux Toolkit slice per resource (`createAsyncThunk` per operation, `extraReducers` for pending/fulfilled/rejected), a matching `xDataFromAPI.jsx` file of thin axios wrappers (always `return res.data`), pages dispatch thunks and read from `useSelector`.
- Destructive actions: reuse `AreYouSureModal.jsx` for confirmation (already used for delete-account, ban/unban).
- Buttons: reuse `gn-button-shadow` / `delete-button-shadow` / `cancel-button-shadow` classes from `index.css`.

---

# USER SIDE

## 1. Authentication — mostly done, polish remaining

**Status:** Registration + activation, login/logout, forgot/reset password, profile edit/delete all work end to end.

**Remaining work:**

- Fix `resetPasswordAPI`'s `.data`-before-`await` bug (breaks reset-password silently).
- Add a real success/redirect state to `ResetPasswordPage.jsx` (currently no feedback after a successful reset).
- Fix copy on `ResetPasswordPage.jsx` (still shows ForgotPassword's text).
- Bring `RegistrationPage.jsx`'s layout in line with the other three auth pages (centering fix).

### Checklist

- [ ] Fix `resetPasswordAPI` in `authDataFromAPI.jsx`
- [ ] Add success/redirect phase to `ResetPasswordPage.jsx`
- [ ] Fix `ResetPasswordPage.jsx` copy
- [ ] Fix `RegistrationPage.jsx` centering to match Login/Forgot/Reset

---

## 2. Dashboard (HomePage)

**Status:** Placeholder (Lorem Ipsum).

**What it should show:** a logged-in user's landing page — quick stats relevant to _them_ (their forms, their subscriber count, recent campaign activity), not admin-wide data (that's the Admin Dashboard, §Admin 2).

**How to build it:**

1. Backend: once Subscriber Management (§5) and Campaigns (§6) exist, add a lightweight `GET /api/dashboard/summary` endpoint (new `dashboardController.js` + `dashboardRouter.js`) that aggregates counts scoped to `req.user.userId` (e.g. `Form.countDocuments({createdBy: userId})`, `Subscriber.countDocuments({userId})`, `Campaign.find({createdBy: userId}).sort({createdAt:-1}).limit(5)`).
2. Frontend: new `features/dashboard/dashboardSlice.jsx` with one thunk (`getDashboardSummary`), and rebuild `HomePage.jsx` as a grid of stat cards (reuse the `dropdown-menu-box-shadow` card styling already used on Profile pages) + a small "recent campaigns" list.
3. This is naturally the _last_ piece to build for real, since it has nothing meaningful to show until Forms/Subscribers/Campaigns exist — build a static/placeholder version now if you want the shell in place, but wire it to real data only after §5–§6 exist.

### Checklist

- [ ] `GET /api/dashboard/summary` endpoint (after Subscribers + Campaigns exist)
- [ ] `dashboardSlice.jsx` + `dashboardDataFromAPI.jsx`
- [ ] Rebuild `HomePage.jsx` with real stat cards

---

## 3. Form Builder

**Status:** `formSchema.js` model exists (formTitle, description, urlName, createdBy, fields[], isPublished, totalSubmissions, publicUrl) with slug/nanoid generation logic already designed in. Zero controllers/routes/UI.

**What "fields[]" supports per the schema:** each field has `id, type, label, placeholder, required, defaultValue, options, order` — so the builder needs to support at minimum text/email/phone/select/checkbox-style field types (whatever `type` enum you settle on).

**How to build it:**

1. **Backend model check** — confirm/extend `formSchema.js`'s `fields` sub-schema `type` enum to cover what you actually want to offer (e.g. `["text","email","phone","textarea","select","checkbox","radio"]`).
2. **Backend — `formController.js` + `formRouter.js`** (new files), mounted at `/api/forms`:
   - `POST /api/forms` — create a form (`checkLogin` required; `createdBy: req.user.userId`). Auto-generate `urlName`/`publicUrl` via the slugify+nanoid logic already sketched in the schema comments.
   - `GET /api/forms` — list the logged-in user's own forms (`Form.find({createdBy: req.user.userId})`).
   - `GET /api/forms/:id` — get one form (owner-only, reuse an `isFormOwner`-style guard mirroring `isAccOwner`'s pattern).
   - `PUT /api/forms/:id` — update title/description/fields/isPublished (owner-only).
   - `DELETE /api/forms/:id` — delete a form (owner-only). Consider: cascade-delete or just orphan its Subscribers? (Recommend: keep subscribers, just null out `formId` or leave as historical record — deleting subscriber data because a form got deleted is usually not what you want.)
3. **Frontend — `features/forms/formSlice.jsx`** with thunks for the 4 CRUD ops above, plus `formDataFromAPI.jsx`.
4. **Frontend — pages:**
   - `FormsListPage.jsx` — table of the user's forms (mirror `AllUsersPage.jsx`'s table+pagination pattern), with Create/Edit/Delete/Publish-toggle actions, `AreYouSureModal` for delete.
   - `FormBuilderPage.jsx` — the actual builder: a left panel of "add field" buttons (one per field type), a center canvas showing the field list in order (drag-to-reorder is a nice-to-have, not required for v1 — up/down arrow buttons are a fine v1 substitute), and a right/inline panel to edit the selected field's label/placeholder/required/options.
   - Route these under the existing `ProtectedRoute` group in `App.jsx` (e.g. `/forms`, `/forms/:id/edit`).
5. Keep the builder's local editing state in the page (a `fields` array in `useState`), and only `PUT` the whole form to the backend on explicit Save — don't autosave every keystroke.

### Checklist

- [ ] Finalize `fields[].type` enum in `formSchema.js`
- [ ] `formController.js` (create/list/get/update/delete)
- [ ] `formRouter.js` mounted at `/api/forms`, owner-only guard
- [ ] `formSlice.jsx` + `formDataFromAPI.jsx`
- [ ] `FormsListPage.jsx` (list + create + delete + publish toggle)
- [ ] `FormBuilderPage.jsx` (add/edit/remove/reorder fields, save)
- [ ] Routes added to `App.jsx` under `ProtectedRoute`

---

## 4. Form Submission (public-facing)

**Status:** Not started. Depends on §3 existing first.

**How to build it:**

1. **Backend — public endpoint**, no auth required: `GET /api/public/forms/:publicUrl` (fetch the published form's field definitions to render) and `POST /api/public/forms/:publicUrl/submit` (accept submission data). New `publicFormController.js` + `publicFormRouter.js`, mounted at `/api/public/forms` in `app.js` — deliberately outside the authenticated `/api` namespace pattern, or just without the auth middleware chain.
2. **Submission handling:** on `POST`, validate the incoming data against the form's `fields[]` (required fields present, basic type checks), then create a `Subscriber` document (`formId`, and map submitted fields into `name`/`email`/`phone`/`customFields` as appropriate), and `$inc` the form's `totalSubmissions`.
3. **Rate-limit this endpoint specifically** (`express-rate-limit`, already a dependency) — it's the one truly public-facing write endpoint in the whole app, and therefore the most exposed to spam/abuse.
4. **Frontend — `PublicFormPage.jsx`**, a new _public_ route (add to the `PublicRoute` group or better, a third route group with no auth check at all, since `PublicRoute` currently means "guests only, redirect if logged in" — a public form should be visible to logged-in and logged-out visitors alike). Route like `/f/:publicUrl`. Renders the form's fields dynamically based on `type`, submits via a simple `axios.post` (doesn't need Redux — this page is a one-shot, unauthenticated, standalone flow), shows a thank-you state on success.

### Checklist

- [ ] `publicFormController.js` + `publicFormRouter.js` (get form by publicUrl, submit)
- [ ] Submission → creates `Subscriber` doc, increments `totalSubmissions`
- [ ] Rate limiting on the submit endpoint
- [ ] New unauthenticated route group in `App.jsx` (not `PublicRoute`, not `ProtectedRoute`)
- [ ] `PublicFormPage.jsx` — dynamic field rendering + submit + thank-you state

---

## 5. Subscriber Management

**Status:** `subscriberSchema.js` exists (formId, userId, name, email, phone, status enum, tags[], notes[], customFields Map). Zero controllers/routes/UI. **This is the foundational piece everything else (Campaigns, CRM, Analytics) depends on — prioritize this early.**

**How to build it:**

1. **Backend — `subscriberController.js` + `subscriberRouter.js`**, mounted at `/api/subscribers`, all routes scoped to `req.user.userId` (a user only sees/manages their own subscribers):
   - `POST /api/subscribers` — manually add one subscriber.
   - `GET /api/subscribers` — paginated/searchable list (mirror `getAllUsers`'s pagination pattern exactly — same query params: `page`, `limit`, `search`).
   - `GET /api/subscribers/:id` — one subscriber's full detail (include their `notes[]` and eventually their `Activity` history, once §7 exists).
   - `PUT /api/subscribers/:id` — update fields, change `status`, add a tag, add a note.
   - `DELETE /api/subscribers/:id` — remove a subscriber.
   - Consider a `POST /api/subscribers/import` (CSV) as a fast-follow, not required for v1.
2. **Frontend — `features/subscribers/subscriberSlice.jsx`** (mirror `userSlice.jsx`'s shape closely — you already have a proven pattern for list+pagination+CRUD+ban-style status-change actions) + `subscriberDataFromAPI.jsx`.
3. **Frontend — pages:**
   - `SubscribersListPage.jsx` — table (name/email/phone/status/tags), search + pagination (reuse `Search.jsx`/`SearchUsers.jsx` pattern — **remember the `useCallback` fix** for the `onSearch` prop so you don't reintroduce the infinite-refetch bug), status filter dropdown, row actions (edit/delete via `AreYouSureModal`).
   - `SubscriberDetailPage.jsx` — full profile: contact info, status (as an editable dropdown matching the enum), tags (add/remove chips), notes (append-only list), and eventually the CRM activity timeline (§7).
4. Add routes under `ProtectedRoute` in `App.jsx` (e.g. `/subscribers`, `/subscribers/:id`).

### Checklist

- [ ] `subscriberController.js` (create/list/get/update/delete, scoped to owner)
- [ ] `subscriberRouter.js` mounted at `/api/subscribers`
- [ ] `subscriberSlice.jsx` + `subscriberDataFromAPI.jsx`
- [ ] `SubscribersListPage.jsx` (search + pagination + status filter + delete)
- [ ] `SubscriberDetailPage.jsx` (edit fields, status, tags, notes)
- [ ] Routes added to `App.jsx`

---

## 6. Email Automation (Templates + Campaigns)

**Status:** `emailTemplateSchema.js` (createdBy, name, subject, html) and `campaignSchema.js` (createdBy, subject, content, subscriberCount, sentCount, status enum, scheduledAt, sentAt) both exist. Zero controllers/routes/UI. **Depends on §1's SMTP settings actually being fixed and wired up, and §5's subscribers existing to send to.**

**How to build it, in two stages:**

**Stage A — Templates** (simpler, do first):

1. `emailTemplateController.js` + `emailTemplateRouter.js` at `/api/templates` — standard CRUD, owner-scoped.
2. Frontend `templateSlice.jsx` + `TemplatesListPage.jsx` + `TemplateEditorPage.jsx`. For v1, a plain `<textarea>` for HTML (or a simple rich-text editor library if you want polish) is enough — a full drag-and-drop email builder is a large project on its own, don't start there.

**Stage B — Campaigns** (the real feature):

1. `campaignController.js` + `campaignRouter.js` at `/api/campaigns`:
   - `POST /api/campaigns` — create as `draft`, with `subject`/`content` (or a reference to a template).
   - `GET /api/campaigns`, `GET /api/campaigns/:id` — list/detail, owner-scoped.
   - `PUT /api/campaigns/:id` — edit while still `draft`.
   - `POST /api/campaigns/:id/send` — the actual send action: looks up the user's subscribers (optionally filtered by `status`/`tags`), loops through them sending via the fixed SMTP-settings-backed mailer, sets `sentCount`/`sentAt`/`status: "sent"`.
   - For anything beyond "send right now," add `scheduledAt` handling via a simple cron-style job (e.g. `node-cron`, a new dependency) that polls for `status: "scheduled"` campaigns whose `scheduledAt` has passed.
2. **Important:** sending to N subscribers in a request/response cycle doesn't scale past a small N — even for v1, send emails in a loop with a small delay/batch (most SMTP providers rate-limit), and make the send endpoint return immediately ("queued") while sending happens in the background, rather than holding the HTTP request open until all emails are sent. A simple in-process async loop (fire the response, then keep sending) is enough for v1; a real job queue (BullMQ + Redis) is the correct answer once volume grows.
3. Frontend `campaignSlice.jsx` + `CampaignsListPage.jsx` (draft/scheduled/sent tabs) + `CampaignComposePage.jsx` (pick/write subject+content, pick recipient filter, Save Draft / Send Now / Schedule buttons).

### Checklist

- [ ] Templates: controller/router/slice/pages (CRUD)
- [ ] Campaigns: controller/router at `/api/campaigns`
- [ ] `POST /api/campaigns/:id/send` — sends via the fixed SMTP settings, updates `sentCount`/`status`
- [ ] Non-blocking send strategy (don't hold the HTTP request open for bulk sends)
- [ ] Scheduled sending (cron-style poller) — can be a fast-follow after "send now" works
- [ ] `campaignSlice.jsx` + `CampaignsListPage.jsx` + `CampaignComposePage.jsx`

---

## 7. Basic CRM

**Status:** `ActivitySchema.js` exists (subscriberId, userId, action, metadata). Zero controllers/routes/UI. Builds directly on §5.

**How to build it:**

1. **Backend** — rather than a dedicated CRUD API, treat `Activity` mostly as a write-only log that other actions append to: when a subscriber's `status` changes (§5's `PUT /api/subscribers/:id`), when a campaign is sent to them (§6), when a note is added — each of those handlers also creates an `Activity` doc (`action: "status_changed"`, `"campaign_sent"`, `"note_added"`, etc. + relevant `metadata`).
2. Add one read endpoint: `GET /api/subscribers/:id/activity` — the timeline for one subscriber, used by `SubscriberDetailPage.jsx`.
3. **Frontend** — an `ActivityTimeline.jsx` component (icon + description + timestamp per entry, reusing `formatCreatedAtDate` from `utils/helper/dateFormatter.jsx`), embedded in `SubscriberDetailPage.jsx`.
4. The subscriber `status` pipeline itself (new → contacted → qualified → customer → lost) is really just the `status` dropdown already planned in §5 — "CRM" here is mostly about visualizing that pipeline (e.g. a simple kanban-style board grouping subscribers by status) rather than needing new data structures.

### Checklist

- [ ] `Activity` docs get created automatically from status changes / campaign sends / notes
- [ ] `GET /api/subscribers/:id/activity` endpoint
- [ ] `ActivityTimeline.jsx` component embedded in subscriber detail
- [ ] (Optional, nice-to-have) Kanban-style pipeline board grouping subscribers by `status`

---

## 8. Payment Gateway

**Status:** Not started — no dependency, code, or route of any kind. **Deliberately last** — build this once there's an actual paid tier/feature to gate (e.g. "campaigns beyond N subscribers require a paid plan"), not before, since the shape of what you're charging for should be settled first.

**How to build it (when ready):**

1. Pick a provider (Stripe is the standard default for SaaS billing — subscriptions, webhooks, hosted checkout are all first-class).
2. Backend: a `paymentController.js`/`paymentRouter.js`, a webhook endpoint (`POST /api/payments/webhook`, **must** use `express.raw()` body parsing for that one route specifically — Stripe signature verification needs the raw body, not JSON-parsed) to receive subscription lifecycle events, and a `User` schema addition (`subscriptionStatus`, `stripeCustomerId`, `plan`, etc.).
3. Frontend: a billing/upgrade page using Stripe's hosted Checkout (simplest, avoids handling card data directly) or Stripe Elements if you want an embedded form.
4. Security note: never trust client-side plan/subscription state for gating access — always check the authoritative `subscriptionStatus` on the backend before allowing a gated action (e.g. before allowing a campaign send past the free-tier subscriber limit).

### Checklist

- [ ] Choose provider (Stripe recommended)
- [ ] `User` schema: subscription/plan fields
- [ ] Webhook endpoint with raw-body parsing + signature verification
- [ ] Backend enforcement of plan limits on gated actions (never client-side only)
- [ ] Frontend billing/upgrade page

---

# ADMIN SIDE

## 1. User Management — mostly done, one feature to finish

**Status:** List (paginated/searchable), Ban, Unban all work. Delete/Edit exist via the self-service endpoints (admins manage their own account the same way).

**Remaining work — Change Role:**

1. Fix `userSlice.jsx`'s `changeRole` thunk to actually call `changeRoleAPI(id, role)` (currently still calls the wrong function).
2. Add the missing `.addCase(changeRole.pending/fulfilled/rejected, ...)` reducer entries (none exist yet).
3. Build the UI: in `AllUsersPage.jsx`, add a role dropdown or a "Promote to Admin" / "Demote to User" button per row, using `AreYouSureModal` for confirmation (role changes are consequential — same treatment as ban/unban).

### Checklist

- [ ] Fix `changeRole` thunk to call `changeRoleAPI(id, role)`
- [ ] Add `changeRole` reducer cases (pending/fulfilled/rejected)
- [ ] Add role-change UI + confirmation modal to `AllUsersPage.jsx`

---

## 2. Admin Analytics

**Status:** Not started at all. **Deliberately built after User-side §5/§6 exist** — there's nothing real to show until subscribers and campaigns exist across the platform.

**How to build it:**

1. **Backend — `analyticsController.js` + `analyticsRouter.js`** at `/api/admin/analytics`, `checkedRole("admin")`-guarded:
   - Platform-wide counts: total users, total subscribers, total campaigns sent, signups-over-time (group by day/week via a Mongo aggregation `$group` on `createdAt`).
   - Keep the first version to simple `countDocuments`/`aggregate` calls — don't reach for a dedicated analytics database or event-tracking pipeline until the platform actually has enough volume to need one.
2. **Frontend — `AdminDashBoard.jsx`** (currently a one-line stub) becomes this page: a row of stat cards (reuse the same card styling as everywhere else) + one or two simple charts (total users over time, campaigns sent over time). A lightweight charting library (e.g. `recharts`, not yet a dependency) is the standard pick for React + Tailwind apps like this one.
3. Route already exists in `App.jsx` under `RoleBasedRouts allowedRoles={["admin"]}` — no routing changes needed, just building out the actual page content.

### Checklist

- [ ] `analyticsController.js` + `analyticsRouter.js` at `/api/admin/analytics`, admin-only
- [ ] Aggregation queries: user count, subscriber count, campaigns sent, signups-over-time
- [ ] Add a charting library (e.g. `recharts`) as a frontend dependency
- [ ] Rebuild `AdminDashBoard.jsx` with real stat cards + charts

---

# Suggested Overall Order

1. **User Side §1 fixes** (auth polish — small, finishes what's in flight)
2. **Admin Side §1** (finish Change Role — small, finishes what's in flight)
3. **User Side §5** (Subscriber Management — foundational, nothing else can be built meaningfully without it)
4. **SMTP settings fixed and wired up** (blocking dependency for §6)
5. **User Side §3 + §4** (Form Builder + public Submission — feeds subscribers in organically)
6. **User Side §6** (Email Automation — the headline feature)
7. **User Side §7** (Basic CRM — builds directly on subscriber + campaign data)
8. **User Side §2 + Admin §2** (Dashboards — now there's real data to show)
9. **User Side §8** (Payments — once there's something worth charging for)
10. **DevOps (Docker/CI)** — whenever manual deployment/testing starts being a bottleneck; can be moved earlier if you need to deploy sooner than this order implies.
