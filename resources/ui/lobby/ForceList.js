
import {
	LitElement, html, css
} from "https://unpkg.com/lit-element/lit-element.js?module";

export default class ForceList extends LitElement {

	static get styles() {

		return css`
			.header-1 { font-size: 150%; }
			.header-2 {
				font-size: 80%;
				padding-top: 1em;
				cursor: pointer;
			}
			.players {
				display: grid;
				grid-template-columns: 1fr 100px;
			}
		`;

	}

	onForceClick( force ) {

		const currentIndex = force.players.indexOf( this.localPlayer );
		let nextIndex = 0;
		if ( currentIndex >= 0 ) {

			const tryIndex = nextIndex = force.players.findIndex( ( player, index ) =>
				index > currentIndex && ! player.here );
			if ( tryIndex >= 0 ) nextIndex = tryIndex;
			else nextIndex = force.players.findIndex( player => ! player.here );

		}

		if ( nextIndex === - 1 ) return;

		const nextPlayer = force.players[ nextIndex ];
		nextPlayer.name = this.localPlayer.name;
		nextPlayer.here = true;
		this.localPlayer.here = false;
		this.localPlayer.name = this.slots[ this.localPlayer.id ].name;

		this.localPlayer = nextPlayer;
		if ( this.handleLocalPlayerChange )
			this.handleLocalPlayerChange( this.localPlayer );

	}

	render() {

		return html`
			<div class="header-1">${this.name}</div>
			${this.forces.map( force => html`
			<div>
				<div class="header-2" @click="${() => this.onForceClick( force )}">${force.name}</div>
				${force.players.map( player => html`
				<div class="players">
					<span>${player.name}</span>
					<span>${player.race}</span>
				</div>
				` )}
			</div>
			` )}
		`;

	}

}

customElements.define( "wc-lobby-force-list", ForceList );
