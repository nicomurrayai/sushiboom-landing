# Unificacion del formulario de franquicias

## Objetivo

Unificar la experiencia de consulta por franquicias de SushiBoom, GreenBoom y WrapBoom tomando la estructura visual de SushiBoom como referencia, sin modificar la logica de envio, los endpoints, los payloads ni las validaciones existentes de cada marca.

## Diseno aprobado

- El formulario se presenta como una seccion dedicada exclusivamente a franquicias.
- Se conserva la estructura responsive de dos columnas en desktop y una columna en mobile.
- Cada marca mantiene sus colores, tipografias, superficies y acentos visuales.
- Se conservan los campos y requisitos actuales de cada implementacion.
- El campo Consulta solicita explicitamente la ubicacion de interes en su placeholder.
- Los estados de envio, exito y error permanecen visibles y accesibles.
- El navbar desktop y el menu mobile muestran un enlace `Franquicias` que lleva directamente al formulario.
- Cualquier bloque promocional intermedio deja de ser el destino principal de navegacion para evitar pasos innecesarios.

## Flujo de datos

Cada formulario conserva sin cambios su handler de envio, endpoint, payload, identificador de marca, origen, honeypot y manejo de errores. Los cambios se limitan al contenido, estructura y clases visuales del formulario y de su seccion contenedora.

## Verificacion

- Ejecutar lint y build en las tres aplicaciones.
- Verificar el ancla desde navbar desktop y menu mobile.
- Revisar el layout y la legibilidad en viewport desktop y mobile.
- Confirmar que los campos requeridos, estados y payloads no hayan cambiado.
