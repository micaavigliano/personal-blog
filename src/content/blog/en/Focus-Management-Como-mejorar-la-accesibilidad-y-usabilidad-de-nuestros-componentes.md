---
title: >-
  Focus Management. Como mejorar la accesibilidad y usabilidad de nuestros
  componentes.
tags:
  - typescript
  - react
  - accessibility
posted: 2023-11-21T03:00:00.000Z
---

Un poco cansada de siempre ver los típicos cursos introductorios sobre accesibilidad decidí comenzar por el final, por lo que voy a hablar sobre Focus Management.

Para comenzar a hablar sobre Focus Management y accesibilidad debemos enfocarnos en la usabilidad de nuestro producto. Uno de los cuatro ejes que nos plantea la [WCAG 2.2](https://www.w3.org/TR/WCAG22/#:~:text=While%20WCAG%202.0%20and%20WCAG,or%20updating%20Web%20accessibility%20policies.) para nuestra aplicación sea accesible es que sea operable. Este principio nos permite pensar en la experiencia de usabilidad de aquellas personas que por alguna razón no utilizan el mouse para navegar por la web. Algunos de los ejemplos de navegación pueden ser: navegar utilizando el teclado o navegar a través de un screen reader o lector de pantalla (NVDA, Jaws, VoiceOver, entre otros).
Los screen readers y el foco funcionan gracias a la API de Accesibilidad que se encuentran en todos los sistemas operativos y en los browsers a través del Document Object Model (DOM). ¿Por qué esto es importante? Porque básicamente se manejan por foco y la tecnología asistiva va a responder de la manera que responde el foco en nuestra web. Algunos ejemplos prácticos puede ser cuando se abre un modal y no se crea un focus trap entonces el usuario pierde el foco y puede prestar a confusiones y frustraciones. Si queres leer más sobre la API de Accesibilidad podes entrar a este link: [https://www.w3.org/TR/core-aam-1.1/#intro\_aapi](https://www.w3.org/TR/core-aam-1.1/#intro_aapi)

Para este post se me ocurrió un caso típico y muy poco abarcado y es ver qué pasa con el foco cuando se abre y se cierra un modal. Voy a codearlo en React con Typescript y explicar paso a paso qué estoy haciendo. Pueden chusmear el código acá [https://github.com/micaavigliano/focus-management](https://github.com/micaavigliano/focus-management) y la aplicación acá [https://focus-management.vercel.app/](https://focus-management.vercel.app/)

¡Manos a la obra!

### useDataFetching hook

Primero vamos a crear nuestro hook para obtener la data de nuestros users (me gusta usar este hook y espero que les sirva para sus proyectos también 🩷)

```javascript
import { useState, useEffect, useCallback } from "react";

const useDataFetching = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState < boolean > (false);
  const [error, setError] = useState < boolean > (false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useDataFetching;

```

### CardContainer.tsx

```javascript
import React from "react";
import useFetch from "../hooks/useFetch";
import Card from "../component/Card";

const CardContainer = () => {
  const { data, loading } = useFetch(
    "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users"
  );

  if (loading)
    return (
      <p role="status">
        Loading...
      </p>
    );

  return (
    <div className="container">
      <Card item={data} />
    </div>
  );
};

export default CardContainer;
```

Acá vamos a importar nuestro useFetch() hook para poder realizar la petición. Un punto importante en nuestro elemento Loading es que vamos a pasarle dos atributos: role y aria-live.
¿Para qué sirven?
El role="status" en este caso sirve para avisarle a la API de Accesibilidad que esa zona de nuestra aplicación es una "zona viva", lo que quiere decir que va a cambiar dependiendo del estado. Esto sirve para que las tecnologías asistivas estén al tanto de estos cambios y los mismos puedan ser anunciados. Por default nos va a traer el atributo aria-live="polite". Este atributo le avisa a la tecnología asistiva que, de manera no intrusiva y apenas tenga el espacio, DEBE anunciar el contenido que se encuentro dentro de la region viva.
Si quieren leer más sobre los diferentes roles que integran las regiones vivas (live regions) pueden hacer en el siguiente link: [https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region)

### &#xA;Component Card.tsx

En Card es donde vamos a ubicar toda nuestra lógica para abrir el modal y manejar el foco cuando lo cerremos.

```javascript
const handleClick = (id: number) => {
  setItemId(id);
  setModalOpen(true);
};
```

La función handleClick nos va a permitir pasarle un id, setearlo en el setItemId y también visuabilizar el modal. ¿Qué es lo que buscamos al guardar el id de cada item en un estado?Nos va a permitir setear el id en nuestro estado y esto nos va a servir para validar que el id del item y el id del estado sea el mismo, si lo es se abre el modal. Esto sirve para validar que cada item tenga su modal único para poder inyectar de manera única la información del item.
Hagan la prueba de no colocar esta validación, van a ver que cada modal que abran van a tener solamente la información del último item en el array.

```javascript
const closeModal = () => {
  setModalOpen(false);
};

```

La función closeModal simplemente va a servir para pasarsela al Modal y poder cerrarlo ya sea presionando esc o clickeando sobre el botón para cerrar el modal.

```javascript
<button
  onClick={() => handleClick(data.id!)}
  data-item-id={data.id}
  aria-label={`more info about ${data.name}`}
  className="more-info"
>
  More info
</button>
{
  modalOpen && itemId === data.id && (
    <Modal
      isOpen={modalOpen}
      title={data.name}
      onClose={closeModal}
    >
      <>
        <div className="modal-content">
          <p>
            Website: <a href={data.website}>{data.website}</a>
          </p>
        </div>
        <div className="desc-container">
          <p>{data.description}</p>
        </div>
      </>
    </Modal>
  )
}

```

Ahora vamos a pasar al useEffect.

```javascript
useEffect(() => {
  if (!modalOpen) {
    const buttonToFocus = document.querySelector(
      `button[data-item-id="${itemId}"]`
    );

    if (buttonToFocus instanceof HTMLElement) {
      buttonToFocus.focus();
    }
  }
}, [modalOpen, itemId]);
```

En este useEffect lo que vamos a chequear es si el modal esta visible o no. Si esta cerrado, lo que va a suceder es que vamos a seleccionar el button según su atributo específico y que el valor de ese atributo coincida con el id que tenemos guardado en nuestro estado button\[data-item-id="${itemId}"], por último, chequea si efectivamente es un button con la validación buttonToFocus instanceof HTMLElement para poder llamar al método focus().

La interacción del foco debería ser: cuando el modal apenas se abre ubicarse en el dialog, luego al cerrarse el modal, el foco debe volver al botón inicial donde abrimos el modal.

### Componente Modal.tsx&#xA;

```javascript
const onKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === "Escape" && onClose) {
    onClose();
  }
};
```

Con la función onKeyDown() escuchamos qué tecla es presionada. Si la tecla en cuestión es "Escape" y la función onClose existe vamos a cerrar el modal. Esta función nos permite ser compliance con la técnica G21 que habla sobre la importancia que los usuarios no queden atrapados en algún lugar de nuestra app y proveerle un mecanismo de escape. Si quieren leer más sobre esta técnica y sobre el criterio 2.1.2 (no keyboard trap) pueden hacerlo en el siguiente link: [https://www.w3.org/TR/WCAG20-TECHS/G21.html](https://www.w3.org/TR/WCAG20-TECHS/G21.html)

Ahora sí, continuamos con nuestro componente Modal.tsx. El modal lo vamos a crear dentro de un createPortal(), mi método proporcionado por React favorito jiji.

¿Para qué sirve createPortal()?
Como comenté anteriormente, createPortal() es un método que proporciona React y sirve para crear portales que se utilizan para renderizar elementos hijos en un nodo del DOM que exista por fuera de la jerarquía principal de componentes. Este método es particularmente útil para la creación de modales, tooltips o cualquier otro componente que no necesite estar constantemente renderizado dentro de la estructura principal de componentes.
createPortal() toma dos argumentos: el elemento a renderizar y el elemento DOM donde se quiere lo quiere inyectar.

* Ejemplo de como se ve la jerarquía principal sin el modal:

![foto de una estructura HTML con su respectiva elemento head y elemento body. Dentro de la etiqueta body se encuentra un elemento div con un id root y dentro del mismo el primer hijo que es otro elemento div con la clase container](/assets/ynvpe6t8byjlodjjf3sw.png)

* Ejemplo de como se ve la jerarquía principal con el modal:[
  ](https://res.cloudinary.com/practicaldev/image/fetch/s--lxuV0EMs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d4i5y27kpjxipo7bb3m7.png)![](/assets/d4i5y27kpjxipo7bb3m7.png)

Para finalizar, \`createPortal()\` mejora la accesibilidad de nuestras aplicaciones ya que le previene a las tecnologías asistivas el tener que anunciar contenido oculto o navegaciones innecesarias en nuestro DOM.

Continuemos con la lógica en nuestro componente Modal. 

```javascript
useEffect(() => {
  if (isOpen) {
    const interactiveElement =
      modalRef.current?.querySelector("[tabindex='-1']");
    if (interactiveElement) {
      if (interactiveElement instanceof HTMLElement) {
        interactiveElement.focus();
      }
    }
  }
}, [isOpen]);
```

Este hook nos va a ayudar a ubicar el foco apenas se abra nuestro modal. En este caso, el primer elemento en recibir foco siempre va a ser nuestro dialog, ya que es necesario para que las tecnologías asistivas puedan anunciar su rol y su título. El anuncio del título se logra generando una relación entre el \`aria-labelledby\` y el \`id\` que le pasamos a nuestro título.

Es sumamente importante tener el control del foco en todos los elementos interactivos para que la interacción y la usabilidad de nuestra aplicación sea aprovechada por todas las personas independientemente de su manera de navegar a través de ella y también para velar por la libre navegación por la web en general.

Con esta última explicación doy por finalizado mi primer posteo de esta saga sobre componentes accesibles. Mi objetivo con esto es visibilizar la accesibilidad y demostrar que nosotros, como desarrolladores frontend, podemos mejorar la experiencia de muchas personas sin que nos represente un esfuerzo extra, simplemente debemos tener las herramientas y la sensibilidad para aprender e incorporar.

Espero que les haya sido de ayuda y cualquier duda, pregunta o sugerencia para mejorar a futuro es bienvenida. Les voy a dejar mis redes sociales donde me pueden contactar por cualquier cosa!

Linkedin: https\://www\.linkedin.com/in/micaelaavigliano/

Github: https\://github.com/micaavigliano

Twitter: https\://twitter.com/messycatx

Gracias por llegar hasta acá!!!🫰
