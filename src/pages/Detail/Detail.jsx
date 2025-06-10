import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import useFetch from '../../hooks/useFetch/useFetch';
import Config from 'react-native-config';
import Loading from '../../components/loading';
import Error from '../../components/error';
import Icon from 'react-native-vector-icons/FontAwesome';

const Detail = ({route, navigation}) => {
  const {id} = route.params;
  const {loading, data, error} = useFetch(`${Config.API_URL}/${id}`);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Ürün Resmi */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: data.image}}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Ürün Bilgileri */}
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{data.category}</Text>
          <Text style={styles.title}>{data.title}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Icon name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>
                {data.rating.rate} ({data.rating.count} reviews)
              </Text>
            </View>
            <Text style={styles.price}>${data.price}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Açıklama</Text>
          <Text style={styles.description}>{data.description}</Text>

          <View style={styles.divider} />

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Icon name="truck" size={24} color="#64b5f6" />
              <Text style={styles.featureText}>Ücretsiz Kargo</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="refresh" size={24} color="#64b5f6" />
              <Text style={styles.featureText}>Kolay İade</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sepete Ekle Butonu */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sepete Ekle</Text>
          <Icon
            name="shopping-cart"
            size={20}
            color="#fff"
            style={styles.cartIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: 20,
  },
  category: {
    color: '#64b5f6',
    fontSize: 16,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#666',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#64b5f6',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  cartIcon: {
    marginLeft: 5,
  },
});

export default Detail;
