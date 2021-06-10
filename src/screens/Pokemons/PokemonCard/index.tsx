import React, { useCallback, useEffect, useState } from "react";
import { Image, View, Text, Dimensions, TouchableOpacity } from "react-native";
import SkeletonContent from "react-native-skeleton-content";
import { getPokemon } from "../../../network/pokemons";
import { TPokemon } from "../../../redux/pokemon";
import styles from "./styles";
import { BoxShadow } from "react-native-shadow";
import * as Animatable from "react-native-animatable";
import { capitalizeFirstLetter } from "../../../utils";
import { navigate } from "../../../navigation/RootNavigation";
import colors, { backgroundColors } from "../../../styles/palette";

const { width } = Dimensions.get("window");
type Props = {
  index: number;
  pokemon: TPokemon;
};

const shadowOpt = {
  width: width * 0.9,
  height: 200,
  color: colors.darkmaron,
  border: 2,
  radius: 12,
  opacity: 0.2,
  x: 2,
  y: 2,
  style: {
    marginVertical: 5,
    alignSelf: "center",
  },
};

const PokemonCard = ({ pokemon, index }: Props) => {
  const [profile, setProfile] = useState(pokemon);
  const [loading, setLoading] = useState(true);

  const retrieveProfile = useCallback(async () => {
    try {
      const { data } = await getPokemon(profile.url);
      setProfile((prevProfile) => ({ ...prevProfile, ...data }));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, [profile.url]);

  const onPress = useCallback(
    () =>
      navigate("single_pokemon", {
        pokemon: profile,
        pokemonColor: Object.values(backgroundColors)[index % 5],
      }),
    [profile]
  );

  useEffect(() => {
    retrieveProfile();
  }, []);

  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <BoxShadow setting={shadowOpt}>
        <SkeletonContent
          containerStyle={[
            styles.skeletonContainer,
            { backgroundColor: Object.values(backgroundColors)[index % 5] },
          ]}
          isLoading={false}
        >
          <View
            style={[
              styles.container,
              { flexDirection: index % 2 === 0 ? "row-reverse" : "row" },
            ]}
          >
            <Animatable.View
              animation={index % 2 === 0 ? "fadeInRight" : "fadeInLeft"}
              useNativeDriver
              style={[
                styles.nameContainerStyle,
                { alignItems: index % 2 === 0 ? "flex-end" : "flex-start" },
              ]}
            >
              <Text style={styles.nameTextStyle}>
                {capitalizeFirstLetter(profile.name)}
              </Text>
            </Animatable.View>
            {profile?.sprites && (
              <Image
                source={{ uri: profile?.sprites?.front_default }}
                resizeMethod="auto"
                resizeMode="cover"
                style={[
                  styles.imageStyle,
                  { transform: [{ scaleX: index % 2 === 0 ? -1 : 1 }] },
                ]}
              />
            )}
          </View>
        </SkeletonContent>
      </BoxShadow>
    </TouchableOpacity>
  );
};

export default PokemonCard;
