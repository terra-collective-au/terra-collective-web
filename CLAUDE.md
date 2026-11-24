# CLAUDE.md · Terra Collective website

Static site, no build. Open `index.html` or serve the folder.

## Files
- `js/data.js`: all editable content (`TERRA.items`, `TERRA.showroom`, categories, sizes). Change content here, not in the markup.
- `js/app.js`: fitting-room logic. Each piece has a `slot` (top, bottom, dress, outer). The outfit key is `t-<top>_b-<bottom>_o-<outer>` or `d-vestido_o-<outer>`; tee + cream + none is `base`. Every key needs a photo at `assets/looks/<key>.jpg` (21 today). Adding a piece means generating its combinations.
- `css/styles.css`: desktop first; tablet at 1080px, phone at 760px (the phone layout follows the original mobile design: photo full width, scrollable category pills, piece carousel with arrows, menu drawer).

## Design rules (Terra Visual System, Sand / Terracotta / Earth)
- Text only in Earth #4B3A2E / Ink #241E1F on Sand #F5EFE7 or Linen #D8C9B7, or Sand on Earth.
- Terracotta #B76E4E and Olive #8A8F72 are surfaces only (dots, badges, bands), never text.
- Playfair Display for headlines, Work Sans for body. Text left aligned.

## Copy
Australian English with contractions (don't, you're, we'll). Brand voice: calm, never pushy (no discount bait in the newsletter).

## Open
Prices, sizes, one brand and the showroom time are `[MARKERS]` in data.js. Photos are AI samples. Bag, newsletter and the consign links are front-end only.
