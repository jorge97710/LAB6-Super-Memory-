const css = require('./app.scss');
import React from 'react'
import ReactDOM from 'react-dom'
var cartas = ['mario', 'mario', 'link', 'link', 'zelda', 'zelda', 'pikachu', 'pikachu', 'samus', 'samus', 'kirby', 'kirby', 'dk', 'dk', 'mr', 'mr'];
cartas = shuffle(cartas);
console.log(cartas);
var turnos = 0;
var fallos = 0;

const CartaPersonaje = ({ image, elegida, acertada, onSelect }) => (
  <div className="card" onClick={() => { if (!acertada && !elegida) { onSelect(); } }}>
    <img style={{ visibility: (acertada || elegida) ? 'visible' : 'hidden' }} id={(acertada || elegida) ? 'visible' : 'hidden'} src={require("./images/" + image + ".jpg")} height={"100%"} width={"100%"} alt={image} />
  </div>
);

class Memoria extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: cartas,
      elegidas: [],
      acertadas: []
    };
  }

  ClickHandler(index) {
    turnos = turnos + 1;
    const { elegidas, cards, acertadas } = this.state;
    console.log("TURNOS : " + turnos);
    console.log("INDEX: " + index)

    switch (elegidas.length) {

      case 0:
        this.setState({ elegidas: [index] })
        break;

      case 1:
        if (cards[elegidas[0]] == cards[index]) {
          this.setState({
            acertadas: acertadas.concat([elegidas[0], index]),
            elegidas: []
          });
        }
        else {
          fallos = fallos + 1;
          this.setState({ elegidas: [elegidas[0], index] });
          setTimeout(() => { this.setState({ elegidas: [] }) }, 2000);
        }
        break;
    }
  }

  render() {
    const { acertadas, elegidas, cards } = this.state;
    console.log("ACERTADAS TIENE: " + acertadas);
    if (acertadas.length == 16) {
      //Significa que gano
      return (
        <div> <img src={require("./images/background.png")} height={"100%"} width={"100%"} alt={'Bacground'} />
        </div>
      );
    } else {
      return (
        <div>
          <p align="center ">{'Movimientos: ' + turnos}</p>
          <p align="center ">{'Fallos: ' + fallos}</p>
          <div className="board"> {cards.map((image, index) => (<CartaPersonaje key={index} image={image} acertada={acertadas.includes(index)} elegida={elegidas.includes(index)} onSelect={() => this.ClickHandler(index)} />))}
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <Memoria />,
  document.getElementById('root')
)

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}