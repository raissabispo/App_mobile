import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FAVORITES_KEY = 'favorites';

const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      if (jsonValue != null) {
        setFavorites(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos', e);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (e) {
      console.error('Erro ao salvar favoritos', e);
    }
  };

  const toggleFavorite = (item) => {
    const nasaId = item.data[0].nasa_id;
    const isFavorite = favorites.some(fav => fav.data[0].nasa_id === nasaId);

    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.data[0].nasa_id !== nasaId);
      Alert.alert('Removido', 'Item removido dos favoritos');
    } else {
      newFavorites = [...favorites, item];
      Alert.alert('Adicionado', 'Item adicionado aos favoritos');
    }
    saveFavorites(newFavorites);
  };

  const isItemFavorite = (item) => {
    const nasaId = item.data[0].nasa_id;
    return favorites.some(fav => fav.data[0].nasa_id === nasaId);
  };

  const searchSpace = async () => {
    if (!query.trim()) return;  // evita busca vazia
    try {
      const response = await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`);
      const filtered = response.data.collection.items.filter(item => item && item.data && item.data[0]);
      setResults(filtered);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar a busca');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite galaxy, nebula or stars"
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity onPress={searchSpace} style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={(item, index) => item?.data?.[0]?.nasa_id ?? index.toString()}
        renderItem={({ item }) => {
          if (!item || !item.data || !item.data[0]) return null;

          const data = item.data[0];
          const imageUrl = item.links?.[0]?.href;
          const favorite = isItemFavorite(item);

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Details', { item })}
            >
              {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
              <View style={styles.row}>
                <Text style={styles.title}>{data.title}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <MaterialIcons
                    name={favorite ? 'favorite' : 'favorite-border'}
                    size={28}
                    color={favorite ? 'tomato' : 'white'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.description} numberOfLines={3}>{data.description}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#000' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#005288',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  card: {
    marginBottom: 20,
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
  },
  image: { height: 200, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#fff', flex: 1 },
  description: { color: '#ccc' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
