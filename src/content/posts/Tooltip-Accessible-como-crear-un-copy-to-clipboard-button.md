---
title: 'Tooltip Accessible: como crear un copy to clipboard button'
posted: 2024-05-13T03:00:00.000Z
---

En esta ocasión les voy a compartir cómo hacer un tooltip dinámico accesible y cómo utilizar la API clipboard en javascript. Comencemos que la cosa se esta poniendo buena!

repo del proyecto: [https://github.com/micaavigliano/accessible-tooltip](https://github.com/micaavigliano/accessible-tooltip)

link al proyecto: [https://accessible-tooltip.vercel.app/](https://accessible-tooltip.vercel.app/)

Primero y principal vamos a comentar un poco sobre qué es lo que queremos lograr en para que nuestro botón para copiar al portapapeles sea accesible necesitamos:

1\) que el botón reciba foto y tenga un nombre accesible

2\) que el botón para copiar tenga un tooltip que aparezca cuando el usuario hace `hover` sobre el o cuando recibe foco.

3\) que el contenido del tooltip sea dinámico y que a su vez ese contenido sea anunciado por el screen reader cada vez que cambia.

4\) que efectivamente el contenido que queramos copiar se copie en el portapapeles.

5\) el componente para copiar debe ser reutilizable y puede ser un texto estático o un input.

6\) el tooltip debe cerrarse cuando el usuario presiona la tecla `Esc`

Nuestras especificaciones son claras y sencillas. Comencemos a codear.

### Tooltip.tsx

Primero comencemos con nuestro componente reutilizable Tooltip. Este componente va a recibir cuatro props obligatorias las cuales van a ser las siguientes

```javascript
interface TooltipProps {
  text: string;
  children: ReactNode;
  direction: "top" | "bottom" | "left" | "right";
  id: string;
}
```

\- text: va a ser el texto que va a contener nuestro tooltip

\- children: el elemento que va a contener el tooltip

\- direction: para donde queremos que nuestro tooltip vaya

\- id: un id para poder relacionarlo con el aria-describedby que va a tener el \`children\`

comencemos a desglogar el componente:

1\. vamos a necesitar setear un estado para manejar la visualización del tooltip

const \[showTooltip, setShowTooltip] = useState\<boolean>(false);

2\. vamos a crear dos funciones para manejar este estado: tooltipOn y tooltipOff

```javascript
const tooltipOn = () => {
  setShowTooltip(true);
};

const tooltipOff = () => {
  setShowTooltip(false);
};
```

Estas funciones se la vamos a pasar a nuestro elemento contenedor para que muestre el tooltip cuando le hacen hover con la función onMouseEnter, que esconda el tooltip cuando no le hacen hover a ese elemento con onMouseLeave, cuando el elemento reciba foco con onFocus se muestre nuevamente el tooltip y que cuando el foco se vaya de ese elemento el tooltip se esconda también con onBlur.

También para que nuestro tooltip sea 100% funcional y accesible vamos a crear una función para que desaparezca cuando el usuario presiona la tecla Esc

```javascript
const closeTooltip = (ev: KeyboardEvent) => {
  if (ev.key === "Escape") {
    setShowTooltip(false);
  }
};
```

y manejar el evento en un useEffect

```javascript
useEffect(() => {
  document.addEventListener("keydown", closeTooltip);

  return () => {
    document.removeEventListener("keydown", closeTooltip);
  };
}, []);
```

Veamos como va a quedar nuestro componente:

```javascript
<div
  className="relative inline-block justify-center text-center"
  onMouseEnter={tooltipOn}
  onMouseLeave={tooltipOff}
  onFocus={tooltipOn}
  onBlur={tooltipOff}
>
  {showTooltip && (
    <div
      className={`bg-black text-white text-center rounded p-3 absolute z-10 transition-opacity duration-300 ease-in-out w-fit outline outline-offset-0 ${direction === "top"
          ? "bottom-[calc(100%+1px)] left-10 transform translate-x-[-60%] mb-2"
          : ""
        }
          ${direction === "bottom"
          ? "top-[calc(100%+1px)] left-10 transform translate-x-[-60%] mt-2"
          : ""
        }
          ${direction === "left"
          ? "-left-100 top-1/2 transform -translate-y-1/2 mr-2"
          : ""
        }
          ${direction === "right"
          ? "-right-100 top-1/2 transform -translate-y-1/2 ml-2"
          : ""
        }`}
      data-placement={direction}
      role="tooltip"
      id={id}
      style={getTooltipStyle()}
    >
      {text}
    </div>
  )}
  {children}
</div>
```

Para que nuestro Tooltip sea accesible vamos a tener que pasarle una serie de atributos:

1\. role="tooltip": en si no semánticamente no representa un gran cambio, sí lo hace en términos referenciales ya que que ayuda a los lectores de pantalla a identificar y asociar el mensaje emergente con su elemento relacionado. ¿A qué me refiero con esto? Bueno, todo elemento que contenga un role="tooltip" debe estar relacionado con otro elemento que contenga un aria-labelledby (en este caso, el children debe contenerlo). Esto se debe a que el tooltip provee información extra del elemento.

2\. id: id del elemento a relacionar mediante el aria-describedby

3\. data-placement: va a recibir la propiedad direction que va a ser la dirección de nuestro toolip

### CopyToClipboard.tsx

Ahora sí, pasamos a uno de los componentes más divertidos que me haya tocado hacer. No sé porqué, simplemente le tomé mucho cariño.

Comencemos con sus propiedades, en este caso tenemos una opcional y una obligatoria:

```javascript
interface ICopyToClipboard {
  text?: string;
  type: "text" | "input";
}
```

1\. text: texto que va a recibir nuestro componente en caso de ser type text

2\. type: solo puede recibir dos valores o text o input. text va a ser un valor estático mientras que input un valor dinámico

Nuestro botón de copiar en este caso va a estar envuelto en el componente Tooltip. El botón va a tener un atributo onClick que va a recibir la función handleCopyText, de la cual vamos a hablar un poquito más adelante, y el atributo aria-labelledby para poder relacionarlo con nuestro tooltip.

```javascript
<Tooltip text={copyText} direction={"bottom"} id={"copyid"}>
  <button onClick={handleCopyText} aria-labelledby="copyid">
    <ContentCopy />
  </button>
</Tooltip>
```

Pasemos a la función handleCopyText

1\. debemos crear un estado para manejar el texto const \[copyText, setCopyText] = useState\<string>("Copiar al portapapeles");

2\. Para continuar con la función handleCopyText tenemos que entender qué es la API clipboard. La API clipboard nos interactuar con el portapapeles de un sistema operativo. Contiene métodos y funciones para acceder y manipular la información almacenada en el portapapeles (copiar, pegar y cortar). En este caso vamos a ser uso del método writeText(). Este método contiene un parámetro obligatorio de tipo texto y va a devolver una promesa. Si la operación es exitosa, el método then() se ejecutará y cambiará el valor de nuestro estado copyText, luego al cabo de 5 segundos el texto volverá a ser Copiar al portapapeles.

En este caso el parámetro del writeText() va a recibir text O inputValue en caso de alguno ser null va a ir por el siguiente. Esto se debe a que si le pasamos type="input" a nuestro componente no le vamos a pasar por default un texto estático.

```javascript
const handleCopyText = () => {
  navigator.clipboard.writeText(text || inputValue).then(() => {
    setCopyText("Copiado");
    setTimeout(() => {
      setCopyText("Copiar al portapapeles");
    }, 5000);
  });
};
```

Yyy... ¡Listo! Tan simple como eso ya tenemos nuestro botón para copiar text accesible y con un tooltip también accesible. Por último, me gustaría compartirles como el screen reader anuncia el contenido de nuestro tooltip:

1. Estado inicial![Imagen del screen reader voice over anunciando: \&quot;copiar al portapapeles, botón\&quot;](</assets/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_g72frex4p5r5ran3aw2e (1).avif>)
2. Clickeado el botón de copiar

![Imagen del screen reader voice over anunciando: "copiado"](/assets/img2.avif)

3\. Vuelta al valor inicial luego de 5 segundos

![Imagen del screen reader voice over anunciando: "copiar al portapapeles"](/assets/img3.avif)

Ahora sí, espero que hayan disfrutado tanto como yo de este componente y me compartan si alguna vez se toparon con algún tooltip y si pensaron que se podía hacer accesible.
Por último les dejo el listado de recursos que utilicé para obtener información

* MDN web docs tooltips: [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip\_role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)
* MDN web Clipboard API: [https://developer.mozilla.org/es/docs/Web/API/Clipboard\_API](https://developer.mozilla.org/es/docs/Web/API/Clipboard_API)[
  ](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Frtaucy8tkd9h8hy938t1.png)
