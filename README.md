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

- [x] Componente de `Sign In`.
  - [x] UI.
  - [x] Lógica.
  - [x] Manejar inicio de sesión inválido.
  - [x] Manejar validación de campos.
- [x] Componente de `Sign Up`.
  - [x] UI.
  - [x] Lógica.
  - [x] Manejar inicio de sesión inválido.
  - [x] Manejar validación de campos.

- [x] `Guard` privado y público.
  - [x] Configuración del `guard`.
  - [x] Configuración de las rutas. En mi caso, al ser una app basada en módulo, y no en componentes *standalone*, estoy teniendo problemas con el tema de la carga perezosa. Parece funcionar el tema de las rutas hijas, pero no sé si la carga está siendo del todo perezosa.

- [x] Layout para la parte privada.

- [x] Componente de `New Goal`.
  - [x] UI.
  - [x] Lógica.
  - La lógica de validación para las fechas, que sean correctas, que no esté una sobre la otra, incluso que sean requeridas, cuando tenemos el parámetro de `pristine`, se vuelve complicada.

- [x] Componente de `Goals list`.
  - [x] UI.
  - [x] Lógica.

- [x] Componente de `Goal detail`.
  - [x] UI.
  - [x] Lógica.

- [x] Módulo de `Activity form`.
  - [x] Componente de formulario.
  - [x] Utilizar el servicio de goal o crear uno específico.
  - [x] Lógica. <span style="background-color: red; padding: 1px 3px; border-radius: 3px">Aún así habría que revisarlo</span>

- [x] Sistema de notificaciones/toaster.
  - [x] Servicio.
  - [x] Componente/UI.
  - [x] Implementación.

- [x] Ventana de diálogo para acciones.
  - [x] Servicio.
  - [x] Componente/UI.
  - [x] Implementación.

- [x] Página de perfil.
  - [x] Componente/UI.
  - [x] Lógica.

- Mobile Responsive.
  - [ ] Goal List.
  - [ ] New Goal.
  - [x] Goal Details.
  - [ ] New Activity.
  - [ ] Navbar.
  - [ ] Sign In.
  - [ ] Sign Up.

## Tareas generales:
- [ ] Comprobar si las actividades de los objetivos se muestran en orden.
- [x] Corrección del posicionamiento de elementos en la UI.
- [ ] Mejora del navbar (UI)
- [ ] Manejar errores de NO CONEXIÓN con Firestore.
- [x] Corrección del campo "description" en la verificación.
- [x] Corrección del control de fechas. La entrada de una fecha de inicio condiciona la fecha de final y viceversa. <span style="background-color: blue; padding: 1px 3px; border-radius: 3px">Tiene una lógica un poco compleja. Habría que revisarla y simplificarla lo máximo posible.</span>