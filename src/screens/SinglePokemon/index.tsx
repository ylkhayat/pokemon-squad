import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Audio } from "expo-av";
import { getPokemonOldAudioUri, getPokemonNewAudioUri } from "network/pokemons";
import Header from "./Header";
import { capitalizeFirstLetter } from "utils";
import Swiper from "react-native-swiper";
import { gradeColors } from "styles/palette";

type Props = {
  route: any;
};

const gradePicker = (stat: number) => {
  if (stat <= 45) return gradeColors[0];
  if (stat <= 90) return gradeColors[1];
  else return gradeColors[2];
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
          <Swiper contentContainerStyle={{ width: "100", height: "100%" }}>
            <Image
              source={{
                uri: pokemon?.sprites?.front_default,
              }}
              resizeMode="contain"
              style={styles.imageStyle}
            />
            <Image
              source={{
                uri: pokemon?.sprites?.back_default,
              }}
              resizeMode="contain"
              style={styles.imageStyle}
            />
          </Swiper>
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
          <Text style={styles.headerTextStyle}>Pokemon Stats</Text>

          <FlatList
            keyExtractor={(item) => item.stat.name}
            data={pokemon.stats}
            numColumns={2}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation="bounceIn"
                delay={100 * index}
                useNativeDriver
                style={styles.statContainer}
              >
                <Text style={styles.statKeyTextStyle}>
                  {capitalizeFirstLetter(item.stat.name)}
                </Text>
                <Text
                  style={[
                    styles.statValueTextStyle,
                    { backgroundColor: gradePicker(item.base_stat) },
                  ]}
                >
                  {item.base_stat}
                </Text>
              </Animatable.View>
            )}
          />
        </View>
        <View style={styles.content2Style}>
          <Text style={styles.headerTextStyle}>Champ Abilities</Text>
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
