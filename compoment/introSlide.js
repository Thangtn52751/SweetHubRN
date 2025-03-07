import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';


const App = ({ navigation }) => {
    
    const handleLogin = () => {
        navigation.navigate('Login')
    }
  return (
    <Swiper
      loop={false}
      showsPagination={true}
      activeDotStyle={styles.activeDot}
      dotStyle={styles.dot}
    >
      {/* Slide 1 */}
      <View style={styles.slide}>
        <Image source={require('../img/Image.png')} style={styles.image} />
        <Text style={styles.title}>Endless Sweet Delights</Text>
        <Text style={styles.subtitle}>
          Indulge in a world of delicious desserts that will satisfy your sweet tooth with our wide selection of cakes, cupcakes, and cookies.
        </Text>
      </View>

      {/* Slide 2 */}
      <View style={styles.slide}>
        <Image source={require('../img/Image2.png')} style={styles.image} />
        <Text style={styles.title}>Create Your Dream Cake</Text>
        <Text style={styles.subtitle}>
          Our flexible custom cake options let you personalize every aspect of your cake to make it truly unique.
        </Text>
      </View>

      {/* Slide 3 */}
      <View style={styles.slide}>
        <Image source={require('../img/Image3.png')} style={styles.image} />
        <Text style={styles.title}>Hassle-Free Ordering</Text>
        <Text style={styles.subtitle}>
          Enjoy a seamless and convenient ordering experience with our online platform that lets you get your cake delivered to your doorstep.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6F61',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#FF6F61',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default App;
