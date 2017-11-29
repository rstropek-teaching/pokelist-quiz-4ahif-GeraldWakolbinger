var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var pokemonLink = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";
function getPokeDex() {
    return __awaiter(this, void 0, void 0, function () {
        var fetchResponse, fetchResult, pokeTable, _i, _a, singlePokemon;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $("#pokeDetails").hide();
                    return [4 /*yield*/, fetch(pokemonLink)];
                case 1:
                    fetchResponse = _b.sent();
                    return [4 /*yield*/, fetchResponse.json()];
                case 2:
                    fetchResult = _b.sent();
                    pokeTable = "<table>";
                    for (_i = 0, _a = fetchResult.results; _i < _a.length; _i++) {
                        singlePokemon = _a[_i];
                        pokeTable = pokeTable + ("<tr><td>" + singlePokemon.name + "</td><td><button onclick=getPokemonDetails('" + singlePokemon.url + "')>Details</button></td></tr>");
                    }
                    pokeTable = pokeTable + "</table>";
                    $("#pokemonListContainer").html(pokeTable);
                    $("#changePageButtons").html("<button id='previousPageButton' onclick='nextPage(false)'>Previous</button> <button id='nextPageButton' onclick='nextPage(true)'>Next</button>");
                    if (fetchResult.results.length < 20) {
                        $("#nextPageButton").hide();
                    }
                    if (fetchResult.results[0].name === "bulbasaur") {
                        $("#previousPageButton").hide();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getPokemonDetails(pokemonDetailsUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var fetchResponse, fetchResult, abilityString, _i, _a, ability;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $("#pokeDetails").show();
                    return [4 /*yield*/, fetch(pokemonDetailsUrl)];
                case 1:
                    fetchResponse = _b.sent();
                    return [4 /*yield*/, fetchResponse.json()];
                case 2:
                    fetchResult = _b.sent();
                    $("#pokeName").text("Name: " + fetchResult.name);
                    $("#pokeWeight").text("Weight: " + fetchResult.weight + " lbs");
                    $("#pokePicture").attr("src", fetchResult.sprites.front_default);
                    abilityString = "";
                    for (_i = 0, _a = fetchResult.abilities; _i < _a.length; _i++) {
                        ability = _a[_i];
                        abilityString += ability.ability.name + "</br>";
                    }
                    $("#pokeAbilities").html(abilityString);
                    return [2 /*return*/];
            }
        });
    });
}
function nextPage(forward) {
    var offsetPart = pokemonLink.substring(pokemonLink.indexOf("offset="));
    offsetPart = offsetPart.substring(7);
    var offset = parseInt(offsetPart);
    if (forward == true) {
        offset += 20;
    }
    else {
        if (offset - 20 >= 0) {
            offset -= 20;
        }
    }
    var newPokemonLink = pokemonLink.substring(0, pokemonLink.indexOf("offset=")) + "offset=" + offset;
    pokemonLink = newPokemonLink;
    getPokeDex();
}
