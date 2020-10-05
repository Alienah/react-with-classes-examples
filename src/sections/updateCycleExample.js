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

  static getDerivedStateFromProps(props, state) {
    // Cada vez que el usuario actual cambia,
    // Reiniciar cualquier parte del estado que esté atada a ese usuario.
    // En este ejemplo, es solo email.
    console.log('1.getDerivedStateFromProps', props, state, this)
    // if (props.animal !== this.props.animal) {
    //   return {
    //     src:  ANIMAL_IMAGES[this.props.animal],
    //   };
    // }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState, snapshot, this.props.animal);
    if (this.props.animal !== prevProps.animal) {
      // this.setState({ src:  ANIMAL_IMAGES[this.props.animal]});
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

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponenteUpdate')
    return this.props.animal !== nextProps.animal;
  }

  // componentWillUpdate() {
  //   const img = document.querySelector('img');
  //   img.animate([ {
  //     filter: 'blur(0px'
  //   }, {
  //     filter: 'blur(2px'
  //   }], {
  //     duration: 500,
  //     easing: 'ease'
  //   })
  // }

  render() {
    console.log('--> render')
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
        // disabled={ animal === this.state.animal }
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
        <h2>Ejemplo de ciclo de actualización en React con shouldComponentUpdate</h2>
        {ANIMALS.map(this._renderAnimalButton)}
        <AnimalImage animal={this.state.animal}/>
      </div>
    );
  }
}