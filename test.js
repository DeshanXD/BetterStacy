const NodeCache = require( "node-cache" );
const simpCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

success = simpCache.set('val', { "e": "rate" })


console.log(simpCache.get('val'));