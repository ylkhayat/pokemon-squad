import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemons, getPokemonByName } from "network/pokemons";
import PokemonCard from "./PokemonCard";
import styles from "./styles";
import Search from "react-native-search-box";
import colors from "styles/palette";

const _keyExtractor = ({ id }: any, index: any) => `pokemon_${id}_${index}`;
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
    if (search) return;
    try {
      setRefreshing(true);
      const { data } = await getPokemons({
        params: { limit, offset: limit * page },
      });
      const { results } = data || {};
      setPage((prevPage) => prevPage + 1);
      setRefreshing(false);
      if (results) setPokemons((prevPokemons) => [...prevPokemons, ...results]);
    } catch (e) {
      setPokemons([]);
      setRefreshing(false);
    }
  }, [page, search]);

  useEffect(() => {
    console.log("HEY");

    retrievePokemons();
  }, []);

  const onDeleteCancel = useCallback(() => {
    console.log("HEYEH");

    setSearch("");
    onRefresh();
  }, []);

  const onSearch = useCallback((searchText: string) => {
    setRefreshing(true);
    return new Promise(async () => {
      try {
        const { data } = await getPokemonByName(searchText);
        setRefreshing(false);
        setPokemons([data]);
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
        value={search}
        ref={searchBarRef}
        onSearch={onSearch}
        onChangeText={setSearch}
        onCancel={onDeleteCancel}
        onDelete={onDeleteCancel}
        backgroundColor={colors.secondary}
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
        onEndReached={retrievePokemons}
        style={{ width: "100%" }}
      />
    </SafeAreaView>
  );
};

export default Pokemons;
