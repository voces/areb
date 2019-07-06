
// Pre-computed weights
// https://codegolf.stackexchange.com/questions/23362/sort-characters-by-darkness
const chars = [
	{ char: " ", weight: 0 },
	{ char: ".", weight: 118 },
	{ char: "`", weight: 147 },
	{ char: ":", weight: 236 },
	{ char: "'", weight: 360 },
	{ char: "\\", weight: 388 },
	{ char: ",", weight: 402 },
	{ char: "/", weight: 420 },
	{ char: "-", weight: 505 },
	{ char: ";", weight: 564 },
	{ char: "^", weight: 678 },
	{ char: "\"", weight: 684 },
	{ char: "!", weight: 689 },
	{ char: "|", weight: 696 },
	{ char: "_", weight: 1074 },
	{ char: "i", weight: 1202 },
	{ char: "?", weight: 1212 },
	{ char: "7", weight: 1215 },
	{ char: "j", weight: 1249 },
	{ char: "l", weight: 1289 },
	{ char: ")", weight: 1315 },
	{ char: "(", weight: 1333 },
	{ char: "t", weight: 1372 },
	{ char: "1", weight: 1393 },
	{ char: "r", weight: 1394 },
	{ char: "{", weight: 1463 },
	{ char: "+", weight: 1472 },
	{ char: "}", weight: 1500 },
	{ char: "*", weight: 1519 },
	{ char: "c", weight: 1552 },
	{ char: "s", weight: 1593 },
	{ char: "J", weight: 1630 },
	{ char: "v", weight: 1673 },
	{ char: ">", weight: 1688 },
	{ char: "<", weight: 1693 },
	{ char: "I", weight: 1829 },
	{ char: "5", weight: 1839 },
	{ char: "y", weight: 1858 },
	{ char: "]", weight: 1928 },
	{ char: "[", weight: 2000 },
	{ char: "3", weight: 2010 },
	{ char: "u", weight: 2057 },
	{ char: "2", weight: 2080 },
	{ char: "f", weight: 2111 },
	{ char: "=", weight: 2156 },
	{ char: "0", weight: 2166 },
	{ char: "e", weight: 2179 },
	{ char: "4", weight: 2205 },
	{ char: "x", weight: 2227 },
	{ char: "o", weight: 2281 },
	{ char: "a", weight: 2300 },
	{ char: "z", weight: 2315 },
	{ char: "n", weight: 2356 },
	{ char: "L", weight: 2360 },
	{ char: "b", weight: 2376 },
	{ char: "d", weight: 2422 },
	{ char: "T", weight: 2461 },
	{ char: "q", weight: 2490 },
	{ char: "8", weight: 2500 },
	{ char: "C", weight: 2505 },
	{ char: "V", weight: 2515 },
	{ char: "6", weight: 2531 },
	{ char: "#", weight: 2584 },
	{ char: "h", weight: 2622 },
	{ char: "9", weight: 2629 },
	{ char: "S", weight: 2631 },
	{ char: "$", weight: 2745 },
	{ char: "Y", weight: 2771 },
	{ char: "p", weight: 2797 },
	{ char: "k", weight: 2828 },
	{ char: "w", weight: 2863 },
	{ char: "U", weight: 2939 },
	{ char: "F", weight: 2999 },
	{ char: "%", weight: 3034 },
	{ char: "A", weight: 3052 },
	{ char: "N", weight: 3176 },
	{ char: "P", weight: 3184 },
	{ char: "Z", weight: 3381 },
	{ char: "g", weight: 3404 },
	{ char: "O", weight: 3488 },
	{ char: "m", weight: 3629 },
	{ char: "G", weight: 3639 },
	{ char: "D", weight: 3642 },
	{ char: "X", weight: 3644 },
	{ char: "R", weight: 3716 },
	{ char: "E", weight: 3733 },
	{ char: "K", weight: 3901 },
	{ char: "Q", weight: 3916 },
	{ char: "&", weight: 3955 },
	{ char: "B", weight: 4045 },
	{ char: "W", weight: 4174 },
	{ char: "H", weight: 4321 },
	{ char: "M", weight: 4341 },
	{ char: "@", weight: 61632 }
];

// Calculates the contrast of b versus a and c
const contrastCache = {};
const contrast = ( a, b, c ) => {

	const key = [ a, b, c ].filter( Boolean ).map( e => e.char ).join( "-" );
	if ( key in contrastCache ) return contrastCache[ key ];

	const sumContrast =
		( a ? b.weight / a.weight : 0 ) +
		( c ? c.weight / b.weight || Infinity : 0 );

	const contrast = a && b ? sumContrast / 2 : sumContrast;

	return contrastCache[ key ] = contrast;

};

const minIndex = arr => {

	let index = 0;
	let min = arr[ 0 ];
	for ( let i = 1; i < arr.length; i ++ )
		if ( arr[ i ] < min ) {

			index = i;
			min = arr[ i ];

		}

	return index;

};

const cache = [];
export default length => {

	if ( typeof length !== "number" || length < 2 || length > chars.length )
		throw new Error( `Invalid length! Must be a number between 2 and ${chars.length} (inclusive)` );

	if ( cache[ length ] ) return cache[ length ];

	const elements = [ ...chars ];
	const contrasts = elements.map( ( _, i ) => contrast( elements[ i - 1 ], elements[ i ], elements[ i + 1 ] ) );

	while ( elements.length > length ) {

		const toRemove = minIndex( contrasts );

		elements.splice( toRemove, 1 );
		contrasts.splice( toRemove, 1 );

		// Simple case: Given `a b c d e`, and say we remove c, we want to recalculate b and d
		// Edge case: Given `a b c d e`, and say we remove e, we want to recalculate d
		contrasts[ toRemove - 1 ] = contrast( elements[ toRemove - 2 ], elements[ toRemove - 1 ], elements[ toRemove ] );
		if ( toRemove < elements.length ) contrasts[ toRemove ] = contrast( elements[ toRemove - 1 ], elements[ toRemove ], elements[ toRemove + 1 ] );

	}

	return elements.map( e => e.char );

};
