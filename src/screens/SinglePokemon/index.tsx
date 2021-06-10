import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import colors from "styles/palette";

import { Audio } from "expo-av";
import { getPokemonOldAudioUri, getPokemonNewAudioUri } from "network/pokemons";
import Header from "./Header";
import { capitalizeFirstLetter } from "utils";

type Props = {
  route: any;
};

const SinglePokemon = ({ route }: Props) => {
  const { pokemon, pokemonColor } = route?.params;
  const [oldCachedSound, setOldCachedSound] =
    useState<Audio.Sound | undefined>(undefined);
  const [newCachedSound, setNewCachedSound] =
    useState<Audio.Sound | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const onPlayOldSound = useCallback(async () => {
    setLoading(true);
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: getPokemonOldAudioUri(pokemon?.id),
      },
      { shouldPlay: true }
    );
    setLoading(false);
    setOldCachedSound(sound);
  }, [oldCachedSound, pokemon]);

  const onPlayNewSound = useCallback(async () => {
    setLoading(true);
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: getPokemonNewAudioUri(pokemon?.id),
      },
      { shouldPlay: true }
    );
    setLoading(false);
    setNewCachedSound(sound);
  }, [oldCachedSound, pokemon]);

  useEffect(() => {
    return () => {
      if (oldCachedSound) oldCachedSound.unloadAsync();
      if (newCachedSound) newCachedSound.unloadAsync();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        <View
          style={[styles.imageContainer, { backgroundColor: pokemonColor }]}
        >
          <Text style={styles.nameTextStyle}>
            {capitalizeFirstLetter(pokemon.name)}
          </Text>
          <Image
            source={{ uri: pokemon?.sprites?.front_default }}
            resizeMode="contain"
            style={styles.imageStyle}
          />
          <TouchableWithoutFeedback onPress={onPlayOldSound} disabled={loading}>
            <View style={styles.oldAudioContainer}>
              <Text style={[styles.detailsTextStyle, { color: pokemonColor }]}>
                Old
              </Text>
              {loading ? (
                <ActivityIndicator color={pokemonColor} size={40} />
              ) : (
                <Ionicons name={"play"} color={pokemonColor} size={40} />
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPlayNewSound} disabled={loading}>
            <View style={styles.newAudioContainer}>
              <Text style={[styles.detailsTextStyle, { color: pokemonColor }]}>
                New
              </Text>
              {loading ? (
                <ActivityIndicator color={pokemonColor} size={40} />
              ) : (
                <Ionicons name={"play"} color={pokemonColor} size={40} />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.content1Style}>
          <Text style={styles.headerTextStyle}>Pokemon Specie</Text>
          <View style={styles.specieContainerStyle}>
            <Text style={styles.valueTextStyle}>{pokemon.species.name}</Text>
          </View>
        </View>
        <View style={styles.content2Style}>
          <Text style={styles.headerTextStyle}>Champ Abilities ⚔️</Text>
          <View style={{ flexDirection: "row" }}>
            {pokemon.types?.map(({ type: { name } }) => (
              <View key={name} style={styles.typeContainerStyle}>
                <Text style={styles.valueTextStyle}>{name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SinglePokemon;
