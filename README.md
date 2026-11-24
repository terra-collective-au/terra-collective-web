# Terra Collective · Website

Curated consignment in Adelaide. Home page with a virtual fitting room, the rack, how to consign, the next showroom and the newsletter.

Static site: plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run it locally

Double-click `index.html`, or serve the folder:

```
python3 -m http.server 8000
```

## Structure

- `index.html`: page layout
- `css/styles.css`: styles (Terra Visual System: Sand / Terracotta / Earth)
- `js/data.js`: **content to edit**: pieces, prices, sizes, showroom date and time
- `js/app.js`: fitting room, bag, favourites, menu
- `assets/`: logos, piece photos (`prendas/`) and one photo per outfit combination (`looks/`)

## Publish

Works as is on GitHub Pages, Vercel or Netlify (publish the root folder).
