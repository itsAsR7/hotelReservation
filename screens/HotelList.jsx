import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import { FlatList } from 'react-native';
import ResuseTile from '../components/ResuseTile';
import { getHotels } from '../services/apiservice';
import HotelDetails from './HotelDetails';

const HotelList = ({ navigation }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsData = await getHotels();
        setHotels(hotelsData);
        console.log(hotelsData)
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 50 }}>
        <AppBar
        top={10}
        left={0}
        right={0}
          titleText={'Hotel List'}
          icon={'search'}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Bottom')}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ResuseTile
            item={item}
            onPress={() => navigation.navigate('HotelDetails', item._id)}
          />
        )}
      />
      </View>
    </SafeAreaView>
  );
};

export default HotelList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
