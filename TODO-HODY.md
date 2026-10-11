# TODO(hody)

Placeholders that still need real content. Search the code for `TODO(hody)`.

| What | Where |
|---|---|
| Founder photo. Put it under `public/static/images/` and set `founder.photo`. Until then the avatar shows the initials "HN". | `data/home.tsx` (`founder.photo`) |
| Founder LinkedIn URL. The link is hidden until it is set. | `data/home.tsx` (`founder.linkedin`) |
| Real, approved testimonials or case studies. Then set `flags.showProof: true`. | `data/home.tsx` (`proof.items`), `data/config.tsx` (`flags.showProof`) |
| Replace privacy policy and terms with reviewed legal text (pages show a warning banner until then) | `data/legal.ts` |
| Formspree endpoint: set `NEXT_PUBLIC_FORM_ENDPOINT` on Vercel, redeploy, then test the endpoint path (success + error). | Vercel env vars |

## Environment variables (Vercel → Settings → Environment Variables)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | Formspree-compatible endpoint for the pilot form. Unset → form opens a prefilled email to contact@coregy.com.vn. |
| `NEXT_PUBLIC_BOOKING_URL` | Optional calendar link, shown as "Or pick a time directly". |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional, e.g. `coregy.com.vn`. Enables Plausible and the custom events `cta_book_pilot_click`, `solution_card_click`, `pilot_form_submit`. Add these as goals in Plausible. |

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.
