import React, { useEffect, useState, useRef } from 'react';
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
  ActivityIndicator
 
  
} from 'react-native';




import { MaterialIcons } from "@expo/vector-icons";
import COLORS from '../../consts/colors';
import { Image } from 'expo-image';
import places from '../../consts/places';
const {width} = Dimensions.get('screen');
import images from "../../assets/location1.jpg";
import noData from "../../assets/noData.png";
import AuthService from '../../services/auth/auth_service';
// const blurhash =
//   '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const blurhash =
  'LNF#g#R-E1slYRR+r;oJM~aebFof'
const ProfileScreen = ({navigation, route}) => {
  const place = route.params;

  const [postsList, setPostsList] = React.useState([]);
  useEffect(() => {
    AuthService.loadPostByLocation(place.location || place.place.location).then(res => {
      setPostsList(res.data);
      setLoading(false)
      console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmm', res.data.results);
    })
  }, [])
  
  const photos = [
    require('../../assets/location1.jpg'),
    require('../../assets/location2.jpg'),
    require('../../assets/location3.jpg'),
    require('../../assets/location4.jpg'),
    require('../../assets/location5.jpg'),
    require('../../assets/location6.jpg'),
    require('../../assets/location7.jpg'),
    require('../../assets/location8.jpg'),
    require('../../assets/location1.jpg'),
    require('../../assets/location2.jpg'),
    require('../../assets/location3.jpg'),
    require('../../assets/location4.jpg'),
    require('../../assets/location5.jpg'),
    require('../../assets/location6.jpg'),
    require('../../assets/location7.jpg'),
    require('../../assets/location9.jpg'),
    require('../../assets/location10.jpg'),
    require('../../assets/location11.jpg'),
    require('../../assets/location3.jpg'),
    require('../../assets/location4.jpg'),
    require('../../assets/location5.jpg'),
    require('../../assets/location6.jpg'),
    require('../../assets/location7.jpg'),
    require('../../assets/location8.jpg'),
    require('../../assets/location1.jpg'),
    require('../../assets/location2.jpg'),
    require('../../assets/location3.jpg'),
    require('../../assets/location4.jpg'),
    require('../../assets/location5.jpg'),
    require('../../assets/location6.jpg'),
    require('../../assets/location7.jpg'),
    require('../../assets/location8.jpg'),
    require('../../assets/location7.jpg'),
  
  ];

  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef();
  const renderPhotosInRows = () => {
    // const columns = 3;
   
    const columns = Math.random() < 0.5 ? 2 : 3;
    const photoRows = [];


  // useEffect(() => {
  //   const delay = 4000; 
  //   setTimeout(() => {
  //     setLoading(false); 
  //   }, delay);
  // }, []);

  if (loading) {
    return  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>;
  

  
  }

  if (!postsList) {
    return <Text style={{textAlign:'center'}}>No posts available for {place.location}.</Text>;
  }

  if (postsList.results && postsList.results.length === 0) {

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image source={noData} style={{ width: 100, height:100,  paddingLeft:10, marginTop:20  }} />
    <Text>No posts available for {place.location}.</Text>
  </View>;
  }
    
    for (let i = 0; i < postsList.count; i += columns) {
      const photoRow = postsList.results.slice(i, i + columns);
      const rowElements = photoRow.map((item, index) => (
        
        <View
          key={index}
          style={{
            flex: 1,
            aspectRatio:1,
            margin: 0.3
          }}
        >
           <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>navigation.navigate('DetailsScreen', item)}>
          <Image
            source={item.photo}
            // item
            placeholder={blurhash}
            transition={1000}
            style={{ width: "100%", height: "100%" }}
          />
          </TouchableOpacity>
        </View>
      )
      
      );

      photoRows.push(
        <View
          key={i}
          style={{ flexDirection: 'row', marginBottom: 0 }}
        >
          {rowElements}
        </View>
      );
    }
    return photoRows;

    
  };


  const checkEndReached = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const containerHeight = event.nativeEvent.layoutMeasurement.height;

    // Check if the user is at or near the end of the content
    if (offsetY + containerHeight >= contentHeight - 0) {
      console.log('Reached the end of content');
      // You can trigger an action here
    }
  };

 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <ScrollView  ref={scrollViewRef}
      onScroll={checkEndReached}
      //  contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
    
      <View style={{ flex: 1 }}>



      <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
     
      <View style={styles.containerr}>
      <Image
       source={place.photo}
       transition={2000}
        // src={(place.photo)}
        placeholder={blurhash}
       
        style={styles.image}
      />
      <Text style={styles.locationName}>{place.name}</Text>
    
      <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', place)} style={styles.locationName1}>
            <Text
              style={{color: 'white',}}>
              <MaterialIcons name="remove-red-eye" size={16} color="white" />
            </Text>
          </TouchableOpacity>
    </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        {/* <Image
          source={require('../../assets/location7.jpg')}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginTop: -90,
          }}
        /> */}

        {/* <Text
          style={{
            
            color: COLORS.primary,
            marginVertical: 8,
          }}
        >
          Melissa Peters
        </Text>
        <Text
          style={{
            color: COLORS.black,
            
          }}
        >
          Interior designer
        </Text> */}

        <View
          style={{
            flexDirection: "row",
            // marginVertical: 6,
            alignItems: "center",
          }}
        >
          {/* <MaterialIcons name="location-on" size={24} color="black" /> */}
          {/* <Text
            style={{
            
              marginLeft: 4,
            }}
          >
            Lagos, Nigeria
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal:5,
            }}
          >
            <Text
              style={{
              
                color: COLORS.primary,
              }}
            >
              122
            </Text>
            <Text
              style={{
               
                color: COLORS.primary,
              }}
            >
              Followers
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 2,
            }}
          >
            <Text
              style={{
               
                color: COLORS.primary,
              }}
            >
              67
            </Text>
            <Text
              style={{
              
                color: COLORS.primary,
              }}
            >
              Followings
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 3,
            }}
          >
            <Text
              style={{
              
                color: COLORS.primary,
              }}
            >
              77K
            </Text>
            <Text
              style={{
                
                color: COLORS.primary,
              }}
            >
              Likes
            </Text>
          </View>
        </View> */}
         </View>

        {/* <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              marginHorizontal: 2 * 2,
            }}
          >
            <Text
              style={{
                
                color: COLORS.white,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              marginHorizontal: 2 * 2,
            }}
          >
            <Text
              style={{
              
                color: COLORS.white,
              }}
            >
              Add Friend
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={{ flex: 1, marginHorizontal: 22, }}>
      {/* marginTop: 20  */}
      
      </View>
    </SafeAreaView>



    {/* <FlatList
      data={photos}
    
      numColumns={3}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            aspectRatio: 1,
            margin:1,
          }}
        >
          <Image
            key={index}
            source={item}
            style={{ width: "100%", height: "100%", }} 
            // borderRadius: 12
          />
        </View>
         )}
         /> */}



<View style={styles.photoGrid}>{renderPhotosInRows()}</View>

       </View>

       
       
      </ScrollView>
    </SafeAreaView>
  );

  setInterval(renderPhotosInRows, 5000);
};

const styles = StyleSheet.create({
  containerr: {
    width: '100%',
  },
  photoGrid: {
    marginBottom: 0,
    
  },
  image: {
    // height: 350,
    width: '100%',
    aspectRatio:8/9
    
  },
  locationName: {
    position: 'absolute',
    bottom: 10, // Adjust the top position as needed
    left: 10, // Adjust the left position as needed
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background for readability
    padding: 5,
    borderRadius: 5,
  },

  locationName1: {
    position: 'absolute',
    bottom: 10, // Adjust the top position as needed
    right: 10, // Adjust the left position as needed
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background for readability
    padding: 5,
    borderRadius: 5,
  },
});

export default ProfileScreen;
