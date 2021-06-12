# Pokemon Squad 📑

Basic implementation of Pokemon listing with a slight touch of irrelevant colors and less than average styling, but eh, you will get your pokemons paginated and displayed 💵.

## Description

This is a very brief README.md to provide guidance and for the reader to know his/her way through the application.

This application is using using Expo and the api provider is , and Pokemon cries website and other helper packages mentioned in the `package.json`.

- 📦 [Expo](https://expo.io/)
- 📦 [PokeAPI](https://pokeapi.co/docs/v2)
- 📦 [Pokemon Cries](https://pokemoncries.com)

### Setup & running the application

Make sure to install the dependencies through running the following command.

```sh
$ yarn install
```

#### 🏃‍♂️ Run the application

Once this is done, proceed to running the application by running the following command.

```sh
$ expo start
```

### Inspecting the content

The application is pretty simple. Once you're in, a small loading will take place to start loading the local assets. Wait up to 2000 ms (2 seconds). (This is manually put 😅)

#### 👀 Searching now available

Proceeding, you will receive a list of Pokemons, with a very interesting [`Autocomplete`](https://github.com/mrlaessig/react-native-autocomplete-input) for filtering the output and as the database we used this awesome package [`Pokemon`](https://github.com/sindresorhus/pokemon).

- Just type anything into the search box
- Results will come running
- Enjoy your queried okemon

#### 📑 Pokemon Content

Upon clicking on any pokemon you like, you will be redirected to a page where additional info is displayed about the Pokemon.

And as a bonus, you will find included the Pokemon's cry, both old and new through this gem API

- Old - `https://pokemoncries.com/cries-old/{{id}}.mp3`
- New - `https://pokemoncries.com/cries/{{id}}.mp3`

### 🧪 Tests

Tests for this application will be included soon.

Cheers! 🍻
