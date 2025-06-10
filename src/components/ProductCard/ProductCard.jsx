import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20;

const ProductCard = ({product, onSelect}) => {
  const title =
    product.title.length > 20
      ? product.title.substring(0, 20) + '...'
      : product.title;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSelect}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: product.image}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingItem}>
            <Icon name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{product.rating.rate}</Text>
          </View>
          <View style={styles.ratingItem}>
            <Icon name="comments" size={14} color="#64b5f6" />
            <Text style={styles.ratingText}>{product.rating.count}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.addButton}>
            <Icon name="plus" size={14} color="#fff" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    height: CARD_WIDTH * 0.8,
    backgroundColor: '#f8f8f8',
    padding: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    minHeight: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  addButton: {
    backgroundColor: '#36ff42',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
