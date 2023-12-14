---
title: ✨Tabs accesibles✨
tags:
  - accessibility
  - react
  - javascript
posted: 2023-12-13T03:00:00.000Z
---

En este post vamos a aprender cómo hacer Tabs accesibles y reutilizables utilizando React y Javascript. Los tabs van a tener activación automática, es decir, que apenas reciben foco con las arrow keys izquierda y derecha. Para esto, primero tenemos que saber cómo deberían funcionar los tabs para que sean accesibles según [W3](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

Antes de comenzar les comparto el enlace a mi repo de github y al demo de la aplicación para probarla.

Github: [https://github.com/micaavigliano/tab-a11y](https://github.com/micaavigliano/tab-a11y)

Demo: [https://tab-a11y.vercel.app/](https://tab-a11y.vercel.app/)

* Tab: cuando el foco esta en el \`tablist\` ubica el foco en el siguiente elemento interactivo
* Shift + Tab: cuando el foco esta en el \`tablist\` ubica el foco en el elemento interactivo anterior
* Cuando el foco esta en el tablist:

\- Arrow key izquierda: mueve el foco al elemento interactivo anterior. Si el foco esta en el primer elemento interactivo, el foco se ubica en el último tab.

\- Arrow key derecha: mueve el foco al elemento interactivo siguiente. Si el foco esta en el último elemento interactivo, el foco se ubica en el primer tab.

\- Espacio o Enter: activa el tab si no esta activado

\- Home: el foco va al primer tab interactivo

\- End: el foco va al último tab interactivo

Ahora que ya conocemos cómo debe se debe navegar con el teclado vamos a pasar al código y a cómo el screen reader lee este componente.

1\) Primero vamos a crear el componente Tab

```typescript
const Tab: React.FC<ITab> = ({ name, id, setActive, active }) => {
  const btnRef = useRef < HTMLButtonElement | null > (null);


  useEffect(() => {
    if (id === active && btnRef.current) {
      btnRef.current.focus();
    }
  }, [id, active]);


  return (
    <button
      ref={btnRef}
      role="tab"
      type="button"
      id={`tab-${id}`}
      aria-controls={`tabpanel-${id}`}
      className={`${id === active ? "bg-pink-200" : "bg-transparent"
        } py-2 px-4`}
      onClick={() => setActive(id)}
      aria-selected={id === active ? true : false}
    >
      {name}
    </button>
  );
};

```

Desglosemos nuestro componente

\- role="tab": indica que el elemento va a ser un tab

\- aria-controls: propiedad que identifica que este elemento va a controlar

\- aria-selected: estado que se utiliza para saber si un elemento seleccionable está seleccionado o no.

En este componente vamos a crear una referencia del butón para poder ubicar el foco que este activo cuando naveguemos a través del tablist utilizando las arrow keys y el id del tab coincida con la prop active. Esto lo lograremos ya que el \`useRef\` nos permite crear una referencia mutable que persiste durante todo el ciclo de vida de un componente.

2\) Ahora vamos a crear el componente que va a contener al tabpanel

```typescript
const TabPanel: React.FC<ITabPanel> = ({ content, id, active, name }) => {
  return (
    <>
      {id === active && (
        <div
          role="tabpanel"
          className={`w-9/12 border-solid border-2 border-black h-40 text-left p-2 overflow-auto`}
          id={`tabpanel-${id}`}
          aria-labelledby={`tab-${id}`}
          tabIndex={0}
        >
          <h3>{name}</h3>
          {content}
        </div>
      )}
    </>
  );
};

```

desglosemos nuestro \`tabpanel\`

* role="tabpanel": indica que el elemento contenedor es un tabpanel. Se oculta hasta que el \`aria-control\` coincida con su id.
* id={\`tabpanel-${id}\`}: id para poder relacionar el container con el \`aria-control\`
* tabIndex={0}: permite que el tabpanel entré a la secuencia de \`Tab\` de la página y le permite a las tecnologías asistivas poder navegar dentro del tabpanel
* El tabpanel solamente se va a mostrar si el active number y el id coinciden

3\) Ahora sí, vamos a crear nuestro tablist y la funcionalidad para poder navegar

```typescript
const TabList: React.FC<ITablist> = ({ items }) => {
  const [active, setActive] = useState < number > (
    items.length > 0 ? items[0].id : 0
  );
  const tabRef = useRef < HTMLDivElement | null > (null);


  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const focusedElement = document.activeElement as HTMLElement;
      const isButtonFocused = focusedElement?.getAttribute("role") === "tab";
      const isInsideTabPanel = focusedElement?.closest('[role="tabpanel"]');


      if (tabRef.current && isButtonFocused && !isInsideTabPanel) {
        if (event.key === "ArrowRight") {
          setActive((prevIndex) =>
            prevIndex < items.length ? prevIndex + 1 : 1
          );
        } else if (event.key === "ArrowLeft") {
          setActive((prevIndex) =>
            prevIndex > 1 ? prevIndex - 1 : items.length
          );
        } else if (event.key === "Home") {
          setActive(1);
        } else if (event.key === "End") {
          setActive(items.length);
        }
      }
    },
    [items.length]
  );


  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);


    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [items.length, active, handleKeyDown]);


  return (
    <>
      <h1 id="tablist-1" className="pb-12">
        Tabs accesibles
      </h1>
      <div
        role="tablist"
        aria-labelledby="tablist-1"
        className="flex flex-row divide-x divide-solid divide-pink-300"
        ref={tabRef}
      >
        {items.map((item) => (
          <Tab
            id={item.id}
            name={item.name}
            active={active}
            setActive={setActive}
            key={item.id}
          />
        ))}
      </div>
      {items.map((item) => (
        <TabPanel
          content={item.content}
          id={item.id}
          active={active}
          name={item.name}
          key={item.id}
        />
      ))}
    </>
  );
};

```

* Primero vamos a crear un estado active para poder manejar dónde se encuentra nuestro foco activo
* luego, vamos a crear una referencia del tablist con const tabRef = useRef\<HTMLDivElement | null>(null);

para poder menajar el foco. A través de la función handleKeyDown que va a recibir un evento del tipo EventKeyboard para poder controlar el comportamiento de las teclas presionadas. La función handleKeyDown es un callback para guardarla en caché y optimizar el rendimiento, ya que la misma se va a utilizar dentro del useEffect es para poder utilizar los addeventlistener y el cleanup para desmontarlo cuando cambian las dependencias del useEffect. Dentro de la función vamos a tener dos validaciones: isButtonFocused y isInsideTabPanel.

a. Para que estas validaciones funcionen primero tenemos que guardar en una constante el elemento activo de la siguiente manera: const focusedElement = document.activeElement as HTMLElement

b. la validación const isButtonFocused = focusedElement?.getAttribute("role") === "tab"; nos va a devolver true o false si el elemento focuseado contiene el role tab

c. la validación const isInsideTabPanel = focusedElement?.closest('\[role="tabpanel"]'); nos tiene que devolver null porque tenemos que chequear que el foco no se encuentre dentro del tabpanel.

d. en nuestro if vamos a validar: que exista la referencia con el tabRef.current, que isButtonFocused sea true y que isInsideTabPanel sea null. Si se cumplen estás tres condiciones, podemos manejar el foco con las arrow keys izquierda y derecha, home y end.

e. entremos a la función, y nos encontramos con ciertas condiciones si la el event.key es igual a ArrowRight nuestro setActive se va a incrementar, en cambio si el event.key es igual a ArrowLeft nuestro setActive va a decrementar. Ahora, si presionamos la tecla home nuestro foco se va a ubicar en el primer item del array, y si presionamos la tecla end el foco se posicionará en el último item de nuestro array.

Para finalizar con el post me gustaría dejar algunos ejemplos de cómo lee el screen reader VoiceOver nuestro tab.

1\. cuando navegamos en el tablist. Nos va a dar el contexto de la posición que ocupa esa tab en el array de tabs y cuántas en total hay. También gracias a nuestro estado aria-selected la persona usuaria de tecnologías asistivas va a saber si ese tab esta seleccionado o no

![captura de pantalla de como anuncia voiceover. Dice "tab 2, seleccionado, tab 2 de 3"](/assets/080fji5e309h5ku9tbr4.png)

2\. Es importante que nuestro \`tabpanel\` contenga un \`tabindex={0}\` para poder colocarlo dentro de la secuencia de navegación y que las tecnologías asistivas puedan anunciarlos como podemos ver en la captura de pantalla. También recordemos que por este motivo es importante relacionar el \`tab\` con el \`tabpanel\` mediante un \`id\` y un \`aria-labelledby\`.

![captura de pantalla de como anuncia voiceover el tabpanel. En este caso anuncia lo siguiente: "tab 1. tab panel"](/assets/19bnj04s7lqqgrndu6v0.png)

Con esta última explicación doy por finalizada la entrega de entrega de componentes accesibles de esta semana! Recuerden que si tienen alguna duda, consulta o sugerencia me pueden dejar un comentario y mensajito por privado que apenas puedas los contesto todos. Por último, me interesa mucho saber si alguna de estás soluciones les sirvió para su día a día o si alguna vez se encontraron con estos retos de accesibilidad.

También quiero aprovechar y agradecer el apoyo que me dieron y las sugerencias que me dan para poder seguir entregando contenido de calidad. Esta iniciativa no solo nació con la idea de ayudar a otros, sino que también surgió para yo seguir siendo mejor desarrolladora día a día.

Les dejo mis redes sociales por si quieren estar al tanto de las nuevas entregas:

Linkedin: https\://www\.linkedin.com/in/micaelaavigliano/

Github: https\://github.com/micaavigliano

Twitter: https\://twitter.com/messycatx

Muchas gracias por leer la cuarta entrada!🩷
