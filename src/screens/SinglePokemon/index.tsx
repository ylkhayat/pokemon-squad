import React, { useCallback, useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/palette";
import { goBack } from "../../navigation/RootNavigation";
import { Audio } from "expo-av";
import { getPokemonAudioUri } from "../../network/pokemons";

const Header = () => {
  return (
    <View
      style={{
        paddingVertical: 7,
        paddingHorizontal: 12,
      }}
    >
      <TouchableOpacity onPress={goBack}>
        <Ionicons
          name="arrow-back-circle-outline"
          color={colors.primary}
          size={50}
        />
      </TouchableOpacity>
    </View>
  );
};

type Props = {
  route: any;
};

const SinglePokemon = ({ route }: Props) => {
  const { pokemon, pokemonColor } = route?.params;
  const [cachedSound, setCachedSound] =
    useState<Audio.Sound | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const onPlaySound = useCallback(async () => {
    console.log();

    if (cachedSound?._loaded) {
      try {
        cachedSound.playAsync();
        return;
      } catch (e) {}
    }
    setLoading(true);
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: getPokemonAudioUri(pokemon?.id),
      },
      { shouldPlay: true }
    );
    setLoading(false);
    setCachedSound(sound);
  }, [cachedSound, pokemon]);

  useEffect(() => {
    return cachedSound
      ? () => {
          cachedSound.unloadAsync();
        }
      : undefined;
  }, [cachedSound]);
  console.log(cachedSound);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        <View
          style={[styles.imageContainer, { backgroundColor: pokemonColor }]}
        >
          <Image
            source={{ uri: pokemon?.sprites?.front_default }}
            resizeMode="contain"
            style={styles.imageStyle}
          />
          <TouchableOpacity
            onPress={onPlaySound}
            disabled={loading}
            style={{ position: "absolute", bottom: 5, right: 5 }}
          >
            <Ionicons
              name={loading ? "download-outline" : "play-circle"}
              color={colors.white}
              size={40}
            />
          </TouchableOpacity>
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
              <View style={styles.typeContainerStyle}>
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
