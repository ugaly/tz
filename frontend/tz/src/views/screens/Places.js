import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ActivityIndicator
} from 'react-native';
import COLORS from '../../consts/colors';
const {width} = Dimensions.get('screen');
import AuthService from '../../services/auth/auth_service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const blurhash =
  'LNF#g#R-E1slYRR+r;oJM~aebFof'

const Places = ({navigation}) => {

    const [placesList, setPlacesList] = React.useState([]);
    useEffect(() => {
      AuthService.loadPlace().then(res=>{
        setPlacesList(res.data.results)
      })
    },[])

    const Card = ({place}) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Profile', place)}>
            <ImageBackground style={style.cardImage} src={place.photo} placeholder={blurhash} transition={8000}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 0,
                }}>
                {place.name}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="place" size={18} color={COLORS.white} />
                  <Text style={{marginLeft: 5,  fontSize: 12, color: COLORS.white}}>
                    {place.location}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="star" size={16} color={COLORS.white} />
                  <Text style={{marginLeft: 5,  fontSize: 12, color: COLORS.white}}>{place.rate}</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      };

    return (
      <FlatList
      contentContainerStyle={{ paddingLeft: 20 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={placesList}
      renderItem={({ item }) => <Card place={item} />}
      onEndReached={() => console.log('end reached')}
      onEndReachedThreshold={0.1} // Try lowering the threshold
    />

    )
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
   
    height: 250,
    aspectRatio: 6 / 9,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  // rmCardImage2: {
  //   width: '100%',
  //   height: 400,
   
  //   marginTop: 6,
  //   borderRadius: 80,

    
   
  // },
  rmCardImage2: {
    width: '100%',
    aspectRatio: 9 / 9,  // Example aspect ratio, adjust to match your image aspect ratio
    marginTop: 6,
   
    overflow: 'hidden',  // This is important to prevent content overflow
  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailRow: {
    flexDirection: 'row',
  },
  detailText: {
    color: COLORS.white,
    marginLeft: 5,
  },
  centeredContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default Places