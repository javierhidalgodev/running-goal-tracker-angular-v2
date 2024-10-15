# RunningGoalTrackerV2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Descripción.

Aplicación web que sirve para el registro de retos de running.
1. Crea una cuenta.
2. Registra tus retos, eligiendo como parámetros:
   - Nombre de la actividad.
   - Descripción.
   - Fecha de inicio.
   - Fecha de finalización.
   - Cantidad de kilómetros a recorrer.

    Además el sistema registrará:
   - Día de registro del reto.
   - Estado como incompleto.
3. Desde la página de tu reto, registra actividades para completarlo. En cada actividad debes indicar:
   - Distancia recorrida.
   - Día de la actividad.

    Además el sistema registrará:
   - Día de registro de la actividad.

Todos los detalles del reto podrán ser consultados en su propia página, desde la cuál también se añadirán/eliminarán las actividades, o se podrá eliminar el propio reto.

Una vez completado el día (en fecha), el sistema te avisará con un mensaje de completado. A partir de entonces ya no se podrán añadir más kilómetros. Tampoco se podrán añadir más kilómetros si la actividad no se ha finalizado, pero está fuera de plazo, dejando el reto incompleto.

En relación con el perfil de usuario, este se registrará con:
1. Nombre de usuario.
2. Email.
3. Contraseña.
4. Fecha de nacimiento (opcional).

Desde la página del perfil, se podrá borrar el mismo.

## Estructura del proyecto.
    - Front End con Angular + Tailwind.
    - Back End con Firebase: auth y firestore.
    - Testing: soon.

## Tareas

- [x] Iniciar proyecto `Angular`.
- [x] Añadir `Tailwind` y configurar.
- [x] Conectar el proyecto con `Firebase` para utilizar la autenticación y la base de datos.
  - [x] Configurar autenticación.
  - [x] Configurar base de datos.
- [x] Environments.

- [ ] Componente de `login`.