import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import NfcManager, { Ndef } from 'react-native-nfc-manager';

export default function App() {
  useEffect(() => {
    enableNFC();
    return () => {
      disableNFC();
    };
  }, []);

  const enableNFC = async () => {
    try {
      await NfcManager.start();
      console.log('NFC habilitado');
    } catch (error) {
      console.warn('Error al habilitar NFC:', error);
    }
  };

  const disableNFC = async () => {
    try {
      await NfcManager.stop();
      console.log('NFC deshabilitado');
    } catch (error) {
      console.warn('Error al deshabilitar NFC:', error);
    }
  };
 
  const writeNFC = async () => {
    try {
      const url = 'https://www.google.es';
      const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);
      await NfcManager.requestTechnology(NfcManager.NdefTech);
      await NfcManager.writeNdefMessage(bytes);
      console.log('Datos NFC escritos');
    } catch (error) {
      console.warn('Error al escribir datos NFC:', error);
    }
  };
const readNFC = async () => {
    try {
      await NfcManager.requestTechnology(NfcManager.NdefTech);
      const tag = await NfcManager.getTag();
      const ndef = await NfcManager.parseUri(tag.ndefMessage[0]);
      console.log('Datos NFC leídos:', ndef);
    } catch (error) {
      console.warn('Error al leer datos NFC:', error);
    }
  };
  return (
    <View>
      <Button title="Escribir NFC" onPress={writeNFC} />
      <Button title="LEER  NFC" onPress={readNFC} />
      <Button title="ENABLE NFC" onPress={enableNFC} />
      <Button title="DISABLE NFC" onPress={disableNFC} />
    </View>
  );
}
