import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import GalioApp from "./routes";
import { GalioProvider  } from "galio-framework";
import themes from './Screens/themes'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GalioProvider >
        <GalioApp/>
      </GalioProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
