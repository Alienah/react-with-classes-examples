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