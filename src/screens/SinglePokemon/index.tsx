import React, { useMemo, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Swiper from "react-native-swiper";
import isString from "lodash/isString";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/palette";
import { goBack } from "../../navigation/RootNavigation";

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        paddingVertical: 7,
        paddingHorizontal: 7,
      }}
    >
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="arrow-back-circle-outline" color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
};

type Props = {
  route: any;
};

const SinglePokemon = ({ route }: Props) => {
  const { pokemon } = route?.params;
  console.log(pokemon);
  const [specy, setSpecy] = useState(pokemon.species);
  const [type, setType] = useState(pokemon.types);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: pokemon?.sprites?.front_default }}
          resizeMode="contain"
          style={styles.imageStyle}
        />
        <View style={styles.content1Style}>
          <Text style={styles.headerTextStyle}>
            This little fella belongs to the following specy
          </Text>
          <View style={styles.specyContainerStyle}>
            <Text style={styles.valueTextStyle}>{specy.name}</Text>
          </View>
        </View>
        <View style={styles.content2Style}>
          <Text style={styles.headerTextStyle}>
            Abilities for this champ are the following:
          </Text>
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
