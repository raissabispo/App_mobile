import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FAVORITES_KEY = 'favorites';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      if (jsonValue != null) {
        setFavorites(JSON.parse(jsonValue));
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos', e);
    }
  };

  const removeFavorite = async (item) => {
    const nasaId = item.data[0].nasa_id;
    const newFavorites = favorites.filter(fav => fav.data[0].nasa_id !== nasaId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    Alert.alert('Removido', 'Item removido dos favoritos');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => item?.data?.[0]?.nasa_id ?? index.toString()}
        renderItem={({ item }) => {
          const data = item.data[0];
          const imageUrl = item.links?.[0]?.href;

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Details', { item })}
            >
              {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
              <View style={styles.row}>
                <Text style={styles.title}>{data.title}</Text>
                <TouchableOpacity onPress={() => removeFavorite(item)}>
                  <MaterialIcons name="delete" size={24} color="tomato" />
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

export default FavoritesScreen;
