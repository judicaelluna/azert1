// Données du jeu
const listMots = ["informatique", "comptabilité", "marketing", "javascript", "ordinateur"];
const listPhrases = ["systeme informatique", "je sais coder", "faire la mise a jour", "apprendre chaque jour", "taper rapidement"];

// Récupérer les éléments HTML
const wordDisplay = document.querySelector(".word-display");
const typingInput = document.querySelector(".typing-input");
const validateBtn = document.querySelector(".validate-btn");
const scoreSpan = document.querySelector(".score-value");
const messageDiv = document.querySelector(".message");
const motsRadio = document.getElementById("mots");
const phrasesRadio = document.getElementById("phrases");

// Variables du jeu
let score = 0;
let indexActuel = 0;
let listeActuelle = listMots;

// Fonction pour afficher le mot/phrase
function afficherMot() {
    if (indexActuel < listeActuelle.length) {
        wordDisplay.textContent = listeActuelle[indexActuel];
    } else {
        wordDisplay.textContent = "Félicitations !";
        messageDiv.textContent = "🎉 Vous avez terminé le jeu ! 🎉";
        messageDiv.style.color = "#00d25b";
        typingInput.disabled = true;
        validateBtn.disabled = true;
    }
}

// Fonction pour afficher les messages
function afficherMessage(texte, couleur) {
    messageDiv.textContent = texte;
    messageDiv.style.color = couleur;
    
    // Effacer le message après 2 secondes
    setTimeout(() => {
        if (messageDiv.textContent === texte) {
            messageDiv.textContent = "✨ Continuez ! ✨";
            messageDiv.style.color = "#667eea";
        }
    }, 2000);
}

// Fonction pour mettre à jour le score
function mettreAJourScore(points) {
    score += points;
    scoreSpan.textContent = score;
}

// Fonction pour vérifier la réponse
function verifierReponse(event) {
    if (event) event.preventDefault(); // Empêche le rechargement de la page
    
    const reponseUtilisateur = typingInput.value.trim().toLowerCase();
    const motAttendu = wordDisplay.textContent.toLowerCase();
    
    // Vérifier si l'utilisateur a écrit quelque chose
    if (reponseUtilisateur === "") {
        afficherMessage("❌ Tapez quelque chose !", "red");
        typingInput.focus();
        return;
    }
    
    // Vérifier si la réponse est correcte
    if (reponseUtilisateur === motAttendu) {
        // Bonne réponse
        mettreAJourScore(10);
        afficherMessage("✅ Bravo ! +10 points", "green");
        indexActuel++;
        afficherMot();
        typingInput.value = "";
    } else {
        // Mauvaise réponse
        afficherMessage(`❌ Dommage ! C'était "${motAttendu}"`, "red");
        typingInput.value = "";
    }
    
    typingInput.focus();
}

// Fonction pour changer le mode (mots ou phrases)
function changerMode() {
    if (motsRadio.checked) {
        listeActuelle = [...listMots]; // Utiliser une copie du tableau
        afficherMessage("Mode Mots activé", "#667eea");
    } else {
        listeActuelle = [...listPhrases]; // Utiliser une copie du tableau
        afficherMessage("Mode Phrases activé", "#667eea");
    }
    
    // Réinitialiser le jeu
    indexActuel = 0;
    score = 0;
    scoreSpan.textContent = score;
    typingInput.disabled = false;
    validateBtn.disabled = false;
    typingInput.value = "";
    afficherMot();
    typingInput.focus();
}

// Écouter le clic sur le bouton Valider
validateBtn.addEventListener("click", verifierReponse);

// Écouter le changement des boutons radio
motsRadio.addEventListener("change", changerMode);
phrasesRadio.addEventListener("change", changerMode);

// Écouter la touche Entrée
typingInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        verifierReponse(event);
    }
});

// Démarrer le jeu
afficherMot();
typingInput.focus();