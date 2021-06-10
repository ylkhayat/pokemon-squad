import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, FlatList, ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemons, getPokemonByName } from "../../network/pokemons";
import PokemonCard from "./PokemonCard";
import styles from "./styles";
import Search from "react-native-search-box";

const _keyExtractor = (_, index: any) => `pokemon_${index}`;
const _renderItem = ({ item, index }: any) => {
  return <PokemonCard index={index} pokemon={item} />;
};

const limit = 5;
const Pokemons = () => {
  const searchBarRef = useRef(null);
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
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

  const onDeleteCancel = useCallback(() => {
    setSearch("");
    onRefresh();
  }, []);

  const onSearch = useCallback((searchText: string) => {
    setRefreshing(true);
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await getPokemonByName(searchText);
        setRefreshing(false);
        setPokemons([data]);
        resolve(data);
      } catch (e) {
        setPokemons([]);
        setRefreshing(false);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ padding: 20 }}>
          <Text style={styles.headerText}>MEET YOUR POKIES 🌱</Text>
        </View>
      </View>
      <Search
        ref={searchBarRef}
        onSearch={onSearch}
        onChangeText={setSearch}
        onCancel={onDeleteCancel}
        onDelete={onDeleteCancel}
      />
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
    </SafeAreaView>
  );
};

export default Pokemons;
