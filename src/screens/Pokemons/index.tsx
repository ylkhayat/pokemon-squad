import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  FlatListProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemons, getPokemonByName } from "network/pokemons";
import PokemonCard from "./PokemonCard";
import styles from "./styles";
import Autocomplete from "react-native-autocomplete-input";
import colors from "styles/palette";
import useFetch from "hooks/useFetch";
import pokemon from "pokemon";
import { Ionicons } from "@expo/vector-icons";

const _keyExtractor = ({ id }: any, index: any) => `pokemon_${id}_${index}`;
const _renderItem = ({ item, index }: any) => {
  return <PokemonCard index={index} pokemon={item} />;
};

const ALL_POKEMONS = pokemon
  .all()
  .map((currentPokemon) => currentPokemon.replace(/[^a-zA-Z -]/g, ""));

const LIMIT = 5;
const Pokemons = () => {
  const searchBarRef = useRef(null);

  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
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
    setSearchFocused(false);
    setSearchResult(false);
    Keyboard.dismiss();
  }, []);

  const onSearch = useCallback((searchText: string) => {
    setLoading(true);
    return new Promise(async () => {
      try {
        const { data } = await getPokemonByName(searchText?.toLowerCase());
        setLoading(false);
        setSearchResult(true);
        setPokemons([data]);
        setSearchResult(true);
      } catch (e) {
        setPokemons([]);
        setLoading(false);
      }
    });
  }, []);

  const FLATLIST_PROPS: Partial<FlatListProps<string>> = useMemo(
    () => ({
      keyExtractor: (_, idx) => `${idx}`,
      initialNumToRender: 10,
      maxToRenderPerBatch: 5,
      renderItem: ({ item }) => (
        <TouchableOpacity
          onPress={() => {
            onSearch(item);
            setSearch(item);
            setSearchFocused(false);
          }}
        >
          <Text style={styles.autocompleteItem}>{item}</Text>
        </TouchableOpacity>
      ),
    }),
    []
  );

  const onScroll = useCallback(() => {
    setSearchFocused(false);
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
      <View style={{ flex: 1 }}>
        <View style={styles.autocompleteContainer}>
          <Autocomplete
            data={ALL_POKEMONS.filter((pokemon) =>
              pokemon?.toLowerCase().includes(search?.toLowerCase())
            )}
            hideResults={!searchFocused}
            value={search}
            onChangeText={setSearch}
            flatListProps={FLATLIST_PROPS as any}
            listContainerStyle={styles.autocompleteListContainer}
            renderTextInput={(props: any) => (
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={searchBarRef}
                  {...props}
                  style={styles.textInputStyle}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Need a help searching? Enter a name! 🕶️"
                />

                {(!!search || searchFocused) && (
                  <TouchableOpacity onPress={onDeleteCancel}>
                    <Ionicons
                      name="close-circle"
                      size={25}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
        <FlatList
          onScroll={onScroll}
          refreshing={loading}
          onRefresh={onRefresh}
          keyExtractor={_keyExtractor}
          data={pokemons}
          renderItem={_renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          onEndReachedThreshold={0.1}
          onEndReached={!!searchResult ? () => {} : (onRequest as any)}
          style={{ marginTop: 60 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Pokemons;
