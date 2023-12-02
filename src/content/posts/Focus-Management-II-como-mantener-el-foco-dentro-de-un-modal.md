---
title: 'Focus Management II: como mantener el foco dentro de un modal'
tags:
  - accessibility
  - react
  - javascript
posted: 2023-12-02T03:00:00.000Z
---

Primero que nada, ¡MUCHAS GRACIAS POR LEER MI POST ANTERIOR! Me siento muy contenta y orgullosa de la repercusión positiva que tuvo.

Ahora sí, podemos proceder con la continuación de mi primer post sobre el manejo del foco en nuestras aplicaciones. Ya aprendimos cómo se debe comportar el foco cuando se abre y se cierra un modal, cómo crear con un modal accesible con reactPortal, por qué esto es importante para los usuarios que navegan a través del teclado o tecnologías asistivas y a qué criterios de accesibilidad corresponden estás mejoras. Si no pudiste leerlo, te lo comparto nuevamente en el siguiente link: [https://www.micaavigliano.com/es/blog/Focus-Management-Como-mejorar-la-accesibilidad-y-usabilidad-de-nuestros-componentes](https://dev.to/micaavigliano/focus-management-como-mejorar-la-accesibilidad-y-usabilidad-de-nuestros-componentes-50nb), y para acceder al ejemplo productivo en el siguiente link: [https://focus-management.vercel.app/](https://focus-management.vercel.app/). Allí podrán encontrar la primera parte de la explicación.

En este capítulo vamos a aprender cómo mantener o atrapar el foco dentro de un modal. Esta practica esta ligada al criterio [2.1.2 (No keyboard trap)](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html) que habla que todos nuestros componentes deben poder ser navegados enteramente con el teclado y, por ende, disponer de una vía de escape también con el teclado. Volveré a retomar el concepto de "vías de escape" más adelante.

¿Cuáles son los comandos que sirven para navegar con teclado por un modal?

* tecla Tab: moverse hacía adelante entre los elementos interactivos
* teclas Shift + Tab: moverse hacía atrás entre los elementos interactivos
* tecla Esc: vía de escape para cerrar el modal

Recordemos que tener un buen manejo del foco también mejorará la interacción de las tecnologías asistivas con nuestros componentes.

¡Desglosemos el código!

1\) Creamos una referencia del modal para poder manipular el DOM

```javascript
const modalRef = useRef < HTMLDialogElement > (null);
```

```javascript
<dialog ref={modalRef} aria-labelledby="modal-id" aria-modal={true}>
  <div className="container-modal" onKeyUp={onKeyDown} tabIndex={-1}>
    <div className="container-info">
      <h2 className="title-modal" id="modal-id">
        {title}
      </h2>
      <button
        onClick={onClose}
        className="btn-modal"
        aria-label="close modal"
      >
        x
      </button>
    </div>
    <div className="children-container">{children}</div>
  </div>
</dialog>
```

3\) Vamos a necesitar generar una relación entre el dialog con el title. Para esto utilizamos aria-labelledby esto nos permite proveerle un nombre accesible a nuestro modal para que las tecnologías asistivas. Esto mismo se podría lograr utilizando un aria-label, pero como en este caso ya tenemos un elemento title nos conviene utilizar el recurso de aria-labelledby para evitar redundancias.

4\) Creamos la función handleFocus

```javascript
const handleFocus = (event: KeyboardEvent) => {
  const refElement = modalRef?.current;

  if (refElement) {
    const focusableElem = Array.from(
      refElement.querySelectorAll < HTMLElement > (
        'a, button, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled")) as HTMLElement[];

    const firstFocusableElem = focusableElem[0];
    const lastFocusableElem = focusableElem[focusableElem.length - 1];
    const isTabPressed = event.key === "Tab";

    if (!isTabPressed) {
      return;
    }

    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElem) {
        lastFocusableElem.focus();
        event.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElem) {
      firstFocusableElem.focus();
      event.preventDefault();
    }
  }
};
```

* si modalRef.current existe, vamos a generar un array de elementos interactivos. Vamos a filtrar que no ninguno contiene el atributo disabled.
* luego, vamos a guardar el primer elemento interactivo en una constante y el último elemento interactivo en otra.
* Por último, en otra constante chequeamos si la tecla Tab fue presionada o no. Esto devuelve un booleano. Si devuelve false, se termina la función. Si devuelve, true la función sigue su curso.
* Si la función sigue, primero vamos a chequear si el evento fue presionado junto a la tecla Shift. Si esta validación es correcta vamos a chequear si el elemento activo es el primer elemento interactivo (recordemos que la combinación Shift + Tab vamos a ir al elemento anterior) vamos a ir al último elemento interactivo. Si el evento no fue presionado junto a la tecla Shift y el elemento interactivo es el último, el primer elemento interactivo en el array va a ser el que reciba foco.

5\) El último paso es crear un useEffect que se ejecutará luego de la primera renderización y va a chequear si nuestra referencia existe y si esta existe se agrega un event listener para el evento keydown en el elemento modal. Cuando ocurre un evento keydown en este elemento, se llamará a la función handleFocus. Por último, se ejecuta el cleanup para poder eliminar el event listener cuando se desmonta el componente o se vuelve a ejecutar la función.

Ya con estos pasos estamos en condiciones de poder utilizar nuestro focus trap y hacer nuestros modales 100% accesibles e interactivos.

Espero que les haya servido y como siempre me pueden contactar por cualquier medio si tienen consultas o dudas. También me gustaría si me pueden dejar en los comentarios temas que les gustaría que toquemos más adelante sobre accesibilidad y desarrollo.

Linkedin: [https://www.linkedin.com/in/micaelaavigliano/](https://www.linkedin.com/in/micaelaavigliano/)
Github: [https://github.com/micaavigliano](https://github.com/micaavigliano)
Twitter: [https://twitter.com/messycatx](https://twitter.com/messycatx)

Gracias por llegar hasta acá!!!🫰
