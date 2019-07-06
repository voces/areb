
import {
	LitElement, html, css
} from "https://unpkg.com/lit-element/lit-element.js?module";
import "./ForceList.js";
import "./Start.js";

export default class Lobby extends LitElement {

	static get styles() {

		return css`
			:host {
				background-color: rgba(50, 70, 120, 0.8);
				padding: 1em;
				position: absolute;
				top: 1em;
				left: 1em;
				font-family: Verdana, Geneva, sans-serif;
				font-weight: 700;
				color: white;
				border-radius: 1em;
			}
			wc-lobby-start {
				width: 100%;
				margin-top: 1em;
			}
		`;

	}

	constructor( props ) {

		super();

		Object.assign( this, props );

	}

	render() {

		const { name, forces, slots, localPlayer, handleLocalPlayerChange, onStart } = this;

		return html`
			<wc-lobby-force-list
				.name=${name}
				.forces=${forces}
				.slots=${slots}
				.localPlayer=${localPlayer}
				.handleLocalPlayerChange=${handleLocalPlayerChange}>
			</wc-lobby-force-list>
			<wc-lobby-start .click=${() => onStart && onStart()}></wc-lobby-start>
		`;

	}

}

customElements.define( "wc-lobby", Lobby );
