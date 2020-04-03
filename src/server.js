const app = require('./appConfig');
const seed = require('./utilities/db/seeders');
const db = require('./utilities/db');

/** Initializations */
global.inProduction = process.env.NODE_ENV === "production";
app.listen(app.get('PORT'), async () => {
    console.log(`Listen on http://localhost:${app.get('PORT')}`);
    try {
        const { dbName, dbUser, dbPass, dbHost } = await db();
        if (!global.inProduction) await seed();
    } catch (error) {
        console.log(error);
    }
});