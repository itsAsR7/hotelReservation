import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsData = await getHotels();
        setHotels(hotelsData);
        console.log(hotelsData);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
