import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../consts/colors';
import AuthService from '../../services/auth/auth_service';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';

const data = [
  {
    id: '1',
    name: 'Serengeti National Park',
    description: 'This is Serengeti National Park.',
    photo: 'https://source.unsplash.com/user/c_v_r/800x600',
  },
  {
    id: '2',
    name: 'Ngorongoro Crater',
    description: 'Ngorongoro Crater is a beautiful place.',
    photo: 'https://source.unsplash.com/user/c_v_r/800x600',
  },
  {
    id: '3',
    name: 'Serengeti National Park',
    description: 'This is Serengeti National Park.',
    photo: 'https://source.unsplash.com/user/c_v_r/800x600',
  },
  {
    id: '4',
    name: 'Ngorongoro Crater',
    description: 'Ngorongoro Crater is a beautiful place.',
    photo: 'https://source.unsplash.com/user/c_v_r/800x600',
  },
  // Add more areas as needed
];

const LocationScreen= ({navigation, route}) => {
  const place = route.params;
  console.log(place)

  const [postsList, setPostsList] = React.useState([]);
  useEffect(() => {
    AuthService.loadPostByLocation(place.location || place.place.location).then(res => {
      setPostsList(res.data.results);
      
      console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmm', res.data.results);
    })
  }, [])
  const initialRegion = {
    latitude: -6.369028, // Latitude of Tanzania
    longitude: 34.888822, // Longitude of Tanzania
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  const [mapType, setMapType] = useState('standard');

  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  return (
    <View style={styles.container}>
    <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <MapView style={styles.map} initialRegion={initialRegion} mapType={mapType}>
        
        {/* {data.map((item, index) => (
          <Marker
            key={index}
            coordinate={initialRegion}
            title={item.name}
          />
        ))} */}
      </MapView>
      <View style={styles.cardsContainer}>
        <FlatList
          data={postsList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <ImageBackground src={item.photo} style={styles.cardImageBackground}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                {/* <Text style={styles.cardDescription}>{item.description}</Text> */}
              </ImageBackground>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
        <Icon name={mapType === 'standard' ? 'map' : 'map-o'} size={24} color="#333" />
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  cardsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
     backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  card: {
    width: 250,
    height: 200,
    marginLeft: 10,
    backgroundColor: 'transparent',
    marginVertical: 10,
    marginRight: 10,
  },
  cardImageBackground: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardDescription: {
    fontSize: 14,
    color: 'lightgray',
  },
  mapTypeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
});
export default LocationScreen;