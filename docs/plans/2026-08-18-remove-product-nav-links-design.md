# Eliminacion de links de productos del navbar

## Objetivo

Eliminar del navbar los accesos relacionados con menu o productos en desktop y mobile, sin modificar el catalogo, las secciones de contenido ni sus CTAs.

## Implementacion

- Quitar la entrada `Menu` o `Productos` desde `siteConfig.nav.links`.
- Eliminar junto con ella cualquier submenu de categorias asociado.
- Mantener sin cambios los componentes de navbar, ya que ambas variantes consumen la misma configuracion.
- No modificar rutas, datos, backend ni enlaces internos fuera del navbar.

## Verificacion

- Confirmar que el enlace no aparezca en desktop ni mobile.
- Ejecutar lint dirigido y build de produccion.
