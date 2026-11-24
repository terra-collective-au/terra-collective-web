/* Terra Collective · website content
   Edit this file to change pieces, prices and showroom details. No code knowledge needed:
   keep the quotes and commas as they are. */

window.TERRA = {
  /* Next showroom. Moved to Saturday 12 December 2026 (Lina, 20 Nov 2026). Time still to confirm. */
  showroom: {
    date: 'Saturday 12 December',
    time: '[TIME]',
    venue: 'The Connection Centre'
  },

  /* Pieces in the fitting room and in "New on the rack".
     slot: top | bottom | dress | outer  (decides how it layers on the model)
     price and size: replace the [PRICE] / [SIZE] markers with real values, e.g. '$45' and 'M'. */
  items: [
    { id: 'cardigan', slot: 'top',    cat: 'Tops',    thumb: 'assets/prendas/cardigan.jpg', brand: 'Sportsgirl', name: 'Striped knit cardigan',     detail: 'Camel and black · tortoiseshell buttons', size: '[SIZE]', price: '[PRICE]' },
    { id: 'top',      slot: 'top',    cat: 'Tops',    thumb: 'assets/prendas/top.jpg',      brand: '[BRAND]',    name: 'Crochet tank top',          detail: 'Red and cream stripes · cropped',          size: '[SIZE]', price: '[PRICE]' },
    { id: 'vestido',  slot: 'dress',  cat: 'Dresses', thumb: 'assets/prendas/vestido.jpg',  brand: 'Rumor',      name: 'Ruched mini dress',         detail: 'Red jersey · blouson sleeves',             size: '[SIZE]', price: '[PRICE]' },
    { id: 'jeans',    slot: 'bottom', cat: 'Jeans',   thumb: 'assets/prendas/jeans.jpg',    brand: 'Cotton On',  name: 'Ripped straight-leg jeans', detail: 'Dark indigo · high rise',                  size: '[SIZE]', price: '[PRICE]' },
    { id: 'blazer',   slot: 'outer',  cat: 'Jackets', thumb: 'assets/prendas/blazer.jpg',   brand: 'Atmos&Here', name: 'Double-breasted blazer',    detail: 'Black · gold buttons',                     size: '[SIZE]', price: '[PRICE]' },
    { id: 'trench',   slot: 'outer',  cat: 'Jackets', thumb: 'assets/prendas/trench.jpg',   brand: 'Primark',    name: 'Trench coat',               detail: 'Beige · double-breasted midi',             size: '[SIZE]', price: '[PRICE]' }
  ],

  categories: ['All', 'Tops', 'Dresses', 'Jeans', 'Jackets'],
  sizes: ['S', 'M', 'L', 'XL'],

  /* What the model wears when nothing is picked */
  basics: { top: 'White tee', bottom: 'Cream trousers' },

  /* One photo per combination: assets/looks/<key>.jpg
     key = t-<top>_b-<bottom>_o-<outer>  or  d-vestido_o-<outer>   (tee + cream + none = base) */
  looksPath: 'assets/looks/'
};
