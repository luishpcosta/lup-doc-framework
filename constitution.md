# Project Constitution

Non-negotiable principles for this repository. Plans and code must comply; conflicts are escalated to a human, never overridden silently.

This is a **Docusaurus documentation site** (`lup-doc-framework`): the home page and docs content follow the visual system defined in `framework-hibrido.html` (registros "papel"/executivo e "blueprint"/técnico, paleta bordô/areia, tipografia Archivo/Inter/IBM Plex Mono).

## Principles

1. **Spec before code** — No implementation begins before its feature has an approved spec and passes the Tasks gate.
2. **Every behavior is traceable** — Each acceptance criterion maps to a task and to verification evidence.
3. **Verification is mandatory** — A feature is done only when its acceptance criteria are proven by automated checks (or explicitly recorded manual evidence).
4. **Small, reversible steps** — One feature and one task at a time; keep the repo restartable.
5. **Design system fidelity** — New pages/components reuse the tokens in `src/css/custom.css` (colors, fonts, `[data-theme='dark']` mapping). Don't hardcode colors/fonts that duplicate an existing token.

## Technical Constraints

- **Language / stack**: TypeScript + React 19 on Docusaurus 3.10 (classic preset). Content in `docs/` and `blog/` is MDX; pages/components in `src/` are `.tsx` with CSS Modules.
- **Test framework**: none — this is a content site, not an application with business logic. `npm run build` *is* the regression test: it compiles every `.tsx`/`.mdx` file, and `onBrokenLinks: 'throw'` in `docusaurus.config.ts` fails the build on any broken internal link or anchor. If a feature introduces real logic (a custom plugin, a client-side script with branching behavior), add a Vitest/Jest suite for that unit at that time — don't add a test runner speculatively.
- **Style / lint**: `npm run typecheck` (`tsc --noEmit` via the Docusaurus TS config) must pass with zero errors. No ESLint is configured; don't add one without an explicit decision recorded here.
- **Architecture boundaries**: Site chrome/config lives in `docusaurus.config.ts` and `sidebars.ts`. Visual identity (colors, fonts, dark-mode mapping) lives only in `src/css/custom.css` — page-level CSS Modules (e.g. `src/pages/index.module.css`) may only reference those custom properties, never redefine the palette.

## Quality Bar

- Verification command(s) that must pass: `npm run typecheck` then `npm run build` (both wired into `./init.sh`).
- Before considering any UI change done: run `npm run build`, then manually check the page in a browser (light **and** dark mode) — `npm run serve` after `build`, or `npm start` for the dev server.
- Coverage / review expectations: no numeric coverage target (no test runner); the bar is "build passes, typecheck passes, broken-link check passes, and the change was visually verified in both color modes."

## Amendments

Changing this constitution requires an explicit decision recorded in `progress.md` (date, rationale, who approved).
