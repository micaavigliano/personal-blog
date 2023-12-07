---
title: ✨Validación de contraseñas accessible✨
tags:
  - javascript
  - next
  - accessibility
  - react
posted: 2023-12-07T03:00:00.000Z
---

En esta entrada vamos a aprender como hacer una validación de contraseñas accesible.

El repo de Github podes encontrarlo en el siguiente link: [https://github.com/micaavigliano/password-a11y](https://github.com/micaavigliano/password-a11y)

El demo de la applicación podes probarlo en el siguiente link: [https://password-a11y.vercel.app/](https://password-a11y.vercel.app/)

**Primero que nada, debemos crear nuestro input accesible**

```javascript
<form onSubmit={handleSubmit} id="form-id" className="pb-2 pt-6">
  <label htmlFor="password-input-id">Contraseña</label>
  <div
    className="rounded-full border-solid border-2 border-white px-3 py-1 flex flex-row justify-between"
    aria-label="this component include an input and a button to see the password"
  >
    <input
      type={seePassword ? "text" : "password"}
      onChange={(e) => {
        const newPassword = e.target.value;
        if (newPassword !== "") {
          setPassword(newPassword);
        } else if (newPassword === "") {
          setIsDirty(null);
        }
      }}
      placeholder="Escribí tu contraseña"
      autoComplete="new-password"
      className="text-white bg-transparent placeholder:text-slate-400 w-11/12"
      id="password-input-id"
      aria-describedby="password-requirement"
      required
      ref={inputRef}
    />
    <p
      id="password-requirement"
      className="absolute w-1 h-1 -m-1 overflow-hidden clip-hidden"
    >
      tu contraseña debe incluir {passwordRequirements}
    </p>
    <button
      onClick={() => {
        setSeePassword(!seePassword);
      }}
      role="switch"
      aria-checked={seePassword}
      aria-label={
        seePassword ? `esconder contraseña` : `mostrar contraseña`
      }
      className="hover:shadow-lg hover:bg-pink-300 hover:text-black"
    >
      {seePassword ? <VisibilityOff /> : <Visibility />}
    </button>
  </div>
</form>
```

1\) Para que nuestro input sea accesible debemos asociarlo con su label. Para que esto suceda debemos asociar el atributo `htmlFor` con el `id` del input. Al hacer esto, logramos cumplir con cuatro estandares de accesibilidad de la WCAG 2.2:

1\. \[Info and Relationships (nivel A)]\([https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)): se enfoca en asegurar que la información este claramente asociada a su contexto y estructura.

2\. \[Name, Role, Value (nivel A)]\([https://www.w3.org/WAI/WCAG22/Understanding/name-role-value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)): se enfoca que los elementos interactivos tengan nombres descriptivos, roles claros y valores significativos asociados a ellos. Esto ayuda a que las tecnologías asistivas sepan interpretarlos fácilmente.

3\. \[Non-text Content (nivel A)]\([https://www.w3.org/WAI/WCAG22/Understanding/non-text-content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)): se enfoca en proporcionar alternativas textuales a contenido no textual (imagenes, inputs, gráficos, etc). Esto ayuda a que las tecnologías asistivas sepan interpretarlos fácilmente.

4\. \[Labels or Instructions (nivel A)]\([https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions)): se enfoca en asegurar que los formularios y controles interactivos tengan instrucciones claras.

2\) agregar atributo \`autocomplete\` con el valor "new-password" para que el browser sepa que no se debe sugerir ni autocompletar el input con ninguna contraseña previa que el usuario haya utilizado previamente. Por otro lado, también permite notificarle a la tecnología asistiva que utilice el usuario que ese input esta "asegurado"

![Captura de pantalla de un input con el cuadro de texto de voiceover que anuncia "contraseña. Escribí tu contraseña. requerido. asegurado editar texto](/assets/captura1.png)

3\) En este caso, el atributo `type` va a variar entre `text` y `password`. Esto se debe a que vamos a tener un botón para poder visualizar la contraseña. Este mecanismo es de vital importancia en los inputs de contraseña ya que los screen readers NO anuncian la contraseña cuando tienen un `type="password"` pero sí lo hacen cuando tienen un `type="text"`, por este motivo el botón para visualizar la contraseña va a modificar el estado de visualización.

\- ejemplo anuncio con `type="password"`

![Captura de pantalla del anuncio de voiceover donde se lee "estas en este momento en un campo de texto. Para introducir texto en este campo, tipeá. Este es un campo de texto seguro por lo que el contenido no se mostrará ni se anunciará por voiceover"](/assets/captura2.png)

\- ejemplo de anuncio con `type="text"`

![Captura de pantalla del anuncio de voiceover donde se lee "estas en este momento en un campo de texto. Para introducir texto en este campo, tipeá. Presioná Control-Option-Command-Slash para traer más información"](/assets/captura3.png)

**Pasemos a entender la funcionalidad de este input**

1\) Aquí vamos a encontrar el atributo `aria-describedby` con el valor `password-requirement`. El aria-describedby nos permite proporcionar información mucho más detallada o adicional relacionada a un elemento. En formularios se utiliza para asociar mensajes de validación o instrucciones adicionales a campos específicos, lo que sería nuestro caso.

Este atributo lo asociaremos mediante un atributo `id` al siguiente elemento:

```javascript
<p
  id="password-requirement"
  className="absolute w-1 h-1 -m-1 overflow-hidden clip-hidden"
>
  tu contraseña debe incluir {passwordRequirements}
</p>
```

Este elemento nos renderizará los requerimientos necesarios (en este caso en particular, pueden variar según las necesidades del input) para generar una contraseña segura y robusta. Por otro lado, nos va a permitir avisarle a la tecnología asistiva que hay información extra asociada a ese input y debe ser anunciada. En este caso va a anunciarlo de la siguiente manera:

![captura de pantalla del screen reader voiceover que anuncia "tu contraseña debe incluir un número de 0 a 9. un carácter especial !@#$%^&. una letra en maypuscula. no debe tener letras iguales consecutivas. una longitud de ocho caracteres"](/assets/captura4.png)

2\) También vamos a crear una referencia para que el elemento en cuestión sea lo primero que reciba foco apenas se renderiza la aplicación. De esta manera, el screen reader puede anunciar inmediatamente los requerimientos necesarios para generar una contraseña.

```javascript
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

**Funcionalidad botón para mostrar/esconder contraseña**

1\) Es necesario que este botón tenga un atributo `role` con el valor `switch` para anunciar que es un elemento que puede ser alternado entre dos valores. En conjunto al `role="switch"` tendremos que colocar un `aria-checked`.

2\) Es de vital importancia actualizar el contenido del \`aria-label\` para que el usuario tenga contexto de cuál es la acción del botón.

**Validación en tiempo real de los requisitos**

Si el usuario de tecnologías asistivas quiere volver a escuchar los requisitos puede simplemente presionar `Control-Option-Command-Slash` en VoiceOver o `Control+alt+n` en NVDA. A su vez, nosotros podemos proveer un mecanismo en tiempo real para que sepa cuántos requisitos lleva validados de la siguiente manera:

```javascript
const [total, setTotal] = useState(requirement.length);
const checkIfAllAreChecked = useCallback(
  (requirement: Requirement[]) => {
    let fulfilledRequirements = 0;
    if (Array.isArray(requirement)) {
      requirement.forEach((req: Requirement) => {
        const matchResult = password?.match(req.matchRegex);
        setIsDirty(true);
        //cada vez que un resultado matchea con nuestro regex va a incrementar nuestro counter
        if (matchResult) {
          fulfilledRequirements++;
        }
      });
      setTotal(requirement.length - fulfilledRequirements);
    }
  },
  [password, setIsDirty]
);
{... }
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="absolute w-1 h-1 -m-1 overflow-hidden clip-hidden"
  id={idInput}
>
  {total === 0 ? (
    <p>tu contraseña esta lista!</p>
  ) : (
    <p>
      {total} requisitos de {requirement.length}
    </p>
  )}
</div>
```

El mensaje se anunciará de la siguiente manera:

![Captura de pantalla del anuncio de voiceover donde se puede leer "3 requisitos de 5"](/assets/captura5.png)

Para que esto pueda ser anunciado como una actualización debemos utilizar el `role="status"`, en conjunto de dos atributos `aria-live` y `aria-atomic`.

El atributo `aria-live="polite"` sirve para saber cómo y cuando anunciar las actualizaciones a los usuarios a través de los lectores de pantalla. En este caso, el valor `polite` indica que las actualizaciones se anunciarán una vez que el usuario haya terminado su actividad actual. Esto significa que el lector de pantalla esperará para anunciar la actualización.

El atributo `aria-atomic="true"` sirve para indicarle al lector de pantalla que el contenido debe ser anunciado por completo.

Con esta breve explicación doy por finalizado este post! No obstante, no se olviden de que en el repo van a encontrar el código completo y cualquier duda o recomendación para futuros posts me las pueden hacer por privado por cualquiera de estos medios:

Linkedin: [https://www.linkedin.com/in/micaelaavigliano/](https://www.linkedin.com/in/micaelaavigliano/)

Github: [https://github.com/micaavigliano](https://github.com/micaavigliano)

Twitter: [https://twitter.com/messycatx](https://twitter.com/messycatx)

Muchas gracias por leer la tercera entrada!🩷
