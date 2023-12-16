import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Image } from 'expo-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
const blurhash =
  'LNF#g#R-E1slYRR+r;oJM~aebFof'
const DetailsScreen = ({navigation, route}) => {
  const place = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{flex: 0.7}} src={place.photo} placeholder={blurhash} transition={1000}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={20}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <Icon name="more-vert" size={28} color={COLORS.white} />
        </View>
        <View style={style.imageDetails}>
          <Text
            style={{
              width: '70%',
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.white,
              marginBottom: 18,
            }}>
            {place.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon name="star" size={25} color={COLORS.orange} />
            <Text
              style={{color: COLORS.white, fontWeight: 'bold', fontSize: 16}}>
              {place.rate || place.place.rate}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <View  style={style.iconContainer}>
       
        <TouchableOpacity
        activeOpacity={0.2}
        onPress={() => navigation.navigate('LocationScreen', place)}>
          <Icon name="map" color={COLORS.red} size={30} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 1}}>
          <Icon name="place" size={28} color={COLORS.primary} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            {place.location || place.place.location}
          </Text>
        </View>
        <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 16}}>
          About {place.name}
        </Text>
        <Text style={{marginTop: 10, lineHeight: 22}}>{place.description}</Text>
      </View>
      <View style={style.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: COLORS.white,
            }}>
            ${place.price || place.place.price}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: COLORS.grey,
              marginLeft: 2,
            }}>
            /PER DAY
          </Text>
        </View>
        <TouchableOpacity style={style.bookNowBtn}>
          <Text
            style={{color: COLORS.primary, fontSize: 16, fontWeight: 'bold'}}>
               Book Now
           
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default DetailsScreen;
