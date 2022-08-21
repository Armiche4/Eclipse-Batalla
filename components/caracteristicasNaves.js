import { LitElement, html, css } from "lit";

export class CaracteristicasNAves extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .sinPunto {
        list-style-type: none;
      }
    `,
  ];

  static properties = {
    nave: { type: Object },
  };
  constructor() {
    super();
  }

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

  render() {
    return html` <li class="sinPunto">
      <img
        src="https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/18ccde6e-244e-42a5-aee2-e09ead4dd309-4579d050106fd71f52776c1a7e3de08d.png"
        alt="hull"
      />
      ${this.nave.escudos} |
      <img
        src="https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/f5248c43-3f36-4150-b24e-e5c1f04be785-4579d050106fd71f52776c1a7e3de08d.png"
        alt="shield"
      />
      ${this.nave.negativos} |
      <img
        src="https://assets.dized.app/project/5f042c9e-22cc-4c59-be85-6e0a55abd8d3/en-US/eb51938ff9a3aaa135a6ae051260d1ab/cbd51eaa-6838-46de-a93b-e0e3aeee508d-4579d050106fd71f52776c1a7e3de08d.png"
        alt="Computers "
      />
      ${this.nave.positivos}
      ${this.nave.dados?.map(
        (dado) =>
          html`
            <li>
              ${this.renderImagenCanon(dado.dadosFuerza)} cantidad:
              ${dado.dadosNumero}
            </li>
          `
      )}
      <p class="tituloCantidadNave">
        cantidad de naves: ${this.nave.cantidadNaves}
      </p>
    </li>`;
  }
}
customElements.define("caracteristicas-naves", CaracteristicasNAves);
