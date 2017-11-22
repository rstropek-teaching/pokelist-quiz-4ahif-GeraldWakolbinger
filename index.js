console.log("adf");
var pokemonList = document.getElementById('pokemons');
var origPokeLink = 'https://pokeapi.co/api/v2/pokemon/';
var nextPageLink;
var previousPageLink;
var currLink = origPokeLink;
var pokeName = document.getElementById('pokeName');
var picture = document.getElementById("picture");
var weight = document.getElementById("weight");
getPokeDex();
function getPokeDex() {
    if (pokemonList != null) {
        (function () {
            fetch(currLink).then(function (response) {
                response.json().then(function (pokelist) {
                    var html = '';
                    nextPageLink = pokelist.next;
                    previousPageLink = pokelist.previous;
                    for (var _i = 0, _a = pokelist.results; _i < _a.length; _i++) {
                        var pokemon = _a[_i];
                        html += "<li>" + pokemon.name + "<button onclick=\"goToDetails('" + pokemon.url + "')\">Details</button></li>";
                    }
                    pokemonList.innerHTML = html;
                });
            });
        })();
    }
}
function nextPage() {
    if (nextPageLink != null) {
        currLink = nextPageLink;
        getPokeDex();
    }
    else {
        console.log("End of Pages");
    }
}
function previousPage() {
    if (previousPageLink != null) {
        currLink = previousPageLink;
        getPokeDex();
    }
    else {
        console.log("End of Pages");
    }
}
function goToDetails(url) {
    var detailsLink = url;
    console.log(detailsLink);
    (function () {
        fetch(detailsLink).then(function (response) {
            response.json().then(function (pokemonList2) {
                var html = '';
                html += pokemonList2.forms[0].name.toUpperCase();
                pokeName.innerHTML = html;
                if (picture != null && weight != null) {
                    picture.innerHTML = "<img src='" + pokemonList2.sprites.front_default + "'>";
                    weight.innerText = "Weight: " + pokemonList2.weight + " lbs";
                }
            });
        });
    })();
}
