import React, {Component } from 'react';


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
            onChange={this.handleChange}
            placeholder='Introduce tu nombre'
            ref={inputElement => this.inputName = inputElement} 
            value={this.state.inputName}/>
        </p>

        <p>
          <label htmlFor='twitter'>Twitter: </label>
          <input 
            id='twitter'
            name='twitterAccount'
            onChange={this.handleChange}
            placeholder='Introduce tu Twitter'
            ref={inputElement => this.inputTwitter = inputElement}
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
