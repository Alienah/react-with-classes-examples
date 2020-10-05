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