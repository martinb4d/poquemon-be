var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE pokemons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            nickname text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO pokemons (name, nickname) VALUES (?,?)'
                db.run(insert, ["machoke","gabumon"])
                db.run(insert, ["snorlax","sukamon"])
                db.run(insert, ["metapod","numemon"])
            }
        });  
    }
});

module.exports = db