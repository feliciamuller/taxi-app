import React, { useState } from 'react';
import { TextInputComponent, View } from 'react-native';
import { SafeAreaView, TextInput, Text, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

registerRootComponent(App);

export default function App() {
  const [stringKm, setStringKm] = useState<string>('');
  const [km, setKm] = useState<number | undefined>();

  const blueColor = '#002684';
  const taxa = 23.81;
  const startingFee = 155;

  const calculatePrice = (): number | undefined => {
    if (km !== undefined) {
      const price = taxa * km + startingFee;

      return Math.round(price);
    }
    return undefined;
  };

  const handleInputKm = (input: string) => {
    const convertedInput = input.replace('.', ',');
    setStringKm(convertedInput.replace(/[^0-9,]/g, ''));

    const normalizedInput = convertedInput.replace(',', '.');
    const parsedValue = parseFloat(normalizedInput);
    if (!isNaN(parsedValue)) {
      setKm(parsedValue);
    } else {
      setKm(undefined);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.description}>
          Ange km <FontAwesome name="road" size={30} color={blueColor} />
        </Text>
        <TextInput
          keyboardType="decimal-pad"
          style={styles.input}
          placeholder="km"
          placeholderTextColor="grey"
          onChangeText={(input) => handleInputKm(input)}
          value={stringKm}
        />
        <Text style={styles.description}>Taxa: {taxa}</Text>
        <Text style={styles.description}>Startkostnad: {startingFee} </Text>
        <Text style={styles.priceText}>
          Pris: <Text style={styles.amountText}>{calculatePrice()}</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7db02',
  },
  input: {
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'black',
    height: 70,
    fontSize: 28,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  priceText: {
    padding: 16,
    fontSize: 40,
  },
  textBox: {
    marginTop: 100,
  },
  description: {
    padding: 16,
    fontSize: 32,
  },
  amountText: {
    fontWeight: 'bold',
  },
});
