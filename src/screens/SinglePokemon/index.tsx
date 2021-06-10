import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/palette";
import { goBack } from "../../navigation/RootNavigation";

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
  const [specie, setSpecie] = useState(pokemon.species);
  const [type, setType] = useState(pokemon.types);
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
        </View>
        <View style={styles.content1Style}>
          <Text style={styles.headerTextStyle}>Pokemon Specie</Text>
          <View style={styles.specieContainerStyle}>
            <Text style={styles.valueTextStyle}>{specie.name}</Text>
          </View>
        </View>
        <View style={styles.content2Style}>
          <Text style={styles.headerTextStyle}>Champ Abilities ⚔️</Text>
          <View style={{ flexDirection: "row" }}>
            {type?.map(({ type: { name } }) => (
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
