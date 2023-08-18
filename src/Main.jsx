import React, { useState } from 'react';
import { View, Button, TextInput, Alert, Linking, StyleSheet, ImageBackground } from 'react-native';
import datosPos from './datosPos.json';

const App = () => {
  const [pos, setPos] = useState('');
  const [wazeLink, setWazeLink] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');

  const fetchData = () => {
    const data = datosPos;

    const posData = data.find(item => item.POS === parseInt(pos, 10));

    if (posData) {
      const coordenadasData = posData.COORDENADAS;
      const wazeLink = `https://www.waze.com/ul?ll=${coordenadasData}&navigate=yes`;
      const googleMapsLink = `https://www.google.com/maps?q=${coordenadasData}`;
      setWazeLink(wazeLink);
      setGoogleMapsLink(googleMapsLink);
    } else {
      Alert.alert('Error', 'No se encontraron datos para el número de POS ingresado');
    }
  };

  const handleButtonPress = () => {
    if (pos.trim() !== '') {
      fetchData();
    } else {
      Alert.alert('Error', 'Por favor, ingrese el número de POS');
    }
  };

  const handleWazeLinkPress = () => {
    Linking.openURL(wazeLink);
  };

  const handleGoogleMapsLinkPress = () => {
    Linking.openURL(googleMapsLink);
  };

  return (
    <ImageBackground source={require('./images/background.webp')} style={styles.container}>
      <View style={styles.content}>
        <TextInput
          placeholder="Número de POS"
          value={pos}
          onChangeText={text => setPos(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <Button title="BUSCAR UBICACION POS" onPress={handleButtonPress} />
        {wazeLink && (
          <Button title="UBICACION WAZE" onPress={handleWazeLinkPress} />
        )}
        {googleMapsLink && (
          <Button title="UBICACION GOOGLE MAPS" onPress={handleGoogleMapsLinkPress} />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default App;
