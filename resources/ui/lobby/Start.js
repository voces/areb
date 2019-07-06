
import {
	LitElement, html, css
} from "https://unpkg.com/lit-element/lit-element.js?module";

export default class Start extends LitElement {

	static get styles() {

		return css`
			:host {
				display: inline-block;
			}
			button {
				color: inherit;
				font-size: inherit;
				font-weight: inherit;
				font-family: inherit;
				padding: 0.5em 1.5em;
				width: 100%;
				background-color: rgba(50, 70, 120, 0.8);
			}
		`;

	}

	render() {

		const { click } = this;

		return html`
			<button @click=${() => click && click()}>
				Start
			</button>
		`;

	}

}

customElements.define( "wc-lobby-start", Start );
