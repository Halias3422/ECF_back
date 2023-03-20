# ECF_back

1. Installer les dépendences nécessaires

```
cd app && yarn && cd -
```

2. Créer les containers pour la BDD de dévelopement et la BDD de test
   (installer [docker](https://docs.docker.com/get-docker/) et [docker compose](https://docs.docker.com/compose/install/linux/) + utiliser sudo si nécessaire)

```
docker compose up // ou docker-compose up selon les versions
```

3. Lancer le serveur localement (avec environment/development.env)

```
yarn dev
```

4. Pour simuler la production (avec environment/production.env)

```
yarn build && yarn start
```

## Autres commandes:

Formattage

```
yarn prettier
```

Lancer tests (BDD de test active nécessaire et avec environment/test.env)

```
yarn test
```
