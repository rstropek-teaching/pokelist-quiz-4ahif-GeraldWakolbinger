let pokemonLink: string = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";

async function getPokeDex() {
    $("#pokeDetails").hide();
    const fetchResponse = await fetch(pokemonLink);
    const fetchResult = await fetchResponse.json();

    let pokeTable: string = "<table>";
    for (const singlePokemon of fetchResult.results) {
        pokeTable = pokeTable + `<tr><td>${singlePokemon.name}</td><td><button onclick=getPokemonDetails('${singlePokemon.url}')>Details</button></td></tr>`;
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
}
async function getPokemonDetails(pokemonDetailsUrl: string) {
    $("#pokeDetails").show();
    const fetchResponse = await fetch(pokemonDetailsUrl);
    const fetchResult = await fetchResponse.json();
    $("#pokeName").text("Name: " + fetchResult.name);
    $("#pokeWeight").text("Weight: " + fetchResult.weight + " lbs");
    $("#pokePicture").attr("src", fetchResult.sprites.front_default);

    let abilityString: string = "";
    for (let ability of fetchResult.abilities) {
        abilityString += ability.ability.name + "</br>";
    }
    $("#pokeAbilities").html(abilityString);
}
function nextPage(forward: boolean) {
    let offsetPart: string = pokemonLink.substring(pokemonLink.indexOf("offset="));
    offsetPart = offsetPart.substring(7);
    let offset: number = parseInt(offsetPart);
    if (forward == true) {
        offset += 20;
    } else {
        if (offset - 20 >= 0) {
            offset -= 20;
        }
    }
    let newPokemonLink: string = pokemonLink.substring(0, pokemonLink.indexOf("offset=")) + "offset=" + offset;
    pokemonLink = newPokemonLink;
    getPokeDex();
}
