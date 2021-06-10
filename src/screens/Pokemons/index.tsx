import React, { useCallback, useEffect, useState } from "react";
import { Text, View, FlatList, ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemons } from "../../network/pokemons";
import PokemonCard from "./PokemonCard";
import styles from "./styles";
import { SearchBar } from "react-native-elements";

const _keyExtractor = (_, index: any) => `pokemon_${index}`;
const _renderItem = ({ item, index }: any) => {
  return <PokemonCard index={index} pokemon={item} />;
};

const limit = 5;
const Pokemons = () => {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const { data } = await getPokemons({
      params: { limit },
    });
    const { results } = data || {};
    setPage(2);
    setRefreshing(false);
    if (results) setPokemons(results);
  }, [page]);

  const retrievePokemons = useCallback(async () => {
    setRefreshing(true);
    const { data } = await getPokemons({
      params: { limit, offset: limit * page },
    });
    const { results } = data || {};

    setPage((prevPage) => prevPage + 1);
    setRefreshing(false);
    if (results) setPokemons((prevPokemons) => [...prevPokemons, ...results]);
  }, [page]);

  useEffect(() => {
    retrievePokemons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* <SearchBar
          placeholder="Type Here..."
          lightTheme
          // onChangeText={this.updateSearch}
          // value={search}
          style={{ alignSelf: "center" }}
        /> */}
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={_keyExtractor}
          data={pokemons}
          renderItem={_renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          onEndReachedThreshold={0.1}
          // onEndReached={retrievePokemons}
          style={{ width: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Pokemons;
