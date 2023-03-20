# ECF_back

1. Installer les dépendances nécessaires

```
cd app && yarn && cd -
```

2. Créer les containers pour la BDD de dévelopement et la BDD de test
   (installer [docker](https://docs.docker.com/get-docker/) et [docker compose](https://docs.docker.com/compose/install/linux/) + utiliser sudo si nécessaire)

```
docker compose up
```

3. Lancer le serveur localement

```
yarn dev
```

4. Pour simuler la production

```
yarn build && yarn start
```

4. Lancer Prettier

```
yarn prettier
```

5. Lancer tests (BDD de test active nécessaire)

```
yarn test
```
