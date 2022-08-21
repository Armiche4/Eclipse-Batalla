import { LitElement, html, css } from "../node_modules/lit";
import {
  addItem,
  removeItem,
  getCombatientes,
} from "../servicios/funciones.js";

export class FormularioSImple extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .hidden {
        display: none;
      }

      .grey {
        background-color: grey;
      }
      .mainContainer {
        padding: 10px 40px;
        display: flex;
        flex-direction: column;
        max-width: 450px;
        margin: auto;
        border: 1px solid black;
      }
      p,
      h4,
      h3 {
        margin: 15px auto 5px;
        text-align: center;
      }
      .containerDados {
        display: flex;
        flex-direction: column;
      }
      .containerMasMenos {
        display: flex;
        justify-content: center;
      }
      img {
        margin: 5px auto;
      }
      #botonQuitar {
        margin: 5px auto;
      }
      .buttonMasMenos {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: white;
        background-color: grey;
        margin: 1.5px;
        font-size: 30px;
        border-color: grey;
      }

      .buttonMove {
        color: #fff;
        background-color: grey;
        border: 1px solid grey;
        text-transform: uppercase;
        margin: 5px;
        font-size: 16px;
        font-weight: 500;
        border-radius: 10px;
        min-width: 156px;
        padding: 13px 30px;
      }
      select {
        background-color: #666;
        border: 1px solid #666;
        color: white;
      }
      button:active {
        color: black;
        background-color: #c1c1c1;

        border-color: black;
      }
    `,
  ];

  static properties = {
    numeroDadosUno: { type: Number },
    numeroDadosDos: { type: Number },
    numeroDadosTres: { type: Number },

    numTipoNaves: { type: Number },

    naveUno: { type: Object },
    numeroNavesTipo: { type: Number },

    escudo: { type: Number },

    iniciativa: { type: Number },

    positivos: { type: Number },

    negativos: { type: Number },

    numTipoDados: { type: Number },

    imagenCanon: { type: String },
  };

  constructor() {
    super();
    this.numeroDadosUno = 1;
    this.numeroDadosDos = 1;
    this.numeroDadosTres = 1;

    this.escudo = 0;

    this.iniciativa = 0;

    this.negativos = 0;
    this.positivos = 0;
    this.numTipoDados = 1;

    this.numTipoNaves = 1;

    this.numeroNavesTipo = 1;

    this.imagenCanon =
      "http://cloud-3.steamusercontent.com/ugc/1267149075135755317/951CEBBAEEAA63D90049D9A73F62CEA3FCC1F282/";
  }

  crearNave() {
    let dados = [];
    let dado = {
      dadosNumero: this.numeroDadosUno,
      dadosFuerza: this.shadowRoot.getElementById("dado1").value,
    };
    dados.push(dado);
    if (this.numTipoDados > 1) {
      let dado2 = {
        dadosNumero: this.numeroDadosDos,
        dadosFuerza: this.shadowRoot.getElementById("dado2").value,
      };
      dados.push(dado2);
    }
    if (this.numTipoDados > 2) {
      let dado3 = {
        dadosNumero: this.numeroDadosTres,
        dadosFuerza: this.shadowRoot.getElementById("dado3").value,
      };
      dados.push(dado3);
    }
    const jugador = this.shadowRoot.getElementById("selectorJugador").value;
    const tipoNave = this.shadowRoot.getElementById("selectorNave").value;
    this.naveUno = {
      dados: dados,
      escudos: this.escudo,
      iniciativa: this.iniciativa,
      negativos: this.negativos,
      positivos: this.positivos,
      cantidadNaves: this.numeroNavesTipo,
      jugador: jugador,
      tipoNave: tipoNave,
    };
    localStorage.setItem(
      "Nave" + tipoNave + jugador,
      JSON.stringify(this.naveUno)
    );
    console.log(this.naveUno);
    location.reload();
  }

  //DADOS
  addDadoUno() {
    this.numeroDadosUno++;
  }
  addDadoDos() {
    this.numeroDadosDos++;
  }
  addDadoTres() {
    this.numeroDadosTres++;
  }
  removeDadoUno() {
    this.numeroDadosUno = removeItem(this.numeroDadosUno);
  }
  removeDadoDos() {
    this.numeroDadosDos = removeItem(this.numeroDadosDos);
  }
  removeDadoTres() {
    this.numeroDadosTres = removeItem(this.numeroDadosTres);
  }
  //ESCUDOS
  addEscudo() {
    this.escudo = addItem(this.escudo);
  }
  removeEscudo() {
    this.escudo = removeItem(this.escudo);
  }

  //INICIATIVA

  addIniciativa() {
    this.iniciativa = addItem(this.iniciativa);
  }
  removeIniciativa() {
    this.iniciativa = removeItem(this.iniciativa);
  }

  //NEGATIVOS
  addNegativos() {
    if (this.negativos < 0) {
      this.negativos++;
    }
  }
  removeNegativos() {
    this.negativos--;
  }
  //POSITIVOS
  addPositivos() {
    this.positivos++;
  }
  removePositivos() {
    this.positivos = removeItem(this.positivos);
  }

  ponerDadoMas() {
    if (this.numTipoDados < 3) {
      if (this.numTipoDados === 1) {
        this.shadowRoot.getElementById("panelDadoDos").className = "";
        this.shadowRoot.getElementById("botonQuitar").className = "";
      }
      if (this.numTipoDados === 2) {
        this.shadowRoot.getElementById("panelDadoTres").className = "";
      }

      this.numTipoDados++;
    }
  }

  ponerDadoMenos() {
    if (this.numTipoDados > 0) {
      if (this.numTipoDados === 2) {
        this.shadowRoot.getElementById("panelDadoDos").className = "hidden";
        this.shadowRoot.getElementById("botonQuitar").className = "hidden";
      }
      if (this.numTipoDados === 3) {
        this.shadowRoot.getElementById("panelDadoTres").className = "hidden";
      }

      this.numTipoDados--;
    }
  }

  addTipoNave() {
    if (this.numTipoNaves < 4) {
      if (this.numTipoNaves === 1) {
        this.shadowRoot.getElementById("panelNaveDos").className = "";
      }
      if (this.numTipoNaves === 2) {
        this.shadowRoot.getElementById("panelNaveTres").className = "";
      }
      if (this.numTipoNaves === 3) {
        this.shadowRoot.getElementById("panelNaveCuatro").className = "";
      }

      this.numTipoNaves++;
    }
  }
  RemoveTipoNave() {
    if (this.numTipoNaves > 0) {
      if (this.numTipoNaves === 1) {
        this.shadowRoot.getElementById("panelNaveDos").className = "hidden";
      }
      if (this.numTipoNaves === 2) {
        this.shadowRoot.getElementById("panelNaveTres").className = "hidden";
      }
      if (this.numTipoNaves === 3) {
        this.shadowRoot.getElementById("panelNaveCuatro").className = "hidden";
      }

      this.numTipoNaves--;
    }
  }

  addNave() {
    this.numeroNavesTipo++;
  }

  removeNave() {
    if (this.numeroNavesTipo > 0) {
      this.numeroNavesTipo--;
    }
  }

  iniciarBatalla() {
    console.log(getCombatientes("atacante"));
    if (
      getCombatientes("atacante").length != 0 &&
      getCombatientes("defensor").length != 0
    ) {
      window.location.href = "/batalla.html";
    } else {
      Swal.fire({
        title: "No tienes naves para combatir",
        text: "Añade naves para empezar ",
        icon: "warning",
        confirmButtonText: "Volver",
      });
    }
  }

  cambiarImagen(id) {
    let imagen = "";
    if (this.shadowRoot.getElementById("dado" + id).value === "1") {
      imagen =
        "http://cloud-3.steamusercontent.com/ugc/1267149075135755317/951CEBBAEEAA63D90049D9A73F62CEA3FCC1F282/";
    }
    if (this.shadowRoot.getElementById("dado" + id).value === "2") {
      imagen =
        "http://cloud-3.steamusercontent.com/ugc/1267149075135750280/5AB0D8EB4081567D907D5D227FD75037A050C552/";
    }
    if (this.shadowRoot.getElementById("dado" + id).value === "3") {
      imagen =
        "http://cloud-3.steamusercontent.com/ugc/1267149075135741408/0243040F923AB1C782E52A712DCF5A01F7FC70B4/";
    }
    if (this.shadowRoot.getElementById("dado" + id).value === "4") {
      imagen =
        "http://cloud-3.steamusercontent.com/ugc/1267149075135753492/762FC7AF3C8EFB9945C53840E58CB830541DBB51/";
    }
    this.shadowRoot.getElementById("imagenCanon" + id).src = imagen;
  }

  renderDados(funcionAdd, funcionRemove, numDados, id) {
    return html` <div class="containerDados">
      <p>Cantidad dados tipo: ${numDados}</p>
      <img
        src="http://cloud-3.steamusercontent.com/ugc/1267149075135755317/951CEBBAEEAA63D90049D9A73F62CEA3FCC1F282/"
        id="imagenCanon${id}"
        alt="canon"
        width="60"
        height="60"
      />
      <div class="containerMasMenos">
        <button class="buttonMasMenos" @click=${funcionRemove}>-</button
        ><button class="buttonMasMenos" @click=${funcionAdd}>+</button>
      </div>
      <select
        class="dadeSelector"
        id="dado${id}"
        @change="${() => this.cambiarImagen(id)}"
      >
        <option value="1">Ionic Canon (1)</option>
        <option value="2">Plasma Canon (2)</option>
        <option value="3">Soliton Canon (3)</option>
        <option value="4">Antimatter Canon (4)</option>
      </select>
    </div>`;
  }
  render() {
    return html`
    <div class="mainContainer"> 
    <h3>JUGADOR </h3>
    <select class="selectorJugador" id="selectorJugador" >
    <option value="atacante">Atacante</option>
    <option value="defensor">Defensor</option>
  </select>


    <h4>NAVE </h4>
    <select class="selectorNave" id="selectorNave">
    <option value="interceptor">Interceptor </option>
    <option value="dreadnought">Dreadnought</option>
    <option value="cruiser">Cruiser</option>
    <option value="deathmoon">Deathmoon</option>
    <option value="ancient" >Ancient</option>
  </select>



    <h4>DADOS</h4>
    
    ${this.renderDados(
      this.addDadoUno,
      this.removeDadoUno,
      this.numeroDadosUno,
      1
    )}
    
    <div class=hidden id=panelDadoDos>
    ${this.renderDados(
      this.addDadoDos,
      this.removeDadoDos,
      this.numeroDadosDos,
      2
    )}
    
    </div>
    
    <div class=hidden id=panelDadoTres>
    ${this.renderDados(
      this.addDadoTres,
      this.removeDadoTres,
      this.numeroDadosTres,
      3
    )}
    
    </div>
    <div class=hidden id=botonQuitar>
    <button class="buttonMove" @click=${
      this.ponerDadoMenos
    }>Quitar cañón</button>
    
    </div>
    <button class="buttonMove" @click=${
      this.ponerDadoMas
    }>Añadir tipo cañón</button>
    <p><img src="https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/18ccde6e-244e-42a5-aee2-e09ead4dd309-4579d050106fd71f52776c1a7e3de08d.png" alt="hull">  HULL ${
      this.escudo
    }</p>
    <div class="containerMasMenos">
      <button class="buttonMasMenos" @click=${
        this.removeEscudo
      }>-</button><button class="buttonMasMenos" @click=${
      this.addEscudo
    }>+</button></div>
    

    <p><img src="https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/28d09846-3441-42f3-93eb-37d8c4eec70b-4579d050106fd71f52776c1a7e3de08d.png" alt="iniciativa"> INICIATIVA ${
      this.iniciativa
    }</p>
    <div class="containerMasMenos"><button class="buttonMasMenos" @click=${
      this.removeIniciativa
    }>-</button><button class="buttonMasMenos" @click=${
      this.addIniciativa
    }>+</button></div>
    
    
    <p><img src="https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/f5248c43-3f36-4150-b24e-e5c1f04be785-4579d050106fd71f52776c1a7e3de08d.png" alt="shield"> SHIELD ${
      this.negativos
    }</p>
    <div class="containerMasMenos"><button class="buttonMasMenos" @click=${
      this.removeNegativos
    }>-</button><button class="buttonMasMenos" @click=${
      this.addNegativos
    }>+</button>
    </div>
   
    <p><img src="https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/cbd51eaa-6838-46de-a93b-e0e3aeee508d-4579d050106fd71f52776c1a7e3de08d.png" alt="Computers "> COMPUTER  ${
      this.positivos
    }</p>
    <div class="containerMasMenos"><button class="buttonMasMenos" @click=${
      this.removePositivos
    }>-</button><button class="buttonMasMenos" @click=${
      this.addPositivos
    }>+</button>
    </div>
    </br>
    
    <p>Cantidad naves ${
      this.numeroNavesTipo
    }</p>   <div class="containerMasMenos"><button class="buttonMasMenos" @click=${
      this.removeNave
    }>-</button><button class="buttonMasMenos" @click=${this.addNave}>+</button>
    </div>
    </br>
 
    <button class="buttonMove" @click=${
      this.crearNave
    }>Añadir nave a la batalla</button>

    <button class="buttonMove" @click=${
      this.iniciarBatalla
    }>Iniciar batalla</button>

    </div>   `;
  }
}
customElements.define("formulario-simple", FormularioSImple);
