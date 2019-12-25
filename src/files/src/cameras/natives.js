
export default map => ( {
	SetCameraBounds: ( x1, y1, x2, y2, x3, y3, x4, y4 ) => {

		map.cameraControls.minX = Math.min( x1, x2, x3, x4 ) / 128;
		map.cameraControls.maxX = Math.max( x1, x2, x3, x4 ) / 128 + 2;
		map.cameraControls.minY = Math.min( y1, y2, y3, y4 ) / 128 - 4;
		map.cameraControls.maxY = Math.max( y1, y2, y3, y4 ) / 128;

	},
	GetCameraMargin: whichMargin => {

		switch ( whichMargin ) {

			case 0: return 512; // left
			case 1: return 512; // right
			case 2: return 256; // top
			case 3: return 256; // bottom

		}

	}
} );
