import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Filter = ({categories = [], onApplyFilters}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    minRating: 0,
    maxPrice: '',
    hasDiscount: false,
  });

  const handleApply = () => {
    onApplyFilters(filters);
    setModalVisible(false);
  };

  const handleReset = () => {
    const resetFilters = {
      category: 'all',
      minRating: 0,
      maxPrice: '',
      hasDiscount: false,
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}>
        <Icon name="filter" size={18} color="#fff" />
        <Text style={styles.filterButtonText}>Filtrele</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtreler</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="times" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
              {/* Kategori Filtresi */}
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Kategoriler</Text>
                <View style={styles.categoryContainer}>
                  {['all', ...categories].map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.categoryButton,
                        filters.category === category &&
                          styles.selectedCategory,
                      ]}
                      onPress={() => setFilters({...filters, category})}>
                      <Text
                        style={[
                          styles.categoryText,
                          filters.category === category &&
                            styles.selectedCategoryText,
                        ]}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Puan Filtresi */}
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Minimum Puan</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <TouchableOpacity
                      key={rating}
                      style={[
                        styles.ratingButton,
                        filters.minRating >= rating && styles.selectedRating,
                      ]}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          minRating: filters.minRating === rating ? 0 : rating,
                        })
                      }>
                      <Icon
                        name="star"
                        size={20}
                        color={filters.minRating >= rating ? '#FFD700' : '#ddd'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Fiyat Filtresi */}
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Maksimum Fiyat</Text>
                <View style={styles.priceInputContainer}>
                  <Text>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    placeholder="Maksimum fiyat girin"
                    value={filters.maxPrice}
                    onChangeText={text =>
                      setFilters({
                        ...filters,
                        maxPrice: text,
                      })
                    }
                  />
                </View>
              </View>

              {/* İndirimli Ürünler */}
              <View style={styles.filterSection}>
                <View style={styles.discountContainer}>
                  <Text style={styles.sectionTitle}>Sadece İndirimliler</Text>
                  <Switch
                    value={filters.hasDiscount}
                    onValueChange={value =>
                      setFilters({...filters, hasDiscount: value})
                    }
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={filters.hasDiscount ? '#f5dd4b' : '#f4f3f4'}
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.actionButton, styles.resetButton]}
                onPress={handleReset}>
                <Text style={styles.resetButtonText}>Sıfırla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.applyButton]}
                onPress={handleApply}>
                <Text style={styles.applyButtonText}>Uygula</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffb936',
    padding: 8,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'flex-end',
  },
  filterButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    padding: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#64b5f6',
  },
  categoryText: {
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  ratingButton: {
    marginRight: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedRating: {
    backgroundColor: '#f0f7ff',
    borderColor: '#64b5f6',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  priceInput: {
    flex: 1,
    padding: 12,
  },
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f5f5f5',
  },
  applyButton: {
    backgroundColor: '#64b5f6',
  },
  resetButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Filter;
