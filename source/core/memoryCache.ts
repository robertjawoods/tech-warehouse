import * as NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 });

export default cache;