const recherche = document.querySelector('[name="recherche"]');
const retour = document.querySelector("#retour");
/**
 * 
 * @param {String} chaine 
 * @param {Object} tab 
 */
const search = (tab) => {
    console.dir(tab);
    let resultat = "";
    tab.forEach(element => {
            resultat += `<div>${element.title}</div>`;
    });
    return resultat;
}
// appel dans mon fetch result :
// retour.textContent = search(recherche.value, maRecherche.releases);
console.dir(recherche);
recherche.addEventListener("keyup", () => {
    console.log(recherche.value)
    let maRecherche;
    // fonction fetch ajax async
    // la fonction fetch envoie une requete 
    // à une url(son parametre)
    if (recherche.value.length > 2) {
        //select/options
        //categories: release,recording,artist,tag,label
        fetch(`https://musicbrainz.org/ws/2/release/?query=${recherche.value}&fmt=json&limit=25`)
            // puis (then) convertit le resultat de cette requette
            // en texte (.text()) ou en json (.json())
            //.then((response)=>response.text())
            .then((response) => response.json())
            // ensuite je peux recuperer le resultat (texte/json)
            // pour l'exploiter dans mon javascript
            .then((result) => {
                // !!! Asynchrone
                maRecherche = result;
                console.dir(maRecherche);
                // a partir de ma saisie contenue dans recherche.value
                // trouvez dans maRecherche.tableau les informations
                // de l'article dans name === recherche.value
                // avec une fonction
                retour.innerHTML = search(maRecherche.releases);
            })
    }
})
