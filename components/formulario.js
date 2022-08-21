import { LitElement, html, css } from "../node_modules/lit";
import { addItem, removeItem } from "../servicios/funciones.js";

export class Formulario extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .hidden {
        display: none;
      }
      .coral {
        background-color: coral;
      }
      .green {
        background-color: green;
      }
    `,
  ];

  static properties = {
    numeroDadosUno: { type: Number },
    numeroDadosDos: { type: Number },
    numeroDadosTres: { type: Number },

    numTipoNaves: { type: Number },

    naveUno: { type: Object },
    numeroNavesTipoUno: { type: Number },

    naveDos: { type: Object },
    numeroNavesTipoDos: { type: Number },

    naveTres: { type: Object },
    numeroNavesTipoTres: { type: Number },

    naveCuatro: { type: Object },
    numeroNavesTipoCuatro: { type: Number },

    escudoUno: { type: Number },
    escudoDos: { type: Number },
    escudoTres: { type: Number },
    escudoCuatro: { type: Number },

    iniciativaUno: { type: Number },
    iniciativaDos: { type: Number },
    iniciativaTres: { type: Number },
    iniciativaCuatro: { type: Number },

    positivosUno: { type: Number },
    positivosDos: { type: Number },
    positivosTres: { type: Number },
    positivosCuatro: { type: Number },

    negativos: { type: Number },

    numTipoDados: { type: Number },
  };

  constructor() {
    super();
    this.numeroDadosUno = 1;
    this.numeroDadosDos = 1;
    this.numeroDadosTres = 1;

    this.escudoUno = 0;
    this.escudoDos = 0;
    this.escudoTres = 0;
    this.escudoCuatro = 0;

    this.iniciativaUno = 0;
    this.iniciativaDos = 0;
    this.iniciativaTres = 0;
    this.iniciativaCuatro = 0;

    this.negativos = 0;
    this.positivos = 0;
    this.numTipoDados = 1;

    this.numTipoNaves = 1;
    this.numeroNavesTipoUno = 1;
    this.numeroNavesTipoDos = 1;
    this.numeroNavesTipoTres = 1;
    this.numeroNavesTipoCuatro = 1;
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

    this.naveUno = {
      dados: dados,
      escudos: this.escudos,
      iniciativa: this.iniciativa,
      negativos: this.negativos,
      positivos: this.positivos,
      cantidadNaves: this.numeroNavesTipoUno,
    };

    console.log(this.naveUno);
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
    if (this.numeroDadosUno > 0) {
      this.numeroDadosUno--;
    }
  }
  removeDadoDos() {
    if (this.numeroDadosDos > 0) {
      this.numeroDadosDos--;
    }
  }
  removeDadoTres() {
    if (this.numeroDadosTres > 0) {
      this.numeroDadosTres--;
    }
  }
  //ESCUDOS
  addEscudoUno() {
    this.escudoUno = addItem(this.escudoUno);
  }
  removeEscudoUno() {
    this.escudoUno = removeItem(this.escudoUno);
  }
  addEscudoDos() {
    this.escudoDos = addItem(this.escudoDos);
  }
  removeEscudoDos() {
    this.escudoDos = removeItem(this.escudoDos);
  }
  addEscudoTres() {
    this.escudoTres = addItem(this.escudoTres);
  }
  removeEscudoTres() {
    this.escudoTres = removeItem(this.escudoTres);
  }
  addEscudoCuatro() {
    this.escudoCuatro = addItem(this.escudoCuatro);
  }
  removeEscudoCuatro() {
    this.escudoCuatro = removeItem(this.escudoCuatro);
  }

  //INICIATIVA

  addIniciativaUno() {
    this.iniciativaUno = addItem(this.iniciativaUno);
  }
  removeIniciativaUno() {
    this.iniciativaUno = removeItem(this.iniciativaUno);
  }
  addIniciativaDos() {
    this.iniciativaDos = addItem(this.iniciativaDos);
  }
  removeIniciativaDos() {
    this.iniciativaDos = removeItem(this.iniciativaDos);
  }
  addIniciativaTres() {
    this.iniciativaTres = addItem(this.iniciativaTres);
  }
  removeIniciativaTres() {
    this.iniciativaTres = removeItem(this.iniciativaTres);
  }
  addIniciativaCuatro() {
    this.iniciativaCuatro = addItem(this.iniciativaCuatro);
  }
  removeIniciativaCuatro() {
    this.iniciativaCuatro = removeItem(this.iniciativaCuatro);
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
    if (this.positivos > 0) {
      this.positivos--;
    }
  }
  //TODO HACER INTERACTIVO LOS SELECT SI NO A LO SIMPLE
  ponerDadoMas() {
    if (this.numTipoDados < 3) {
      if (this.numTipoDados === 1) {
        for (
          let i = 0;
          i < this.shadowRoot.getElementById("dado2").length;
          i++
        ) {
          if (
            this.shadowRoot.getElementById("dado2")[i].text ===
            this.shadowRoot.getElementById("dado1").value
          ) {
            this.shadowRoot
              .getElementById("dado2")
              .removeChild(this.shadowRoot.getElementById("dado2")[i]);
          }
        }

        this.shadowRoot.getElementById("panelDadoDos").className = "coral";
        this.shadowRoot.getElementById("botonQuitar").className = "green";
      }
      if (this.numTipoDados === 2) {
        for (
          let i = 0;
          i < this.shadowRoot.getElementById("dado3").length;
          i++
        ) {
          if (
            this.shadowRoot.getElementById("dado3")[i].text ===
            this.shadowRoot.getElementById("dado2").value
          ) {
            this.shadowRoot
              .getElementById("dado3")
              .removeChild(this.shadowRoot.getElementById("dado3")[i]);
          }
        }
        this.shadowRoot.getElementById("panelDadoTres").className = "coral";
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
        this.shadowRoot.getElementById("panelNaveDos").className = "coral";
      }
      if (this.numTipoNaves === 2) {
        this.shadowRoot.getElementById("panelNaveTres").className = "green";
      }
      if (this.numTipoNaves === 3) {
        this.shadowRoot.getElementById("panelNaveCuatro").className = "coral";
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
    this.numeroNavesTipoUno++;
  }

  removeNave() {
    if (this.numeroNavesTipoUno > 0) {
      this.numeroNavesTipoUno--;
    }
  }

  render() {
    return html`
      ${this.renderNave(
        this.addNave,
        this.removeNave,
        this.numeroNavesTipoUno,
        "NaveTipoUno",
        this.addEscudoUno,
        this.removeEscudoUno,
        this.escudoUno,
        this.addIniciativaUno,
        this.removeIniciativaUno,
        this.iniciativaUno
      )}
      <div class="hidden" id="panelNaveDos">
        ${this.renderNave(
          this.addNave,
          this.removeNave,
          this.numeroNavesTipoDos,
          "NaveTipoDos",
          this.addEscudoDos,
          this.removeEscudoDos,
          this.escudoDos,
          this.addIniciativaDos,
          this.removeIniciativaDos,
          this.iniciativaDos
        )}
      </div>
      <div class="hidden" id="panelNaveTres">
        ${this.renderNave(
          this.addNave,
          this.removeNave,
          this.numeroNavesTipoTres,
          "NaveTipoTres",
          this.addEscudoTres,
          this.removeEscudoTres,
          this.escudoTres,
          this.addIniciativaTres,
          this.removeIniciativaTres,
          this.iniciativaTres
        )}
      </div>
      <div class="hidden" id="panelNaveCuatro">
        ${this.renderNave(
          this.addNave,
          this.removeNave,
          this.numeroNavesTipoCuatro,
          "NaveTipoCuatro",
          this.addEscudoCuatro,
          this.removeEscudoCuatro,
          this.escudoCuatro,
          this.addIniciativaCuatro,
          this.removeIniciativaCuatro,
          this.iniciativaCuatro
        )}
      </div>

      <button @click=${this.RemoveTipoNave}>Quitar Tipo Nave</button>
      <button @click=${this.addTipoNave}>Añadir Tipo Nave</button>
    `;
  }

  renderDados(funcionAdd, funcionRemove, numDados, id) {
    return html` <div>
      <p>Numero de DADOS ${numDados}</p>
      <button @click=${funcionRemove}>-</button
      ><button @click=${funcionAdd}>+</button>
      <select class="dadeSelector" id="dado${id}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
      </select>
    </div>`;
  }

  renderNave(
    funcionAdd,
    funcionRemove,
    numNaves,
    id,
    addEscudo,
    removeEscudo,
    escudos,
    addIniciativa,
    removeIniciativa,
    iniciativa
  ) {
    return html`
    
<h3>NAVE ${id}</h3>
<h4>DADOS</h4>

${this.renderDados(this.addDadoUno, this.removeDadoUno, this.numeroDadosUno, 1)}

<div class=hidden id=panelDadoDos>
${this.renderDados(this.addDadoDos, this.removeDadoDos, this.numeroDadosDos, 2)}

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
<button @click=${this.ponerDadoMenos}>quitar dado</button>

</div>
<button @click=${this.ponerDadoMas}>Añadir dado</button>

<p>ESCUDO ${escudos}</p><button @click=${removeEscudo}>-</button><button @click=${addEscudo}>+</button>


<p>INICIATIVA ${iniciativa}</p><button @click=${removeIniciativa}>-</button><button @click=${addIniciativa}>+</button>


<p>DEFENSA DADOS ${this.negativos}</p><button @click=${
      this.removeNegativos
    }>-</button><button @click=${this.addNegativos}>+</button>


<p>ATAQUE DADOS ${this.positivos}</p><button @click=${
      this.removePositivos
    }>-</button><button @click=${this.addPositivos}>+</button>
</br>

<p>Numero TIPO NAVE UNO ${numNaves}</p><button @click=${funcionRemove}>-</button><button @click=${funcionAdd}>+</button>
</br>

<button @click=${this.crearNave}>Nave lista</button>

    `;
  }
}
customElements.define("eclipse-formulario", Formulario);
