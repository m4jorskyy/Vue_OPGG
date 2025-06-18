//matchCache.js

import Dexie from 'dexie';

const db = new Dexie('matchCache');

db.version(1).stores({
    matches: '&id'
});

export default db;