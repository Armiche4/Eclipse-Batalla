import { LitElement, html, css } from "../node_modules/lit";
import { getCombatientes } from "../servicios/funciones.js";
export class NavesSEleccionadas extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .combatientesContainer {
        display: flex;
        justify-content: space-between;
        border: 1px solid black;
        margin-bottom: 15px;
        padding: 25px;
      }
      .mainContainer {
        border: 1px solid black;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .buttonMove {
        color: #fff;
        background-color: grey;
        border: 1px solid grey;

        margin: 5px auto;
        font-size: 16px;

        border-radius: 10px;
        width: 156px;
        padding: 5px 5px;
      }
      h2 {
        margin: 5px auto;
      }
      li {
        text-transform: capitalize;
      }
      .buttonBorrar {
        color: white;
        background-color: red;
        text-transform: capitalize;
        margin: 2.5px;
      }
      button:active {
        color: black;
        background-color: #c1c1c1;

        border-color: black;
      }
    `,
  ];

  static properties = {
    atacanteNaves: { type: Array },
    defensorNaves: { type: Array },
  };
  constructor() {
    super();
    this.atacanteNaves = getCombatientes("atacante");
    this.defensorNaves = getCombatientes("defensor");
  }

  borrarTodo() {
    let listaEliminar = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (
        localStorage.getItem(localStorage.key(i)).substring(0, 25) ===
        '{"dados":[{"dadosNumero":'
      ) {
        listaEliminar.push(localStorage.key(i));
      }
    }

    for (let i = 0; i < listaEliminar.length; i++) {
      localStorage.removeItem(listaEliminar[i]);
    }
    location.reload();
  }

  borrarUno(tipoNave, combatiente) {
    localStorage.removeItem("Nave" + tipoNave + combatiente);
    location.reload();
  }

  render() {
    if (this.atacanteNaves.length + this.defensorNaves.length === 0) {
      return nothing;
    } else {
      return this.mainRender();
    }
  }

  mainRender() {
    return html`
      <div class="mainContainer">
        <h2>Naves Seleccionadas</h2>
        <div class="combatientesContainer">
          <div>
            <h3>Atacantes</h3>
            ${this.atacanteNaves?.map(
              (item) =>
                html`<li>
                    ${item.tipoNave}
                    <button
                      class="buttonBorrar"
                      @click=${() => this.borrarUno(item.tipoNave, "atacante")}
                    >
                      x
                    </button>
                  </li>
                  <caracteristicas-naves .nave=${item}></caracteristicas-naves>`
            )}
          </div>
          <div>
            <h3>Defensores</h3>
            ${this.defensorNaves?.map(
              (item) =>
                html`<li>
                    ${item.tipoNave}
                    <button
                      class="buttonBorrar"
                      @click=${() => this.borrarUno(item.tipoNave, "defensor")}
                    >
                      x
                    </button>
                  </li>
                  <caracteristicas-naves
                    .nave=${item}
                  ></caracteristicas-naves> `
            )}
          </div>
        </div>
        <button class="buttonMove" @click=${this.borrarTodo}>
          Borrar todo
        </button>
      </div>
    `;
  }
}
customElements.define("naves-seleccionadas", NavesSEleccionadas);
