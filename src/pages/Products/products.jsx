import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Config from 'react-native-config';
import ProductCard from '../../components/ProductCard/ProductCard';
import useFetch from '../../hooks/useFetch/useFetch';
import Loading from '../../components/loading';
import Error from '../../components/error';
import Filter from '../../components/filter/Filter';

const Products = ({navigation}) => {
  const {data, loading, error} = useFetch(`${Config.API_URL}`);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);

  // Kategorileri çek
  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
      setFilteredData(data);
    }
  }, [data]);

  // Filtreleme fonksiyonu
  const handleApplyFilters = filters => {
    let result = [...data];

    // Kategoriye göre filtrele
    if (filters.category && filters.category !== 'all') {
      result = result.filter(item => item.category === filters.category);
    }

    // Minimum puana göre filtrele
    if (filters.minRating > 0) {
      result = result.filter(item => item.rating.rate >= filters.minRating);
    }

    // Maksimum fiyata göre filtrele
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      if (!isNaN(maxPrice)) {
        result = result.filter(item => item.price <= maxPrice);
      }
    }

    // İndirimli ürünleri filtrele
    if (filters.hasDiscount) {
      result = result.filter(item => item.price < item.originalPrice);
    }

    setFilteredData(result);
  };

  const renderProducts = ({item}) => (
    <ProductCard product={item} onSelect={() => handleProductSelect(item.id)} />
  );

  const handleProductSelect = id => {
    navigation.navigate('Detail', {id});
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <Filter categories={categories} onApplyFilters={handleApplyFilters} />

      <FlatList
        data={filteredData}
        renderItem={renderProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default Products;
