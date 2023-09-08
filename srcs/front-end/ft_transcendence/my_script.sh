#!/bin/bash

# Utilisez la commande ifconfig pour obtenir l'adresse IP
ip=$(ifconfig | grep -oP 'inet \K[0-9.]+')

# Définissez une variable d'environnement avec l'adresse IP
export MON_IP=$ip

# Affichez l'adresse IP
echo "Adresse IP de votre machine Linux : $ip"

# Facultatif : Vous pouvez également ajouter un message pour informer de la définition de la variable d'environnement
echo "La variable d'environnement MON_IP a été définie avec l'adresse IP : $MON_IP"