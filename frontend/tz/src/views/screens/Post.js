import React, { useState, useEffect, useRef } from 'react';
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
  import { Image } from 'expo-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import places from '../../consts/places';
import AuthService from '../../services/auth/auth_service';
const {width} = Dimensions.get('screen');
const blurhash =
  'LNF#g#R-E1slYRR+r;oJM~aebFof'
import MasonryList from '@react-native-seoul/masonry-list';

const Post = ({ navigation }) => {
  const [postsList, setPostsList] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setPostsList((prevData) => [...prevData, ...responseData.results]);
      setLoading(false);
      setNextPage(responseData.next);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('http://192.168.100.55:8005/tz/posts');
  }, []);

 

  const RecommendedCard2 = ({ d, index }) => {
    // let isEven = index%2==0;
    // return (
    //   <TouchableOpacity
    //     activeOpacity={0.8}
    //     style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven?8:0}}
    //     onPress={() => navigation.navigate('DetailsScreen', d)}
    //   >
    //     <View style={{ position: 'relative', overflow: 'hidden' }}>
    //       <Image
    //         source={{ uri: d.photo }} // Set the image source here
    //         style={{ ...style.rmCardImage2 }}
    //       />
    //       <View style={style.overlay}>
    //         <Text style={style.title}>{d.name}</Text>
    //         <View style={style.details}>
    //           <View style={style.detailRow}>
    //             <Icon name="place" size={22} color={COLORS.white} />
    //             <Text style={style.detailText}>{d.place.location}</Text>
    //           </View>
    //           <View style={style.detailRow}>
    //             <Icon name="star" size={22} color={COLORS.white} />
    //             <Text style={style.detailText}>{d.place.rate}</Text>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // );

    let isEven = index%2==0;
    return (
        <View style={{width: '100%',  }}>
          {/* paddingLeft: isEven? 0:8, paddingRight: isEven?8:0 */}
          <TouchableOpacity
        activeOpacity={0.8}

             onPress={() => navigation.navigate('DetailsScreen', d)}
                style={{width: '100%',  paddingLeft: isEven? 3:3, paddingRight: isEven?3:3,}}
               
               
            >
                {/* <Image 
                    source={{uri: item.strMealThumb}}
                    style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}}
                    className="bg-black/5"
                /> */}
                  <Image
                  source={{ uri: d.photo }}
                  transition={100}
            
            placeholder={blurhash}
                    style={{width: '100%', aspectRatio:6/9, borderRadius: 10}}
                    // height: index%3==0? hp(25): hp(35)
                   
                />
                
                <Text style={{fontSize: hp(1.5), marginLeft: 5, paddingBottom: 12}} >
                    {
                        d.name.length>20? d.name.slice(0,30)+'...': d.name
                    }
                </Text>
            </TouchableOpacity>
        </View>
    )
  };


  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const containerHeight = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + containerHeight >= contentHeight * 0.5) {
      // Load more data when you're 90% scrolled to the bottom
      console.log('load more data');
      if (!loading && nextPage) {
        setLoading(true);
        fetchData(nextPage);
      }
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <MasonryList
        data={postsList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => <RecommendedCard2 d={item} index={i} />}
        onEndReachedThreshold={0.1}
        onEndReached={() => console.log('end')}
      />
    </ScrollView>
  );
};
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
export default Post