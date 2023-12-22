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
import axios from "axios";
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import places from '../../consts/places';
import CachedImage from 'expo-cached-image'
import AuthService from '../../services/auth/auth_service';
import MasonryList from '@react-native-seoul/masonry-list';
import pic from '../../assets/loder3.jpg';
import Places from './Places'
const { width } = Dimensions.get('screen');
const blurhash =
  'LNF#g#R-E1slYRR+r;oJM~aebFof'
  
const HomeScreen = ({ navigation }) => {

  const [placesList, setPlacesList] = React.useState([]);
  useEffect(() => {
    AuthService.loadPlace().then(res => {
      setPlacesList(res.data.results)
    })
  }, [])

  


  const setQuery = (text) => {
    if (text.length > 0) {
      AuthService.searchPlace(text).then(res => {
        setPlacesList(res.data.results)
      })
    }
    else {
      AuthService.loadPlace().then(res => {
        setPlacesList(res.data.results)
      })
    }
  }

  // const setQuery = (text) => {
  //   AuthService.searchPlace(text)
  //     .then((res) => {
  //       if (res && res.data && res.data.results) {
  //         if (res.data.results.length === 0) {
  //           // If the search result is empty, make another request to load all data
  //           return AuthService.loadPlace().then(res=>{
  //             setPlacesList(res.data.results)
  //           });; // Assuming you have a function to fetch all data
  //         }
  //         return res.data.results; // Return the search result
  //       } else {
  //         // Handle the case where the response is undefined or missing data
  //         return AuthService.loadPlace().then(res=>{
  //               setPlacesList(res.data.results)
  //             }); // Load all data as a fallback
  //       }
  //     })
  //     .then((data) => {
  //       setPlacesList(data);
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //       console.error(error);
  //     });
  // };


  const [postsList, setPostsList] = React.useState([]);
  // useEffect(() => {
  //   AuthService.loadPost().then(res=>{
  //     console.log(res)
  //     // setPostsList(res.data.results)
  //   })
  // },[])


  const [recommendedList, setRecommendedList] = React.useState([]);
  const [nextPage1, setNextPage1] = React.useState(1);
  const [loadedPages, setLoadedPages] = React.useState(new Set());

  useEffect(() => {
    loadRecommendedData();
  }, []);

  const loadRecommendedData = () => {
    setIsLoading(true);
    if (nextPage1 && !loadedPages.has(nextPage1)) {
      AuthService.loadRecommended(nextPage1)
        .then(res => {
          console.log('API Response:', res);

          if (res && res.data && res.data.results) {
            setRecommendedList(prevList => [...prevList, ...res.data.results]);
            setNextPage1(prevPage => prevPage + 1);  // Increment the nextPage value
            setLoadedPages(new Set(loadedPages).add(nextPage1));
            setIsLoading(false);
          } else {
            // console.error('Invalid response format:', res);
            setNextPage1(null);
            setIsLoading(false);
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            // Handle 404 error (resource not found) here
            
            setNextPage1(null);  // Set nextPage to null if the resource is not found
            setIsLoading(false);
          } else {
            console.error('Error loading recommended data:', error);
          }
        });
    }
  };

  const handleEndReached = () => {
    setNextPage(prevPage => prevPage + 1);  // Increment nextPage before calling loadRecommendedData
    loadRecommendedData();
    console.log('End reached');
  };


  // useEffect(() => {
  //   AuthService.loadRecommended().then(res => {
  //     console.log(res)
  //     setRecommendedList(res.data.results)
  //   })
  // }, [])


  // const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false)

  // Function to fetch data from the API
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      // setData((prevData) => [...prevData, ...responseData.results]);
      setPostsList((prevData) => [...prevData, ...responseData]);
      setLoading(false)
      setNextPage(responseData.next);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchData('http://192.168.100.55:8000/tz/posts');
  }, []); // Empty dependency array means this effect runs only once on component mount

  const handleLoadMore = () => {
    setLoading(true)
    if (nextPage) {
      fetchData(nextPage);
    }
  };










  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = () => {
    setIsLoading(true);
    setLoading(true);
    axios.get(`http://192.168.100.55:8000/tz/posts?page=${currentPage}`)
      .then(res => {
        //setUsers(res.data.results);

        if (res.status === 200) {
          setUsers([...users, ...res.data.results]);
          setIsLoading(false);
          setLoading(false);
        } else if (res.status == 404) {
          setIsLoading(false);
          setLoading(false);

        }


      });
  };


  // const loadMoreItem = () => {
  //   setCurrentPage(currentPage + 1);
  // };

  // useEffect(() => {
  //   getUsers();
  // }, [currentPage]);






  const [isEndReached, setIsEndReached] = useState(false);

  const fetchDataa = async () => {

    // Fetch data from your API
    // Update the placesList and isEndReached based on your data and conditions
  };

  useEffect(() => {
    fetchDataa();
  }, []);

  // const handleScroll = (event) => {
  //   const contentWidth = event.nativeEvent.contentSize.width;
  //   const viewportWidth = event.nativeEvent.layoutMeasurement.width;
  //   const offset = event.nativeEvent.contentOffset.x;

  //   // Determine if you've reached the end based on your criteria
  //   if (contentWidth - offset <= viewportWidth) {
  //     setIsEndReached(true);
  //   }
  // };














  const categoryIcons = [
    <Icon name="flight" size={25} color={COLORS.primary} />,
    <Icon name="beach-access" size={25} color={COLORS.primary} />,
    <Icon name="near-me" size={25} color={COLORS.primary} />,
    <Icon name="place" size={25} color={COLORS.primary} />,
  ];
  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={style.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

  const Card = ({ place }) => {
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
            <View style={{ flexDirection: 'row' }}>
              <Icon name="place" size={18} color={COLORS.white} />
              <Text style={{ marginLeft: 5, fontSize: 12, color: COLORS.white }}>
                {place.location}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="star" size={16} color={COLORS.white} />
              <Text style={{ marginLeft: 5, fontSize: 12, color: COLORS.white }}>{place.rate}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };


  const Card2 = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
      >
        <ImageBackground style={style.cardImage} source={pic} >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: 1,
            }}>
            {/* {place.name} */}
          </Text>
          <View style={style.centeredContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{ flexDirection: 'row' }}>
              {/* <Icon name="place" size={20} color={COLORS.white} /> */}

              <Text style={{ marginLeft: 5, color: COLORS.white }}>
                {/* {place.location} */}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {/* <Icon name="star" size={20} color={COLORS.white} /> */}
              {/* <Text style={{marginLeft: 5, color: COLORS.white}}>{place.rate}</Text> */}
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };


  const RecommendedCard = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Profile', place)}>
        <ImageBackground style={style.rmCardImage} src={place.photo} resizeMode="cover">
          <Text
            style={{
              color: COLORS.white,
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 1,
            }}>
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                {/* <Icon name="place" size={22} color={COLORS.white} /> */}
                <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                  {/* {place.place.location} */}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                {/* <Icon name="star" size={22} color={COLORS.white} />
              <Text style={{color: COLORS.white, marginLeft: 5}}>5.0</Text> */}

              </View>
            </View>
            <Text style={{ color: COLORS.white, fontSize: 13 }}>
              {/* {place.details} */}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };


  const RecommendedCardLoder0 = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}>
        <Image
          source={pic} // Set the image source here
          style={style.rmCardImage}
        />
        <Text
          style={{
            color: COLORS.white,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 2,
          }}
        >
          {/* {place.name} */}
        </Text>
        <View >

        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="place" size={22} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                {/* {place.location} */}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {/* <Icon name="star" size={22} color={COLORS.white} />
            <Text style={{ color: COLORS.white, marginLeft: 5 }}>5.0</Text> */}

            </View>
          </View>
          <Text style={{ color: COLORS.white, fontSize: 13 }}>
            {/* {place.details} */}

          </Text>
        </View>
      </TouchableOpacity>
    );
  };


  // const RecommendedCard2 = ({d}) => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.8}
  //       onPress={() => navigation.navigate('DetailsScreen', d)}>
  //     <ImageBackground  style={{ ...style.rmCardImage2,  }} src={d.photo}>
  //       <Text
  //         style={{
  //           color: COLORS.white,
  //           fontSize: 18,
  //           fontWeight: 'bold',
  //           padding: 10,

  //         }}>
  //         {d.name}
  //       </Text>
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: 'space-between',
  //           alignItems: 'flex-end',
  //         }}>
  //         <View style={{width: '100%', flexDirection: 'row', marginTop: 0}}>
  //           <View style={{flexDirection: 'row'}}>
  //             <Icon name="place" size={22} color={COLORS.white} />
  //             <Text style={{color: COLORS.white, marginLeft: 5}}>
  //               {d.place.location}
  //             </Text>
  //           </View>
  //           <View style={{flexDirection: 'row'}}>
  //             <Icon name="star" size={22} color={COLORS.white} />
  //             <Text style={{color: COLORS.white, marginLeft: 5}}>{d.place.rate}</Text>
  //           </View>
  //         </View>
  //         <Text style={{color: COLORS.white, fontSize: 13}}>
  //           {/* {place.details} */}
  //         </Text>
  //       </View>
  //     </ImageBackground>
  //     </TouchableOpacity>
  //   );
  // };


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

    let isEven = index % 2 == 0;
    return (
      <View style={{ width: '100%', }}>
        {/* paddingLeft: isEven? 0:8, paddingRight: isEven?8:0 */}
        <TouchableOpacity
          activeOpacity={0.8}

          onPress={() => navigation.navigate('DetailsScreen', d)}
          style={{ width: '100%', paddingLeft: isEven ? 3 : 3, paddingRight: isEven ? 3 : 3, }}


        >
          <Image
            source={{ uri: d.photo }}
            style={{ alignSelf: 'stretch', width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 10, }}
            className="bg-black/5"
          />

          {/* <CachedImage
            source={{ uri: `${d.photo}`, }}
            style={{ width: '100%', aspectRatio: 6 / 9, borderRadius: 10 }}
            // height: index%3==0? hp(25): hp(35)
            cacheKey={`${d.id}-thumb`}
            transition={100}
            placeholder={blurhash}
            contentFit="cover"
       
          /> */}

          <Text style={{ fontSize: hp(1.5), marginLeft: 5, paddingBottom: 12 }} >
            {
              d.name.length > 20 ? d.name.slice(0, 30) + '...' : d.name
            }
          </Text>
        </TouchableOpacity>
      </View>
    )
  };


  const RecommendedLoder = (key) => {
    let isEven = key % 2 == 0;
    return (
      <View style={{ width: '98%', }}>
        {/* paddingLeft: isEven? 0:8, paddingRight: isEven?8:0 */}
        <Pressable

          style={{ width: '100%', paddingLeft: isEven ? 5 : 8, paddingRight: isEven ? 1 : 0, }}


        >
          {/* <Image 
                    source={{uri: item.strMealThumb}}
                    style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}}
                    className="bg-black/5"
                /> */}
          <Image
            source={{ pic }}
            transition={2000}

            placeholder={blurhash}
            style={{ width: '100%', height: key % 3 == 0 ? hp(25) : hp(35), borderRadius: 10 }}

          />

          <Text style={{ fontSize: hp(1.5) }} >
            Loading...
          </Text>
        </Pressable>
      </View>
    )
  };

  // const checkEndReached = (event) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   const contentHeight = event.nativeEvent.contentSize.height;
  //   const containerHeight = event.nativeEvent.layoutMeasurement.height;

  //   // Check if the user is at or near the end of the content
  //   if (offsetY + containerHeight >= contentHeight - 0) {
  //     // console.log('Reached the end of content');

  //     loadMoreItem()
  //     // You can trigger an action here
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <Icon name="sort" size={28} color={COLORS.white} />
        <Icon name="notifications-none" size={28} color={COLORS.white} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        //  contentContainerStyle={{ paddingBottom: 20 }} 
        onEndReachedThreshold={() => setLoading(true)}
      // onScroll={checkEndReached}
      >
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}>
          <View style={{ flex: 1 }}>
            <Text style={style.headerTitle}>Explore the</Text>
            <Text style={style.headerTitle}>beautiful of Tanzania</Text>
            <View style={style.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                onChangeText={(text) => setQuery(text)}
                placeholder="Search place"
                style={{ color: 'black', width: '96%' }}
              />
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={style.sectionTitle}>Places <Icon name="keyboard-arrow-right" size={12} color="black" /></Text>
        <View>



          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={placesList}
            renderItem={({ item }) => <Card place={item} />}
            onEndReached={() => console.log('end reached')}
            onEndReachedThreshold={0.1} // Try lowering the threshold
          />



          {/* <Places navigation={navigation}/> */}

          {isEndReached && (
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={fetchData} // Load more data when you've reached the end
              style={styles.button}
            >
              <Text style={styles.buttonText}>Load more</Text>
            </TouchableOpacity>
          )}



          {placesList.length === 0 && (
            // Display a loading message or animation while data is loading
            <FlatList
              contentContainerStyle={{ paddingLeft: 20 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={places}
              renderItem={({ item }) => <Card2 place={item} />}

            />
          )}
          <Text style={style.sectionTitle}>Recommended <Icon name="keyboard-arrow-right" size={15} color="black" /> </Text>
          <FlatList
            // snapToInterval={width - 20}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20, }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={recommendedList}
            renderItem={({ item }) => <RecommendedCard place={item} />}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
          />

  {isLoading && (
          <ActivityIndicator style={{ paddingBottom: 20 }} size="large" color={COLORS.primary} />
        )}

          {recommendedList.length === 0 && (
            // Display a loading message or animation while data is loading
            <FlatList
              // snapToInterval={width - 20}
              contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={places}
              renderItem={({ item }) => <RecommendedCardLoder0 place={item} />}
            />
          )}

          <Text style={style.sectionTitle}>Posts</Text>
          {/* <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{ paddingBottom: 20}}
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({item}) => <RecommendedCard2 place={item} />}
          /> */}

          {/* {postsList.map((d, index) => (
        
          <RecommendedCard2 key={index} d={d} />
          
        ))} */}

          <MasonryList
          sorted 
            style={{ alignSelf: 'stretch' }}
            contentContainerStyle={{
              paddingHorizontal: 10,
              alignSelf: 'stretch',
            }}
            data={postsList}
            estimatedItemSize={200}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecommendedCard2 d={item} index={i} />}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
            onEndReached={() => console.log('end')}
          />

          {postsList.length === 0 && (



            <>

              <MasonryList
                data={places}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, i }) => <RecommendedLoder d={item} key={i} />}
                // refreshing={isLoadingNext}
                // onRefresh={() => refetch({first: ITEM_CNT})}
                onEndReachedThreshold={0.1}
              // onEndReached={() => loadNext(ITEM_CNT)}
              />
            </>

            // <Text>No data available.</Text>
          )}
        </View>

        {/* <View>
          {data.map((item) => (
                  <View key={item.id}>
                  
                    <Text>{item.name}</Text>
                    <Text>{item.description}</Text>
                  
                  </View>
                ))}
          </View> */}

        {loading && (
          <ActivityIndicator style={{ paddingBottom: 20 }} size="large" color={COLORS.primary} />
        )}
        {/* {nextPage && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLoadMore}
          style={style.button}
        >
          <Text style={style.buttonText}>View more</Text>
        </TouchableOpacity>
      )} */}
      </ScrollView>
    </SafeAreaView>

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
  masonry__container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  masonry__column: {
    // Might be able to disregard
    flexDirection: 'column'
  }
});
export default HomeScreen;











// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, StatusBar } from "react-native";
// import axios from "axios";
// import MasonryList from '@react-native-seoul/masonry-list';

// const HomeScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   const getUsers = () => {
//     setIsLoading(true);
//     axios.get(`http://192.168.100.55:8005/tz/posts?page=${currentPage}`)
//       .then(res => {
//         //setUsers(res.data.results);
//         setUsers([...users, ...res.data.results]);
//         setIsLoading(false);
//       });
//   };

//   const renderItem = ({ item }) => {
//     return (
//       <View style={styles.itemWrapperStyle}>
//         <Image style={styles.itemImageStyle} src={item.photo} />
//         {/* <View style={styles.contentWrapperStyle}>
//           <Text style={styles.txtNameStyle}>{`${item.name} ${item.name.first} ${item.name}`}</Text>
//           <Text style={styles.txtEmailStyle}>{item.name}</Text>
//         </View> */}
//       </View>
//     );
//   };

//   const renderLoader = () => {
//     return ( 
//       isLoading ?
//         <View style={styles.loaderStyle}>
//           <ActivityIndicator size="large" color="#aaa" />
//         </View> : null
//     );
//   };

//   const loadMoreItem = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   useEffect(() => {
//     getUsers();
//   }, [currentPage]);

//   return (
//     <View style={{flex:1,}}>
//       <StatusBar backgroundColor="#000" />
//       <MasonryList
//         data={users}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         ListFooterComponent={renderLoader}
//         onEndReached={loadMoreItem}
//         onEndReachedThreshold={0}
//       />

//                 {/* <MasonryList
//                     data={users}
//                     keyExtractor={(item) => item.id}
//                     numColumns={2}
//                     showsVerticalScrollIndicator={false}
//                     renderItem={renderItem}
//                     // refreshing={isLoadingNext}
//                     // onRefresh={() => refetch({first: ITEM_CNT})}
//                     onEndReachedThreshold={0}
//                     ListFooterComponent={renderLoader}
//                     onEndReached={loadMoreItem}

//                 /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   itemWrapperStyle: {
//     flexDirection: "row",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   itemImageStyle: {
//     width: 200,
//     height: 200,
//     marginRight: 16,
//   },
//   contentWrapperStyle: {
//     justifyContent: "space-around",
//   },
//   txtNameStyle: {
//     fontSize: 16,
//   },
//   txtEmailStyle: {
//     color: "#777",
//   },
//   loaderStyle: {
//     marginVertical: 16,
//     alignItems: "center",
//   },
// });

// export default HomeScreen;