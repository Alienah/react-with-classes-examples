## Install

Run ```npm i``` to install all dependencies

## Run website

Run ```npm start``` to see the examples in [http://localhost:3000](http://localhost:3000) in the browser

ℹ️ This documentation is written in Spanish, as learning notes. For more information on how to start the project and what commands can be used, you can consult the documentation provided by React at [doc folder](/doc)

# 📝 REACT CON CLASES. BÁSICOS DE REACT

## JSX

No es html, es jsx, que hace mucho más sencillo de escribir lo que de otra forma haríamos con javascript puro y añadiendo parámetros al método React.Component(), algo como esto:

React.Component(
  etiquetaHTML,
  {atributo1, atributo2},
  Texto u otro React.Component(con sus parámetros) y así sucesivamente con todos los children
)

## Componente

Formas de crear componentes:

**Función normal**

```js
function Hello(props) {
 return <h2>{props.title}</h2>
}
```

**Función arrow**

```js
const Hello = (props) => <h2>{props.title}</h2>
```

**Sintaxis de clase**

```js
class Hello extends Component {
  render() {
    return <h2>{this.props.title}</h2>
  }
}
```

## Props

Buenas prácticas:

- Cada una en una línea y ordenadas alfabéticamente

```js
<Text
  isTrue
  number={2}
  text='Hola Mundo'
/>
```

Ejemplos:

```js
import React, {Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Text extends Component {
  render() {
    const { 
      arrayOfNumbers, 
      isActivated, 
      multiply, 
      objectWithInfo, 
      text,
      title,
    } = this.props;
    const secondText = isActivated ? 'Cierto' : 'Falso';
    const mappedNumbers = arrayOfNumbers.map(multiply);
    return (
      <div>
        {title}
        <p>{text}</p>
        <p>{secondText}</p>
        <p>{mappedNumbers.join(',')}</p>
        <p>{objectWithInfo.key}</p>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello title='Hello from props'/>
      </header>
      <Text
        arrayOfNumbers={[2, 3, 10]}
        isActivated
        multiply={(number) => number * 2}
        objectWithInfo={{ key: 'value', k2: 'other value'}}
        text='Hola Mundo'
        title={<h1>Este es el título</h1>}
      />
    </div>
    );
  }
}

export default App;
```

## Componentes como funciones puras

Tenemos que usar los componentes como funciones puras. En este caso los pámetros que usa son las props.

Para eso react nos ayuda ya que las props son propiedades inmutables, no se puede modificar su valor.

## Valores por defecto

Podemos asignar valores pro defecto para segurarnos de que se muestra algo aunque no se instroduzca nada

```js
class Title extends Component {
  render() {
    return <h2>{this.props.text}</h2>
  }
}

Title.defaultProps = {
  text: 'Título por defecto'
}
```

## State

Los estado en las clases se declaran en el constructor:

```js
class Counter extends Component {
  constructor() {
    super();
    this.state = { counter: 1};
  }
  render() {
    return (
    <span>{this.state.counter}</span>
    );
  }
}
```

Como las propiedades son inmutables, no podemos directamente modificarla, porque React funciona de manera que optimiza cuándo es el mejor momento de modificar el árbol del dom, para ello usa una cola, en la que va instrocudiendo todos los cambios que se tienen que hacer y una a una va sacando las tareas.  Así pues, no podemos alterar su funcionamiento, por ello tenemos que usar el método designado para modificar los estados, que se llama ```setState```.

**setState**

Con este método le estamos pidiendo que nos modifique el estado cuando lo estime oportuno. Con lo cual, es un método asíncrono.

El método acepta un parámetro, que es el nuevo valor que tendrá el estado.

```js
class Counter extends Component {
  constructor() {
    super();
    this.state = { counter: 1};
    setInterval(() => {
      this.setState({counter: this.state.counter + 1});
    }, 1000);
  }

  render() {
    return (
    <span>{this.state.counter}</span>
    );
  }
}
```

Con lo cuál, los estados:

- Son inmutables
- Los podemos modificar con el método setState
- setState es asíncrono

## Comunicación de componentes de padre a hijo

* Padre a hijo: por props. Si cambia un estado del padre, esto hará que sus componentes hijos se vuelvan a renderizar.

```js
// Padre
class Counter extends Component {
  constructor() {
    super();
    this.state = { counter: 1};
    setInterval(() => {
      this.setState({counter: this.state.counter + 1});
    }, 1000);
  }

  render() {
    return (
    <CounterNumber number={this.state.counter}/>
    );
  }
}

// Hijo
class CounterNumber extends Component {
  render() {
    return (
    <span>{this.props.number}</span>
    );
  }
}
```

## Inicializar el estado a través de props 

Si queremos usar las props en un constructor, hay que iniocializar en el constructor el componente , pasándole las props que recibe.(Deprecated?)

```js
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: this.props.initCounter};
    setInterval(() => {
      this.setState({counter: this.state.counter + 1});
    }, 1000);
  }

  render() {
    return (
    <CounterNumber number={this.state.counter}/>
    );
  }
}
```

## Conditional rendering

```js
import React, {Component} from 'react';

class LoginButton extends Component {
  render() {
    return (
      <button>Iniciar sesión</button>
    );
  }
}

class LogoutButton extends Component {
  render() {
    return (
      <div>
        <p>Bienvenida</p>
        <button>Cerrar sesión</button>
      </div>
    );
  }
}

export default class ConditionalSection extends Component {
  constructor() { 
    super();
    // Dependiendo del valor de este estado, mostrará uno u otro componente
    this.state = { isUserLogged: true };
  }
  render() {
    return (
      <div>
        <h4>Conditional rendering</h4>
        { this.state.isUserLogged 
          ? <LoginButton /> 
          : <LogoutButton /> 
        }
      </div>
    )
  }
}
```

## Renderizar listas

Podemos renderizar listas directamente usando map, siempre cuidando de poner una key única en cada elemento iterado.

```js
render() {
  const numbers = [1, 1, 3, 6, 9];
  return (
    <div>
      <h4>Listas</h4>
      <ul>
        {numbers.map((number, index) => {
          return <li key={index}> Soy el número {number}</li>
        })}
      </ul>
    </div>
  );
}
```

## Eventos

Los eventos en react sirven para comunicar datos de hijos a padres, entre otras cosas. Al ver que se llaman por ejemplo "onClick", podrían parecer semejantes a los que se usan en html "onclick", los cuales, no son muy recomendables de usar de esa manera. Sin emabrgo, no son lo mismo, po rvarias razones:

- onClick de React está en camelcase
- en react, pasamos una función que se evaluará al lanzar el evento.
- pero sobre todo, la principal diferencia es que NO ES HTML, sino javascript. de hecho, si inspeccionamos el árbol del dom en el navegador, veremos que el elemento no tiene ningún evento asociado. Es decir que ese evento se gestiona sólo de manera interna.

Los eventos como onClick, al igual que cuando usamos, addEventListener, tienen un objeto event asociado. La ventaja del evento que usamos en react es que es un evento sintético que envuelve el evento nativo que hace que sea compatible con todos los navegadores. Aunque si por cuualquier motivo necesitamos acceder al evento nativo podríamos hacerlo a través de ```e.native```.

Para una información más detallada, consultar la documentación de react relacionada con [eventos](https://es.reactjs.org/docs/events.html).

**Contecto de this en eventos**

A tener en cuenta cuanto trabajamos con eventos y con clases de React es el contexto del this cuando se ejecutan dichos eventos, ya que el contexto de un evento click, por ejemplo, es el del navegador, que es el que ha llamado a la función. Para solucionar posibles problemos con el contexto, hay que bindear el contexto para que sepa nuestra función qué this es el que queremos y la forma más limpia de hacerlo es con arrow functions:

```js
import React, {Component } from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = { mouseX: 0, mouseY: 0 };
  }

  handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    this.setState({ mouseX: clientX, mouseY: clientY })
  }

  handleClick(e) {
    console.log(e);
    console.log(e.nativeEvent);
  }

  render() {
    return (
    <div className="App">
      <h2>Ejemplo con state</h2>
      <button onClick={this.handleClick}>Click me</button>
      <div
        onMouseMove={this.handleMouseMove}
        style={{ border: '1px solid #000', marginTop: 10, padding: 10}}
      >
        <p>{this.state.mouseX}, {this.state.mouseY}</p>
      </div>
    </div>
    );
  }
}

export default App;
```

## Formularios en react

- en vez de ```for``` para los label, usar ```htmlFor```;
- se pueden usar ```ref``` en vez de getElementById

Con id:

```js
// Forms

import React, {Component } from 'react';


export default class Forms extends Component {
  handleClick(e) {
    // Para evitar que haga submit, ya que por defecto el navegador interpreta que el último botón que haya en el html hace submit 
    e.preventDefault();
    const name = document.getElementById('name').value;
    const twitter = document.getElementById('twitter').value;
    console.log({name, twitter})
  }
  render() {
    return (
    <div className="Form">
      <h4>Formularios</h4>
      <form>
        <p>
          <label htmlFor='name'>Nombre: </label>
          <input 
            id='name'
            name='userName'
            placeholder='Introduce tu nombre' />
        </p>

        <p>
          <label htmlFor='twitter'>Twitter: </label>
          <input 
            id='twitter'
            name='twitterAccount'
            placeholder='Introduce tu Twitter' />
        </p>

        <button onClick={this.handleClick}>Enviar</button>
      </form>
    </div>
    );
  }
}
```

Con ref:

ref es una atributo que acepta una función como parámetro y esta función tiene como parámetro la referencia del elemento, con lo que podríamos acceder en ella a dicha referencia.

```js
import React, {Component } from 'react';


export default class Forms extends Component {
  handleClick = (e) => {
    // Para evitar que haga submit, ya que por defecto el navegador interpreta que el último botón que haya en el html hace submit 
    e.preventDefault();
    const name = this.inputName.value;
    const twitter = document.getElementById('twitter').value;
    console.log({name, twitter})
  }
  render() {
    return (
    <div className="Form">
      <h4>Formularios</h4>
      <form>
        <p>
          <label htmlFor='name'>Nombre: </label>
          <input 
            id='name'
            name='userName'
            placeholder='Introduce tu nombre'
            ref={inputElement => this.inputName = inputElement} />
        </p>

        <p>
          <label htmlFor='twitter'>Twitter: </label>
          <input 
            id='twitter'
            name='twitterAccount'
            placeholder='Introduce tu Twitter'
            ref={inputElement => this.inputTwitter = inputElement}/>
        </p>

        <button onClick={this.handleClick}>Enviar</button>
      </form>
    </div>
    );
  }
}
```

Usar referencias es interesante y fácil de acceder a los elementos del dom. Se suele usar por ejemplo cuando se quiere integrar una librería externa con react. Sin emabrgo no es recomendable usarla demasiado, ya que hace quye nuestro código deje de ser declarativo.

Hay otras maneras de hacerlo de forma más acorde con React.

### onSubmit

Se puede usar también, en evez de el evento en el boytón, el evento que trae consigo el formulario, onsubmit

```js
export default class Forms extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.inputName.value;
    const twitter = document.getElementById('twitter').value;
    console.log({name, twitter})
  }
  render() {
    return (
    <div className="Form">
      <h4>Formularios</h4>
      <form onSubmit={this.handleSubmit}>
        <p>
          <label htmlFor='name'>Nombre: </label>
          <input 
            id='name'
            name='userName'
            placeholder='Introduce tu nombre'
            ref={inputElement => this.inputName = inputElement} />
        </p>

        <p>
          <label htmlFor='twitter'>Twitter: </label>
          <input 
            id='twitter'
            name='twitterAccount'
            placeholder='Introduce tu Twitter'
            ref={inputElement => this.inputTwitter = inputElement}/>
        </p>

        <button>Enviar</button>
      </form>
    </div>
    );
  }
}
```

###onChange

Te avisa cuando ha cambiado el valor de un campo

```js
export default class Forms extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.inputName.value;
    const twitter = document.getElementById('twitter').value;
    console.log({name, twitter})
  }

  handleChange(e) {
    console.log('e.target.checked', e.target.checked)
  }
  render() {
    return (
    <div className="Form">
      <h4>Formularios</h4>
      <form onSubmit={this.handleSubmit}>
        {
          // ...
        }

        <p>
          <label>
            <input 
              onChange={this.handleChange}
              type='checkbox'/>
            Aceptar términos
          </label>
        </p>

        <button>Enviar</button>
      </form>
    </div>
    );
  }
}
```

### Otros eventos de formularios

Otros eventos de formularios útiles que podemos usar

- onInput
- onInvalid

## Componentes controlados

Hasta ahora hemos visto ejemplos de cómo gestionar formularios de una manera nativa, es decir, de forma similar a como lo harías con javascript o con html. A la forma se la conoce en React como componentes descontrolados, ya que no tenemos control en el componente del valor de los campos, ya que tenemos que consultar el árbol para obtenerlo.

En react existe otra manera de hacerlo que se le llama _componentes controlados_.

En realidad si lo pensamos, los campos de un formulario tienen ya un estado interno y es este estado el que podríamos manejar con react.

```js
export default class Forms extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      inputTwitter: '@',
      inputTerms: true
     }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    //Aquí ya tenemos disponibles todos los valores
    console.log(this.state)
  }

  handleChange = (e) => {
    if (e.target.id === 'name') {
      this.setState({inputName: e.target.value});
    }
    if (e.target.id === 'twitter') {
      this.setState({inputTwitter: e.target.value});
    }
    if (e.target.id === 'terms') {
      this.setState({inputTerms: e.target.checked});
    }
  }
  render() {
    return (
    <div className="Form">
      <h4>Formularios</h4>
      <form onSubmit={this.handleSubmit}>
        <p>
          <label htmlFor='name'>Nombre: </label>
          <input 
            id='name'
            name='userName'
            onChange={this.handleChange}/>
        </p>

        <p>
          <label htmlFor='twitter'>Twitter: </label>
          <input 
            id='twitter'
            name='twitterAccount'
            onChange={this.handleChange}
            value={this.state.inputTwitter}/>
        </p>

        <p>
          <label>
            <input
              id='terms'
              checked={this.state.inputTerms}
              onChange={this.handleChange}
              type='checkbox'/>
            Aceptar términos
          </label>
        </p>

        <button>Enviar</button>
      </form>
    </div>
    );
  }
}
```

## Children

Esa una prop especial que nos devuelve el contenido que está entre las etiquetas apertura y cierre de nuestro componente.

Esto nos permite hacer nuestros componentes mucho más reutilizables, ya que no sea cual el contenido que introduces entre etquetas, éste se renderizará dentro del elemento que tú quieras.

Un ejemplo con un artículo

```js
import React, {Component } from 'react';
import './App.css';

class Box extends Component {
  render() {
    return (
    <div style={{ border: '1px solid #000', margin: '6px', padding: '6px' }}>
     {this.props.children}
    </div>
    );
  }
}

class Article extends Component {
  render() {
    return (
    <div>
      <section>
        <h2>{this.props.title}</h2>
        <p><em>Escrito por {this.props.author}</em></p>
        <Box>{this.props.date}</Box>
        <article>
          {this.props.children}
        </article>
      </section>
    </div>
    );
  }
}

class App extends Component {
  render() {
    return (
    <div className="App">
      <Article
        author='Aida'
        date={new Date().toLocaleDateString()}
        title='Artículo sobre children'
      >
        <p>El contenido que envolvemos dentro del componente Article será enviado al componente como this.props.children. </p>
        <p><strong>Y mantiene las etiquetas y componentes que se hayan añadido dentro, como por ejemplo este 'strong'</strong></p>
      </Article>
    </div>
    );
  }
}

export default App;

```

## PropTypes en clases

Para especificar el tipo de las propiedades que usamos en nuestras clases, hay varias librerías, pero aquí vemos un ejemplo usando _PropTypes_

```js
class Article extends Component {
  // O se puede especificar como una propiedad estática, que sería la ideal si trabajamos con clases, ya que quedan más recogidas.
  static propTypes = {
    author: PropTypes.string.isRequired
  }
  render() {
    const { author, children, date, title } = this.props;
    if (!author) {
      return '';
    }
    return (
    <div>
      <section>
        <h2>{title}</h2>
        { author && <p><em>Escrito por {author}</em></p> }
        <Box>{date}</Box>
        <article>
          {children}
        </article>
      </section>
    </div>
    );
  }
}

// Se puede especificar aquí el tipo de las propiedades
// Article.propTypes = {
//   author: PropTypes.string
// }
```

## Ciclos de vida

1. Montaje

- Se ejecuta siempre y sólo una vez

- Construye el componente en su estado inicial

- Y obtienes las props que se le han pasado

- Se bindearían los métodos de clase que accedan al contexto

- Se ejecuta por primera vez el render

- Termina con el componente montado en el DOM

2. Actualización

- Se ejecuta cada vez que se cambian las props o se actualiza su estado

- Podemos controlar cuándo el componente necesita renderizarse  de nuevo a través de su métodos. Si no lo hacemos, el componente se renderizará de nuevo

3. Desmontaje

- Sirve para eliminar los listeners

- Eliminamos referencias que puedan no estar disponibles en el DOM

### MONTAJE

Métodos que se ejecutan en este ciclo:

1. **Constructor**

```js
constructor(props)
```

- Se ejecuta antes de montar el componente

- Aquí se debe inicializar el state del componente

- Cuando es necesario, se bindea el contexto de los métodos

- OJO. No se debe llamar al setState

2. **ComponentWillMount**

```js
componentWillMount()
```

- Se ejecuta una vez

- Se invoca antes de montar el componente y antes del render

- Todavía no tenemos el componente disponible en el DOM

- Se ejecuta entre el constructor y el render

- La finalidad es la de preparar la configuración del componente, iniciar el state y en definitiva tener el código y todos los datos que vayamos a necesitar para su primer renderizado. Aquí sí SE PUEDE usar setState, que haría los cambios oportunos para que tenga los datos correctos antes del primer renderizado

Sin embargo, a excepción del **_setState_**, podemos hacer las mismas cosas en el constructor y sería más recomendable usar dicho constructor. En relación al _setState_, en vez de usarlo, podemos directamente cambiar el valor inicial del state en el constructor, no es necesario usar el setState en este punto la mayor parte de las ocasiones.

3. **Render**

```js
render()
```

- La primera vez se ejecuta después del contructor- componenteWillMount, pero se puede ejecutar más veces, cada vez que se actualicen estados o propiedades

- Es el único método obligatorio

- retirna los elementos que queremos mostrar en nuestra interfaz

- OJO!. No se debe llamar al setState, ya que provocaría un loop infinito

Este método tiene que ser siempre PURO, es decir, que no modifique el state y que no interactúe con nada del browser.

Que sólo se encarge de transformar props y state en una representación visual de la aplicación. Evitar operaciones o transformaciones complejas en este método, ya que penaliza la performance.

4. **ComponentDidMount**

```js
componentDidMount()
```

- Se ejecuta tras renderizar el componente. 

- Cuando se ejecuta significa que ya existe una representación de nuestros elementos en el DOM.

- Aquí podemos añadir **las llamadas para recuperar datos del servidor y escuchar eventos**. (Si nos hemos suscrito a algún evento, como el scroll, no hay que olvidarse de eliminarlo en el método de la fase de desmontaje, componentWillUnmount())

- Se puede usar el setState

### ACTUALIZACIÓN

1. **~~ComponentWillReceiveProps~~ [LEGACY]**

```js
componentWillReceiveProps(nextProps)
```

- Se ejecuta **sólo** cuando el componente va a recibir nuevas props

- Útil cuando se usa las props para formar el state del componente

- Se puede usar setSate y a veces no provoca otro render, porque se actualice antes de llegar a él.

Debido a esto, siempre ha sido inseguro sobrescribir incondicionalmente el estado usando este método de ciclo de vida. Hacerlo causará que las actualizaciones al estado se pierdan. Y por ello se ha dejado de usar y ha pasado a ser legacy.

**Ejemplo**

Tenemos este ejemplo en el que por un lado está el componente _UpdateCycleExample_ que tiene tres botones yq ue al pulsar el botón cambia su state _animal_ que es el que enviamos como prop al componente hijo que se encarga de pinta la imagen.

```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ANIMAL_IMAGES = {
  cat: 'https://cutt.ly/Cf4DGjS',
  dolphin: 'https://cutt.ly/bf4DNiJ',
  panda: 'https://cutt.ly/Of4DkuR'
}

class AnimalImage extends Component {
  state = { src: ANIMAL_IMAGES[this.props.animal]}

  render() {
    console.log('render')
    return (
    <div>
      <p>Selected {this.props.animal}</p>
      <img
        alt={this.props.animal}
        src={this.state.src}
        width='250'
      />
    </div>
    );
  }
}

AnimalImage.propTypes = {
  animal: PropTypes.oneOf(['cat', 'dolphin', 'panda']),
}

AnimalImage.defaultProps = {
  animal: 'panda'
}

export default class UpdateCycleExample extends Component {
  state = { animal: 'panda'}
  render() {
    return (
      <div>
        <h2>Ejemplo de cislo de actualización en React</h2>
        <button onClick={() => this.setState({ animal: 'panda'})}>
          Panda
        </button>
        <button onClick={() => this.setState({ animal: 'dolphin'})}>
          Dolphin
        </button>
        <button onClick={() => this.setState({ animal: 'cat'})}>
          Cat
        </button>
        <AnimalImage animal={this.state.animal}/>
      </div>
    );
  }
}
```

Sin embargo en este ejemplo, sólo cambio el párrafo ```<p>Selected {this.props.animal}</p>```, mientras que la imagen sigue siendo la misma. ¿Por qué? Porque la imagen lo que está leyendo es el state del componente _AnimalImage_ , el cual no está cambiando, sino que sólo están cambiando las props que recibe de su padre.

```js
<img src={this.state.src} />
```

Para solucionarlo, vamos a usar el método componentWillReceiveProps

```js
class AnimalImage extends Component {
  state = { src: ANIMAL_IMAGES[this.props.animal]}

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    this.setState({ src:  ANIMAL_IMAGES[nextProps.animal]});
  }

  render() {
    console.log('render')
    return (
    <div>
      <p>Selected {this.props.animal}</p>
      <img
        alt={this.props.animal}
        src={this.state.src}
        width='250'
      />
    </div>
    );
  }
}
```

Este método se ejecutará siempre que el padre le envíe nuevas props, aunque pueden ser la misma, es decir, puede que le esté dando click a delfín varias veces, y aunque es el mismo valor, estoy lanzando la nueva prop igualmente con el click.

Refactor del anterior ejemplo con buenas prácticas:

```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ANIMAL_IMAGES = {
  panda: 'https://cutt.ly/Of4DkuR',
  cat: 'https://cutt.ly/Cf4DGjS',
  dolphin: 'https://cutt.ly/bf4DNiJ',
}

const ANIMALS = Object.keys(ANIMAL_IMAGES);

class AnimalImage extends Component {
  state = { src: ANIMAL_IMAGES[this.props.animal]}

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    this.setState({ src:  ANIMAL_IMAGES[nextProps.animal]})
  }

  render() {
    console.log('render')
    return (
    <div>
      <p>Selected {this.props.animal}</p>
      <img
        alt={this.props.animal}
        src={this.state.src}
        width='250'
      />
    </div>
    );
  }
}

AnimalImage.propTypes = {
  animal: PropTypes.oneOf(ANIMALS),
}

export default class UpdateCycleExample extends Component {
  state = { animal: 'panda'}

  _renderAnimalButton = (animal, index) =>{
    return (
      <button 
        disabled={ animal === this.state.animal }
        key={index}
        onClick={() => this.setState({ animal })}
        style={{ textTransform: 'capitalize' }}
      >
        {animal}
      </button>
    )
  }

  render() {
    return (
      <div>
        <h2>Ejemplo de cislo de actualización en React</h2>
        {ANIMALS.map(this._renderAnimalButton)}
        <AnimalImage animal={this.state.animal}/>
      </div>
    );
  }
}
```

En vez del anterior ciclo, el cual ya es legacy, podemos sustituirlo por _ComponentdidUpdate_. (ver más abajo en el punto )

2. **ShouldComponentUpdate**

- Determina si el componente debe actualizarse

- El comportamiento predeterminado es volver a procesar cada cambio de estado y, en la gran mayoría de los casos, debe confiar en el comportamiento predeterminado.

- Devuelve un booleano. Por defecto siempre es true

- OJO. No se debe llamar al setState.

```js
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponenteUpdate')
    // Sólo en este caso se volverá a ejecutar el render
    return this.props.animal !== nextProps.animal;
  }
```

3. **PureComponent**

El método ShouldComponentUpdate sólo existe como optimización de rendimiento. No confíes en él para “prevenir” un renderizado, ya que esto puede conducir a errores. Considera usar el componente integrado _PureComponent_ en lugar de escribir _shouldComponentUpdate()_ a mano. 

PureComponent realiza una comparación superficial de props y estado, y reduce la posibilidad de saltar una actualización necesaria.

Con lo cual, sólo hay que usarlo cuando manejemos props y states simples, de un nivel.

```js
import React, {Component, PureComponent} from 'react';

class AnimalImage extends PureComponent
//...
// Y eliminaríamos el código anterior del shouldComponentUpdate
```

4. **~~ComponentWillUpdate~~ [LEGACY]**

Evitar el uso de seState

Se ejecutaría si el anterior método ShouldComponentUpdate es true y antes del render.

Un uso podría ser añadir animaciones para que se ejecuten justo al iniciar el render.

```js
  componentWillUpdate() {
    const img = document.querySelector('img');
    img.animate([ {
      filter: 'blur(0px'
    }, {
      filter: 'blur(2px'
    }], {
      duration: 500,
      easing: 'ease'
    })
  }
```

**_Normalmente, este método puede ser reemplazado por componentDidUpdate(). Si estabas leyendo el DOM en este método (por ejemplo para guardar una posición de desplazamiento), puedes mover esa lógica a getSnapshotBeforeUpdate()._** 

5. **static getDerivedStateFromProps(props, state) [NUEVA ALTERNATIVA]**

-  se invoca justo antes de llamar al método de render, tanto en la montura inicial como en las actualizaciones posteriores. 

- Debes devolver un objeto para actualizar el estado, o null para no actualizar nada.

- Este método NO tiene acceso a la instancia del componente (_this_ es undefined)

- Por ejemplo, puede ser util para implementar un componente <Transition> que compare su anterior hijo y el siguiente para decidir cual de los dos animar en la entrada y salida.

Más información en la documentación de react relativa a [static getderivedstatefromprops](https://es.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)


```js
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail,
    prevPropsUserID: this.props.userID
  };

  static getDerivedStateFromProps(props, state) {
    // Cada vez que el usuario actual cambia,
    // Reiniciar cualquier parte del estado que esté atada a ese usuario.
    // En este ejemplo, es solo email.
    if (props.userID !== state.prevPropsUserID) {
      return {
        prevPropsUserID: props.userID,
        email: props.defaultEmail
      };
    }
    return null;
  }

  // ...
}
```

6. **getSnapshotBeforeUpdate [NUEVA SOLUCIÓN EN VEZ DE LOS LEGACY]**

getSnapshotBeforeUpdate() se invoca justo antes de que la salida renderizada más reciente se entregue, por ejemplo, al DOM. Permite al componente capturar cierta información del DOM (por ejemplo, la posición del scroll) antes de que se cambie potencialmente. Cualquier valor que se devuelva en este ciclo de vida se pasará como parametro al método componentDidUpdate().

Este caso de uso no es común, pero puede ourrir en IUs como un hilo de chat que necesita manejar la posición del scroll de manera especial.

Debe devolverse un valor instantáneo (o null).

Ver ejemplo en el documentación de react relativa a [getSnapshotBeforeUpdate](https://es.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

6. **ComponentDidUpdate [USAR ESTE MÉTODO PREFERENTEMENTE]**

-  Se invoca inmediatamente después de que la actualización ocurra. Este método no es llamado para el renderizador inicial.

- Use esto como una oportunidad para operar en DOM cuando el componente se haya actualizado. Este es también un buen lugar para hacer solicitudes de red siempre y cuando compare los accesorios actuales con los anteriores (por ejemplo, una solicitud de red puede no ser necesaria si las props no han cambiado). (Para ejecutar funciones de librerías externas, usar el nuevo DOM o hacer llamadas externas)

- OJO! Se puede usar el setState sismpre y cuando se envuelva en una consición que compare si la propiedad ha cambiado o de lo contrario se iniciaría un bucle infinito..

```js
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState, snapshot, this.props.animal);
    if (this.props.animal !== prevProps.animal) {
      this.setState({ src:  ANIMAL_IMAGES[this.props.animal]});
      const img = document.querySelector('img');
      img.animate([ {
        filter: 'blur(2px'
      }, {
        filter: 'blur(0px'
      }], {
        duration: 1500,
        easing: 'ease'
      })
    }
  }
```

### DESMONTAJE

- Se ejecuta sólo una vez si el componente deja de renderizarse en la aplicación

- Sólo tiene una fase

1. **ComponenteWillUnmount**

- Justo antes de desmontarse

- eliminar suscripciones a eventos, cancelar peticiones, limpiar intervalos y liberar recursos

- no se debe llamar al setState. No tiene sentido

### MANEJO DE ERRORES

Estos métodos se invocan cuando hay un error durante la renderización, en un método en el ciclo de vida o en el constructor de cualquier componente hijo.

1. **componentDidCatch**

```js
componentDidCatch(error, info)
```

- Se ejecuta sólo cuando el componente lanza una excepción

- Sólo tiene una fase

- Permite manejar errores y excepciones

- También captura excepciones de los children, no el componente en sí, por eso hay que llevarlos al nivel más superior

- NO captura los eventos disparador por eventos, como el click, ni por el código asíncrono (lado del servidor).

- Si hay un eror no controlado, se desmontará el componente de la aplicación. 

- Lo haremos en lugares estratégicos, para hacer nuestra aplicación resistente

```js
import React, {Component} from 'react';

class ErrorLauncherButton extends Component {
  state = { throwError: false }
  render() {
    if (this.state.throwError) {
      throw new Error('Error lanzado por el botón');
    }
    return (
      <button
        onClick={() => this.setState({ throwError: true })}
      >
        Lanzar error
      </button>
    )
  }
}

export default class ComponentDidCatchExample extends Component {
  state = { hasError: false, errorMsg: '' }

  componentDidCatch(error, info) {
    console.log('componentDidCath', { error, info });
    this.setState({ hasError: true, errorMsg: error.toString()})
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Error en el componente: {this.state.errorMsg}</p>
          <button 
            onClick={() => { this.setState({ hasError: false })}}>
            Volver a la aplicación
          </button>
        </div>
      )
    }
    return (
      <div>
        <h2>Ejemplo de ciclo de error ComponentDidCatch</h2>
        <ErrorLauncherButton></ErrorLauncherButton>
      </div>
    );
  }
}
```

### RESUMEN

Los ciclos de vida que más usaremos serán:

- **Constructor**: para iniciar el estado o bindear

- **ComponentDidMount**: Para setear el estado que requiere de un primer renderizado del DOM (tamaños de contenedores, etc) y para suscripciones (llamadas servidor y eventos). Se hará un renderizado extra, pero antes de que el navegador haya mostrado la pantalla, con lo que el usuario final no lo percibirá. Ojo, puede penalizar performance, no abusar.

- **ComponentDidUpdate**: Se ejecutará siempre que se actualicen las props. Podemos hacer llamadas a fetch, habiendo comprobado que se ha modificado la prop. No se recomienda usar setState a no ser que se meta dentro de una condición que compruebe que haya cambiado cierto valor.

- **ComponentWillUnmount**: Para eliminar suscripciones

## Conceptos importantes en React

* **Flujo de datos descendente**. Un estado es local y está encapsulado a su componente, aunque ese componente puede elegir compartir su estado como prop, pero esto sólo afectaría a los componentes que están por debajo de árbol, por eso se le llama descendente.


* **Levantar el estado**: Cuando dos componentes necesitan compartir un estado, hay que levantarle al siguiente nivel superior que tengan en común, y aque los estados sólo viven en su propio componente. Se hace con componentes controlados y eventos. Es el padre el que modifica el estado, pero los hijos son los que lo inician.

* **Componentes controlados vs Componentes no controlados**: 

- Los no controlados son los que acceden directamente al DOM (los inputs normales de HTML), a los que accedemos con ref o con getElementBy...

- Los controlados son los que propone react, para aprovechar la reactividad, valga la redundancia, es decir la forma declarativa, que es mediante props y eventos. El input recibe una prop y un método callback y sólo se encarga de mandarle al padre (form) el valor de su input, pero es el padre el que lo almacena en un estado y lo trata.

```js
// Componente hijo completamente controlado por el padre

function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
```

## Buenas prácticas

* **Usar composición vs extender la clase**

* **Usar funciones vs clases** A excepción de cuando tengamos que usar los cilos de vida: getSnapshotBeforeUpdate, componentDidCatch y getDerivedStateFromError, que aún están en proceso de crear los hooks, con lo que sí que tendríamos que usar las clases en estos casos, para usar esos métodos.

* **Patrón Contenedor-Contenido**. Dividir los tipos de componentes entre los que son Contenedor y los que son Contenido, también conocidos como listos y tontos, o lógicos y presentacionales