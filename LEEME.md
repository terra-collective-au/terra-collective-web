# Terra Collective · Página web

La página de inicio de Terra: probador virtual, prendas del rack, cómo consignar, próximo showroom y newsletter. Textos en inglés australiano.

## Cómo abrirla

Descomprime la carpeta y haz doble clic en `index.html`. Funciona en computador y celular.

## Qué cambiar antes de publicar

Todo está en un solo archivo: `js/data.js`. Ahí se reemplazan las marcas que dicen:

- `[PRICE]` y `[SIZE]`: precio y talla de cada prenda.
- `[BRAND]`: la marca del top tejido.
- `[TIME]`: la hora del showroom del 5 de diciembre.

## Importante sobre las fotos

Las fotos de la modelo y de las prendas son de muestra, generadas con IA. Cuando tengan las fotos reales del inventario, se cambian en `assets/`.

## Lo que todavía es de muestra

- La bolsa de compra y los favoritos funcionan solo en pantalla: no hay pago todavía.
- El formulario de newsletter no guarda correos: falta conectarlo a una herramienta de correo.
- Los botones "Apply to consign" y "Read the consignment policies" todavía no llevan a ningún lado: falta el link al formulario y a las políticas.
