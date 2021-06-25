var express = require('express');
var pokemon = require('../models/pokemon');
var router = express.Router();

function randomize(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

router.get('/pokemons', function (req, res, next) {
    let respCode;
    let status;
    console.log('babi lah');
    pokemon.getAllPokemons(req, function (err, result) {
        if (err) {
            status = 500;
            respCode = '99';
            data = 'Internal Server Error';
        } else {
            status = 200;
            respCode = '00';
        }
        console.log('babi lah', result.data);
        res.status(status).send({ respCode, data: result.data });
    });
});
router.get('/pokemons/:name', function (req, res, next) {
    let respCode;
    let status;
    let data;
    pokemon.getPokemonsByName(req, function (err, result) {
        if (err) {
            status = 500;
            respCode = '99';
            data = 'Internal Server Error';
        } else {
            data = {
                ...result,
                count: result.data.length
            };
            status = 200;
            respCode = '00';
        }

        res.status(status).send({ respCode, data });
    });

});
router.delete('/pokemons/:id', function (req, res, next) {
    let respCode;
    let status;
    let data;
    let message;
    pokemon.deletePokemonById(req, function (err, result) {
        if (err) {
            status = 500;
            respCode = '99';
            data = 'Internal Server Error';
        } else {
            status = 200;
            respCode = '00';
            if (result == 1) {
                message = 'Executed';
            } else {
                message = 'Pokemon Not found';
            }

        }

        res.status(status).send({ respCode, message });
    });
});
router.post('/pokemons', function (req, res, next) {
    let respCode;
    let status;
    let data;
    let message = "Nice catch!";
    if (!req.body.name) {
        status = 500;
        respCode = '99';
        message = 'Pokemon name is mandatory';
        res.status(status).send({ respCode, message });
        return;
    }
    if (!req.body.item) {
        status = 500;
        respCode = '99';
        message = 'Item name is mandatory';
        res.status(status).send({ respCode, message });
        return;
    }
    if (req.body.item.toUpperCase() == "POKEBALL") {
        if (randomize(1, 10) <= 5) {
            status = 200;
            respCode = '99';
            message = 'it ran away';
            res.status(status).send({ respCode, message });
            return;
        }
    } else if (req.body.item.toUpperCase() == "MASTERBALL") {
        //always success
        message = "2 ez 4 me ";
    } else if (req.body.item.toUpperCase() == "BOWLINGBALL") {
        status = 200;
        respCode = '99';
        message = 'the pokemon fainted... What did you expect?';
        res.status(status).send({ respCode, message });
        return;
    } else {
        status = 500;
        respCode = '99';
        message = 'what are you throwing?';
        res.status(status).send({ respCode, message });
        return;
    }
    pokemon.getPokemonByNickname(req, function (err, result) {
        if (err) {
            status = 500;
            respCode = '99';
            message = 'Internal Server Error';
            res.status(status).send({ respCode, message });
            return;
        } else {
            if (result.data && result.data.length > 0) {
                status = 200;
                respCode = '99';
                message = 'Nickname already exist';
                res.status(status).send({ respCode, message });
                return;
            } else {
                pokemon.savePokemon(req, function (err, result) {
                    if (err) {
                        status = 500;
                        respCode = '99';
                        message = 'Internal Server Error';
                    } else {
                        status = 200;
                        respCode = '00';
                        data = { id: result, message }
                    }
                    res.status(status).send({ respCode, data });
                });
            }
        }
    });
});
router.get('/pokemons/all/summary', function (req, res, next) {
    let respCode;
    let status;
    pokemon.getAllPokemonsCount(req, function (err, result) {
        if (err) {
            status = 500;
            respCode = '99';
            data = 'Internal Server Error';
        } else {
            status = 200;
            respCode = '00';
        }
        res.status(status).send({ respCode, data: result.data });
    });
});
module.exports = router;