import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { Picker } from '@react-native-picker/picker';

const CheckoutPage = ({ clientSecret }) => {
  const { confirmPayment, handleCardAction } = useStripe();

  const [name, setName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState(''); // You may want to fetch a list of countries dynamically
  const [postcode, setPostcode] = useState('');
  const countries = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'India', value: 'IN' },
    { label: 'England', value: 'EN' },
    { label: 'Australia', value: 'AUS' },
    // Add more countries as needed
  ];

  useEffect(() => {
    console.log('Selected Country:', country);
  }, [country]);

  const handlePayment = async () => {
    try {
      const { paymentIntent, error } = await confirmPayment(clientSecret);
      if (error) {
        console.error(error);
      } else if (paymentIntent) {
        // Payment successful, handle the response
        console.log(paymentIntent);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style ={styles.container}>
      <Text style={{fontSize:22,color:'white',marginLeft:15,marginBottom:10,marginTop:10,color:'gray'}}>Billing info</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Address"
        value={streetAddress}
        onChangeText={(text) => setStreetAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
   <Picker
        selectedValue={country}
        onValueChange={(itemValue) => setCountry(itemValue)}
        style={styles.picker}
        label="Select Country"
        mode="dropdown" 
      >
        <Picker.Item label="Select Country"  style={styles.pickerItem}/>
        {countries.map((c) => (
          <Picker.Item key={c.value} label={c.label} value={c.value} />
        ))}
      </Picker>

      <Text style={{fontSize:22,color:'white',marginLeft:15,marginBottom:10,marginTop:10,color:'gray'}}>Payment Info</Text>
      {/* Use CardField for payment input */}
      <CardField
     
      
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 60,
          marginVertical: 10,
          borderRadius:30,
          fontSize:40
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={{fontSize:24}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems:'center',
    
  
  },
  input: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 15,
    marginLeft:15,
    marginRight:15,
    marginBottom:15,
    fontSize:24,
    width:370

  
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
 
  button: {
   
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom:3,
    alignItems:'center',
    width:200
    
 
    
  },

  picker: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    width: 370,
  },
  pickerItem: {
    fontSize: 24,
    color: 'black', // Text color for picker items
   
  },
});



export default CheckoutPage;
