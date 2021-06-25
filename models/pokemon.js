var db = require("../database.js")
module.exports = {
    getAllPokemons: function (req, result) {
        var sql = "select * from pokemons order by name asc"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                result(err, null);
            }
            result(null, { data: rows });
        });
    },
    getPokemonsByName: function (req, result) {
        var sql = "select * from pokemons where lower(name) = lower(?)"
        var params = [req.params.name]
        db.all(sql, params, (err, rows) => {
            if (err) {
                result(err, null);
            }
            result(null, { data: rows });
        });
    },
    deletePokemonById: function (req, result) {
        db.run(
            'DELETE FROM pokemons WHERE id = ?',
            req.params.id,
            function (err, res) {
                if (err) {
                    result(err, null);
                }
                result(null, this.changes);
            });
    },
    savePokemon: function (req, result) {
        var sql = 'INSERT INTO pokemons (name, nickname) VALUES (?,?)'
        var params = [req.body.name, req.body.nickname]
        db.run(sql, params, function (err, res) {
            if (err) {
                result(err, null);
            }
            result(null, this.lastID);
        });
    },
    getAllPokemonsCount: function (req, result) {
        var sql = "SELECT name, COUNT(id) count FROM pokemons GROUP BY name ORDER by name asc"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                result(err, null);
            }
            result(null, { data: rows });
        });
    },
    getPokemonByNickname: function (req, result) {
        if (req.body.nickname == '') {
            result(null, { data: null });
        } else {
            var sql = "select * from pokemons where lower(nickname) = lower(?)"
            var params = [req.body.nickname]
            db.all(sql, params, (err, rows) => {
                if (err) {
                    result(err, null);
                }
                result(null, { data: rows });
            });
        }
    }
}