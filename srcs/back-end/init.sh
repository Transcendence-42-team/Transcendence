#!/bin/bash
npm install

sleep 5

# Fonction pour tester la connexion à la base de données
function test_db_connection {
  echo "====> Testing database connection... <===="

  until npx prisma db push; do
    echo "====> Database connection failed. Retrying in 5 seconds... <===="
    sleep 5
  done

  echo "====> Database connection successful! <===="
}

# # Utilisez la commande ifconfig pour obtenir l'adresse IP
# ip=$(ifconfig | grep -oP 'inet \K[0-9.]+')

# # Définissez une variable d'environnement avec l'adresse IP
# export MON_IP=$ip

# # Affichez l'adresse IP
# echo "Adresse IP de votre machine Linux : $ip"

# # Facultatif : Vous pouvez également ajouter un message pour informer de la définition de la variable d'environnement
# echo "La variable d'environnement MON_IP a été définie avec l'adresse IP : $MON_IP"

# Appel de la fonction de test de connexion
test_db_connection

# Démarrage de l'application Nest.js
# npm run start
tail -f /dev/null