const css = require('./app.scss');
import React from 'react'
import ReactDOM from 'react-dom'
var cartas = ['mario', 'mario', 'link', 'link', 'zelda', 'zelda', 'pikachu', 'pikachu', 'samus', 'samus', 'kirby', 'kirby', 'dk', 'dk', 'mr', 'mr'];
cartas = shuffle(cartas);
console.log(cartas);
var turnos=0;

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasWon: false,
      volteada: 'v',
      personaje: '',
      mat: Array(16).fill(null)
    }
  }

  checkifEqual(item, indice) {
    const m = this.state.mat
    console.log("ENTRE AL CLICK");
    console.log("CON EN EL CLICK TIENE " + cont);
    if (cont == 1) {
      primerItem = item;
      primerindice = indice;
      primerPersonaje = primerItem.state.personaje;
      console.log("El primer personaje es " + primerItem.state.personaje);
      stackofitems.push(primerItem);
    }

    if (cont > 0 && (cont % 2 == 0)) {
      segundoItem = item;
      segundoindice = indice;
      segundoPersonaje = segundoItem.state.personaje;
      console.log("El segundo personaje es " + segundoItem.state.personaje);
      //console.log("El primer personaje es " + stackofitems.pop());


      if (primerPersonaje == segundoPersonaje) {
        alert("SON IGUALES");


      } else {
        //alert("SON DIFERENTES");
        console.log(" son diferentes : " + primerItem.state.personaje + " y " + segundoItem.state.personaje);
        var a = stackofitems.pop();
        //reset (a,primerindice);

        if (a.state.mat[primerindice] === 'v') {
          const newMatrix = a.state.mat
          newMatrix[primerindice] = a.state.volteada
          a.setState({
            volteada: null,
            personaje: cartas[primerindice],
            mat: newMatrix
          })
        }
        console.log("CAMBIO? ///" + a.state.volteada + "???");
        console.log("CAMBIO? ???" + segundoItem.state.volteada + "///");
        var mid = "block v " + a.state.personaje;
        var otroid = "block v " + segundoItem.state.personaje;
        /*       //document.getElementById(mid).innerHTML.id="block null "+a.state.personaje;
              document.getElementById(mid).innerHTML.className="block null "+a.state.personaje;
              //document.getElementById(otroid).innerHTML.id="block null "+segundoItem.state.personaje;
              document.getElementById(otroid).innerHTML.className="block null "+segundoItem.state. personaje;*/


      }
      cont = 0;

    }

    /* if (
      (m[0] === volteada && m[1] === volteada && m[2] === volteada) ||
      (m[3] === volteada && m[4] === volteada && m[5] === volteada) ||
      (m[6] === volteada && m[7] === volteada && m[8] === volteada) ||
      (m[0] === volteada && m[3] === volteada && m[6] === volteada) ||
      (m[1] === volteada && m[4] === volteada && m[7] === volteada) ||
      (m[2] === volteada && m[5] === volteada && m[8] === volteada) ||
      (m[0] === volteada && m[4] === volteada && m[8] === volteada) ||
      (m[2] === volteada && m[4] === volteada && m[6] === volteada)
    ) {
      this.setState({
        hasWon: true
      })
    } */
  }

  handleClick(index) {
    console.log("INDEX: " + index);
    console.log("EL personaje es: " + cartas[index]);
    //  el index que trae es que bloque se apacho
    // este es el que deberia de hacerse random para puntos extras
    //_____________________________parte de verificacion segun index______________________________
    //pruebas para randomizar
    //_____________________________parte de verificacion segun index______________________________
    if (this.state.mat[index] === null) {
      const newMatrix = this.state.mat
      newMatrix[index] = this.state.volteada
      this.setState({
        volteada: 'v',
        personaje: cartas[index],
        mat: newMatrix
      })
    }
    console.log("cont tiene " + cont);
    turnos = turnos+1;
    //this.checkifEqual(this,index);
    if (this.state.volteada = 'v') { alert("vista"); }
  }

  render() {
    console.log(this.state);
    const gridstyle = {
      display: 'grid',
      gridTemplateRows: '150px 150px 150px 150px',
      gridTemplateColumns: '150px 150px 150px 150px',
      gridGap: '10px',
      width: '470px',
      margin: 'auto 27%'
    }
    const elementstyle = {
      borderRadius: '5px',
      fontSize: '60px'
    }
    if (this.state.hasWon) {
      return (
        <div className="won">
          {`${this.state.volteada} has won`}
        </div>
      )
    }
    return (
      <div style={gridstyle}>
        {
          this.state.mat.map((matelement, index) => {
            return (
              <div
                key={index}
                style={elementstyle}
                className={`block ${this.state.mat[index]}` + ` ` + cartas[index] + ``}
                id={`block ${this.state.mat[index]}` + ` ` + cartas[index] + ``}
                onClick={this.handleClick.bind(this, index)}
              />
              
            )
          })
        }
        <p> {'Movimientos: '+turnos}</p>
      </div>
      
      
    )
  }
}




ReactDOM.render(
  <Board />,
  document.getElementById('root')
)




function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}