import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function FiltersScreen() {
  const [preferredGender, setPreferredGender] = useState({
    male: false,
    female: true,
    nonbinary: false,
  });
  const [ageRange, setAgeRange] = useState([18, 80]);
  const [distance, setDistance] = useState(10);
  const [showExtendedDistance, setShowExtendedDistance] = useState(true);
  const [languages, setLanguages] = useState(['English', 'Spanish']);

  const toggleGender = (gender) => {
    setPreferredGender((prev) => ({
      ...prev,
      [gender]: !prev[gender],
    }));
  };

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log("Filters applied");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Filters</Text>
      </View>

      {/* Preferred Gender */}
      <Text style={styles.sectionTitle}>What is your preferred gender?</Text>
      <View style={styles.checkboxContainer}>
        {['Male', 'Female', 'Nonbinary'].map((gender) => (
          <TouchableOpacity
            key={gender}
            style={styles.checkbox}
            onPress={() => toggleGender(gender.toLowerCase())}
          >
            <Text>{gender}</Text>
            <View style={styles.checkboxOuter}>
              {preferredGender[gender.toLowerCase()] && <View style={styles.checkboxInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Age Range */}
      <Text style={styles.sectionTitle}>Age range:</Text>
      <Slider
        style={styles.slider}
        minimumValue={18}
        maximumValue={80}
        step={1}
        value={ageRange[1]}
        onValueChange={(value) => setAgeRange([ageRange[0], value])}
        minimumTrackTintColor="#00CFFF"
        maximumTrackTintColor="#E0E0E0"
      />
      <Text style={styles.ageRangeText}>{`${ageRange[0]} - ${ageRange[1]}`}</Text>

      {/* Distance */}
      <Text style={styles.sectionTitle}>Distance:</Text>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={80}
        step={1}
        value={distance}
        onValueChange={(value) => setDistance(value)}
        minimumTrackTintColor="#00CFFF"
        maximumTrackTintColor="#E0E0E0"
      />
      <Text style={styles.distanceText}>{`${distance} km`}</Text>
      <View style={styles.switchContainer}>
        <Text>Show profiles within a 15-km range when run out of matches.</Text>
        <Switch
          value={showExtendedDistance}
          onValueChange={setShowExtendedDistance}
          trackColor={{ true: '#00CFFF', false: '#E0E0E0' }}
        />
      </View>

      {/* Languages */}
      <Text style={styles.sectionTitle}>Languages:</Text>
      <View style={styles.languageContainer}>
        {languages.map((language) => (
          <TouchableOpacity key={language} style={styles.languageTag}>
            <Text style={styles.languageText}>{language}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Clear all" color="#E0E0E0" onPress={() => {/* Clear filters logic */}} />
        <Button title="Apply filters" color="#00CFFF" onPress={handleApplyFilters} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxOuter: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#00CFFF',
    borderRadius: 2,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  ageRangeText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  distanceText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageTag: {
    backgroundColor: '#E0F7FA',
    padding: 8,
    borderRadius: 20,
    margin: 4,
  },
  languageText: {
    color: '#00CFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

