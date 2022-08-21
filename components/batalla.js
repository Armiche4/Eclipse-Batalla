import { LitElement, html, css } from "../node_modules/lit";
import {
  getCombatientes,
  getOrdenIniciativa,
  potenciaAtaque,
} from "../servicios/funciones.js";

export class Batalla extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .containerContestans {
        display: flex;
        justify-content: space-between;
        border: 1px solid black;
        margin-bottom: 15px;
      }
      .vs {
        font-size: 50px;
      }
      .combatienteTitulo {
        font-size: 30px;
        text-transform: capitalize;
      }
      button {
        border-radius: 50px;
        animation-name: example;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        border-radius: 0.5rem;
        box-sizing: border-box;
        padding: 0.25rem 0.5rem;
        text-align: center;
        text-decoration: none #d1d5db solid;
      }
      @keyframes example {
        0% {
          background-color: red;
        }
        50% {
          background-color: #b22222;
        }
        100% {
          background-color: #dc143c;
        }
      }
      .ButtonFinalizar {
        color: rgb(255, 255, 255);
        background-color: #2c2b2b;
        border: 1px solid grey;
        text-transform: uppercase;
        margin: 5px;
        font-size: 16px;
        font-weight: 500;
        border-radius: 10px;

        padding: 13px 30px;
        animation-name: caca;
      }
      .ButtonFinalizar:active {
        color: black;
        background-color: #c1c1c1;

        border-color: black;
      }

      .combatiente {
        margin: 0 15px 15px;
      }
      .mainContainer {
        padding: 10px;
        display: flex;
        flex-direction: column;
        max-width: 850px;
        margin: auto;
      }
      h1 {
        margin: 15px auto 20px;
      }
      .sentenciaAtaque {
        font-size: 20px;
        margin: 0px auto 15px;
        font-weight: bold;
        text-transform: capitalize;
        text-align: center;
      }
      .sentenciaAtaque--dispara {
        font-size: 20px;
        font-weight: bold;
        text-transform: capitalize;
        text-align: center;
        margin: 0 auto;
      }
      .containerDisparando {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        margin: 10px;
        padding: 20px;
      }
      h5 {
        margin: 10px auto;
      }
      ul {
        margin: 0 auto;
      }
      .tituloNave {
        margin-bottom: 5px;
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        text-transform: capitalize;
      }
      .sinPunto {
        list-style-type: none;
        margin: 0px 35px;
      }
      .tituloCantidadNave {
        font-size: 15px;
        text-transform: capitalize;
        font-weight: bold;
      }

      @media only screen and (min-width: 600px) {
        .contenedorBatalla {
          display: flex;
          justify-content: center;
        }
      }
    `,
  ];
  static properties = {
    atacanteNaves: { type: Array },
    defensorNaves: { type: Array },

    ordenIniciativa: { type: Array },

    naveDisparando: { type: Object },
    navesDisparadas: { type: Array },
    dadosAtaque: { type: Array },

    dadoAtaqueElegido: { type: Boolean },
    dadoAtaqueElegidoEstadisticas: { type: Object },

    turno: { type: Number },
  };
  constructor() {
    super();

    this.dadoAtaqueElegido = false;
    this.atacanteNaves = getCombatientes("atacante");
    this.defensorNaves = getCombatientes("defensor");

    this.ordenIniciativa = getOrdenIniciativa(
      this.atacanteNaves,
      this.defensorNaves
    );

    this.turno = 0;

    this.anadirIndiceCadaNaveIniciativa();
    console.log(this.ordenIniciativa);

    this.empezarBatalla();
  }

  anadirIndiceCadaNaveIniciativa() {
    this.ordenIniciativa.map((nave, index) => {
      nave.id = index;
    });
  }

  empezarBatalla() {
    this.misiles();

    this.naveDisparando = this.ordenIniciativa[this.turno];

    this.dadosAtaque = this.accionDados(this.ordenIniciativa[this.turno]);
    this.impactoDadosDefensa(
      this.dadosAtaque,
      this.turno,
      this.naveDisparando.jugador
    );
  }

  comnprobarBotones() {
    if (this.renderRoot != undefined) {
      for (
        let i = 0;
        i < this.renderRoot.querySelectorAll(".atacarButton").length;
        i++
      ) {
        this.renderRoot.querySelectorAll(".atacarButton")[i].textContent =
          "Atacar";

        this.renderRoot.querySelectorAll(".atacarButton")[i].disabled = false;
      }
    }
  }

  misiles() {
    //TODO
  }

  accionDados(naveDisparando) {
    let todosDados = [];
    //cantidad de naves iguales disparando
    for (let k = 0; k < naveDisparando.cantidadNaves; k++) {
      console.log(naveDisparando.cantidadNaves, "cantidad naves disparando");

      //bucle para saber con cuentos dados se tira
      for (let i = 0; i < naveDisparando.dados.length; i++) {
        const dados = {
          numeroTiradas: [],
          potenciaImpacto: naveDisparando.dados[i].dadosFuerza,
        };
        for (let j = 0; j < naveDisparando.dados[i].dadosNumero; j++) {
          const numeroDadoMasPositivo = potenciaAtaque();
          console.log(numeroDadoMasPositivo, "numero dado sin el positivo");
          dados.numeroTiradas.push(numeroDadoMasPositivo);
        }
        todosDados.push(dados);
      }
    }
    return todosDados;
  }

  impactoDadosDefensa(todosDados, indice, equipo) {
    if (equipo === "atacante") {
      this.navesDisparadas = this.defensorNaves;
    } else {
      this.navesDisparadas = this.atacanteNaves;
    }
  }

  dadoAtaqueElegidoFuncion(tirada, potencia, positivo, button) {
    button.disabled = true;
    button.textContent = "Usado";
    this.dadoAtaqueElegido = true;

    this.dadoAtaqueElegidoEstadisticas = {
      tirada: tirada,
      potencia: parseFloat(potencia),
      positivo: positivo,
    };
  }

  recibirDano(nave) {
    nave.escudos = nave.escudos - this.dadoAtaqueElegidoEstadisticas.potencia;

    if (nave.escudos < 0 && nave.cantidadNaves === 1) {
      //actualizo por el momento la cantidad de naves para que se vea en pantalla el cambio
      //chapucilla momentanea
      nave.tipoNave = "MUERTE";
      this.ordenIniciativa = this.ordenIniciativa.filter(
        (naves) => naves.id != nave.id
      );
    }
    if (nave.escudos < 0 && nave.cantidadNaves > 1) {
      nave.cantidadNaves = nave.cantidadNaves - 1;

      nave.escudos = JSON.parse(
        localStorage.getItem("Nave" + nave.tipoNave + nave.jugador)
      ).escudos;
    }

    this.actualizarLista(nave);

    this.dadoAtaqueElegido = false;
  }

  finTurno() {
    if (
      this.dadoAtaqueElegido === true &&
      this.shadowRoot.getElementById("botonRecivir") === null &&
      this.dadoAtaqueElegido === true
    ) {
      this.dadoAtaqueElegido = false;
    }

    let botonesDisabled = true;
    for (
      let i = 0;
      i < this.renderRoot.querySelectorAll(".atacarButton").length;
      i++
    ) {
      if (
        this.renderRoot.querySelectorAll(".atacarButton")[i].disabled === false
      ) {
        botonesDisabled = false;
      }
    }
    if (
      (this.dadoAtaqueElegido === false && botonesDisabled === true) ||
      this.renderRoot.querySelectorAll(".atacarButton").length === 0
    ) {
      if (this.dadoAtaqueElegido === false) {
        //aumentar el turno , comprobar que no sea mas largo que la lista
        if (this.turno >= this.ordenIniciativa.length - 1) {
          this.turno = 0;
        } else {
          this.turno++;
        }

        console.log(this.ordenIniciativa, "naves por el momento");

        this.comnprobarBotones();
        this.empezarBatalla();
      }
    }
  }

  actualizarLista(nave) {
    this.ordenIniciativa.map((naveLista) => {
      if (naveLista.id === nave.id) {
        naveLista = nave;
      }
    });
  }

  navesActualesBando(participante) {
    return this.ordenIniciativa.filter((nave) => nave.jugador === participante);
  }

  comprobarFin() {
    let acabarPatida = true;
    for (let i = 0; i < this.navesDisparadas.length; i++) {
      if (this.navesDisparadas[i].tipoNave != "MUERTE") {
        acabarPatida = false;
      }
    }
    if (acabarPatida === true) {
      Swal.fire({
        title: "VICTORIA!",
        text: "Gana el " + this.naveDisparando.jugador,
        icon: "success",
        confirmButtonText: "Volver",
      }).then((result) => {
        if (result.isConfirmed) {
          history.back();
        }
      });
    }
    return acabarPatida;
  }

  //RENDER
  renderImagenCanon(potenciaImpacto) {
    let imagen = "";
    if (potenciaImpacto === "1") {
      imagen = "../assets/ionico.PNG";
    }
    if (potenciaImpacto === "2") {
      imagen = "../assets/antimateria.PNG";
    }
    if (potenciaImpacto === "3") {
      imagen = "../assets/soliton.PNG";
    }
    if (potenciaImpacto === "4") {
      imagen = "../assets/plasma.PNG";
    }
    return html`<img
      src=${imagen}
      alt=${potenciaImpacto}
      width="25"
      height="25"
    />`;
  }

  renderDadosLanzados() {
    return html` <h5>Lanzo dados:</h5>
      ${this.dadosAtaque?.map(
        (dado) =>
          html`<h5>DADO</5><li>
           ${this.renderImagenCanon(dado.potenciaImpacto)} tiradas sin positvo
          ${this.naveDisparando.positivos}:
          ${dado.numeroTiradas?.map(
            (tirada) =>
              html`<li>
                ${tirada}
                ${tirada + this.naveDisparando.positivos > 5
                  ? html` <button
                      class="atacarButton"
                      @click=${(button) =>
                        this.dadoAtaqueElegidoFuncion(
                          tirada,
                          dado.potenciaImpacto,
                          this.naveDisparando.positivos,
                          button.target
                        )}
                      class="botondadoAtaqueElegido"
                    >
                      Atacar
                    </button>`
                  : ""}
              </li>`
          )}
        </li>`
      )}`;
  }

  renderNavesAtacadas() {
    return html` ${this.navesDisparadas?.map(
      (nave) =>
        html` <ul>
          ${!(nave.tipoNave === "MUERTE")
            ? html` <p class="tituloNave">${nave.tipoNave}</p>

                <li class="sinPunto">
                  <img
                    src="https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/18ccde6e-244e-42a5-aee2-e09ead4dd309-4579d050106fd71f52776c1a7e3de08d.png"
                    alt="hull"
                  />
                  ${nave.escudos} |
                  <img
                    src="    https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/f5248c43-3f36-4150-b24e-e5c1f04be785-4579d050106fd71f52776c1a7e3de08d.png"
                    alt="shield"
                  />
                  ${nave.negativos} |
                  <img
                    src=" https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/cbd51eaa-6838-46de-a93b-e0e3aeee508d-4579d050106fd71f52776c1a7e3de08d.png"
                    alt="Computers "
                  />
                  ${nave.positivos}
                  ${nave.dados?.map(
                    (dado) =>
                      html`
                        <li>
                          ${this.renderImagenCanon(dado.dadosFuerza)} cantidad:
                          ${dado.dadosNumero}
                        </li>
                      `
                  )}
                  <p class="tituloCantidadNave">
                    cantidad de naves: ${nave.cantidadNaves}
                  </p>
                  ${this.dadoAtaqueElegido === true &&
                  (parseInt(nave.negativos) +
                    parseInt(this.dadoAtaqueElegidoEstadisticas.positivo) +
                    parseInt(this.dadoAtaqueElegidoEstadisticas.tirada) >
                    5 ||
                    this.dadoAtaqueElegidoEstadisticas.tirada > 5)
                    ? html` <button
                        id="botonRecivir"
                        @click=${() => this.recibirDano(nave)}
                      >
                        Recibir daño
                      </button>`
                    : ""}
                </li>`
            : ""}
        </ul>`
    )}`;
  }

  renderNavesRestantes(participante) {
    let combatiente = this.navesActualesBando(participante);

    return html`<div class="combatiente">
      <p class="combatienteTitulo">${participante}</p>

      <ul>
        ${combatiente.map((nave) => html` <li>${nave.tipoNave}</li> `)}
      </ul>
    </div> `;
  }
  renderNavesAtacasPierden() {
    return html`
      <div class="mainContainer">
        <p class="sentenciaAtaque">Recibe el daño:</p>
        <div class="containerDisparando">${this.renderNavesAtacadas()}</div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="mainContainer">
        <div class="containerContestans">
          ${this.renderNavesRestantes("defensor")}
          <p class="vs">vs</p>
          ${this.renderNavesRestantes("atacante")}
        </div>

        <div class="contenedorBatalla">
          <div class="mainContainer">
            <p class="sentenciaAtaque--dispara">Dispara</p>
            <p class="sentenciaAtaque">
              ${this.naveDisparando.jugador} con ${this.naveDisparando.tipoNave}
            </p>

            <div class="containerDisparando">${this.renderDadosLanzados()}</div>
          </div>
          ${
            this.comprobarFin() === false ? this.renderNavesAtacasPierden() : ""
          }
          </div>
          <button class="ButtonFinalizar" @click=${this.finTurno}>
            Acabar turno
          </button>
        </div>
      </div>
    `;
  }
}
customElements.define("eclipse-batalla", Batalla);
