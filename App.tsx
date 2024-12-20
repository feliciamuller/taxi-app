import React, { useState } from 'react';
import { TextInputComponent, View } from 'react-native';
import { SafeAreaView, TextInput, Text, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

registerRootComponent(App);

export default function App() {
  const [stringKm, setStringKm] = useState<string>(''); // För att lagra kilometer
  const [stringTaxa, setStringTaxa] = useState<string>(''); // För att lagra taxa
  const [km, setKm] = useState<number | undefined>();
  const [taxa, setTaxa] = useState<number | undefined>();

  const blueColor = '#002684';

  const calculatePrice = () => {
    let price;
    if (km !== undefined && taxa !== undefined) {
      price = taxa * km;
    }
    return price;
  };

  const handleInputKm = (input: string) => {
    setStringKm(input.replace(/[^0-9]/g, ''));
    const parsedValue = parseFloat(input);
    if (!isNaN(parsedValue)) {
      setKm(parsedValue);
    } else {
      setKm(undefined);
    }
  };

  const handleInputTaxa = (input: string) => {
    setStringTaxa(input.replace(/[^0-9]/g, ''));
    const parsedValue = parseFloat(input);
    if (!isNaN(parsedValue)) {
      setTaxa(parsedValue);
    } else {
      setTaxa(undefined);
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
        <Text style={styles.description}>
          Ange taxa <FontAwesome name="taxi" size={30} color={blueColor} />
        </Text>
        <TextInput
          keyboardType="decimal-pad"
          placeholder="taxa"
          placeholderTextColor="grey"
          style={styles.input}
          onChangeText={(input) => handleInputTaxa(input)}
          value={stringTaxa}
        />
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
