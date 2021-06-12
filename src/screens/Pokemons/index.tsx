import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemons, getPokemonByName } from "network/pokemons";
import PokemonCard from "./PokemonCard";
import styles from "./styles";
import Search from "react-native-search-box";
import colors from "styles/palette";
import useFetch from "hooks/useFetch";

const _keyExtractor = ({ id }: any, index: any) => `pokemon_${id}_${index}`;
const _renderItem = ({ item, index }: any) => {
  return <PokemonCard index={index} pokemon={item} />;
};

const LIMIT = 5;
const Pokemons = () => {
  const searchBarRef = useRef(null);

  const [search, setSearch] = useState("");
  const {
    data: pokemons,
    loading,
    setData: setPokemons,
    setLoading,
    onRefresh,
    onRequest,
  } = useFetch(getPokemons, { paginated: true, limit: LIMIT });

  const onDeleteCancel = useCallback(() => {
    setSearch("");
    onRefresh();
  }, []);

  const onSearch = useCallback((searchText: string) => {
    setLoading(true);
    return new Promise(async () => {
      try {
        const { data } = await getPokemonByName(searchText?.toLowerCase());
        setLoading(false);
        setPokemons([data]);
      } catch (e) {
        setPokemons([]);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    onRequest();
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
        refreshing={loading}
        onRefresh={onRefresh}
        keyExtractor={_keyExtractor}
        data={pokemons}
        renderItem={_renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        onEndReachedThreshold={0.1}
        onEndReached={onRequest}
      />
    </SafeAreaView>
  );
};

export default Pokemons;
