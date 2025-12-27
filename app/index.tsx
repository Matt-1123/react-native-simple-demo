// @ts-nocheck
import AboutPage from '@/components/About';
import CountdownTimerGame from '@/components/CountdownGame';
import ReflexTest from '@/components/ReflexTest';
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from "expo-font";
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';

// Home Page Component
const HomePage = ({ onNavigate }) => {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular
  });
  
  if (!fontsLoaded) {
    return null;
  } else {
  return (
      <View className="flex-1 bg-blue-50 items-center justify-center px-6">
        <Text style={{ fontFamily: 'PressStart2P_400Regular' }} className="text-4xl text-blue-900 mb-4 text-center">
          Welcome to Mini Game Hub!
        </Text>
        <Text className="text-lg text-gray-700 text-center mb-8">
          Choose an option below
        </Text>
        <TouchableOpacity 
          onPress={() => onNavigate('countdown-timer')}
          className="bg-blue-600 px-8 py-4 rounded-lg shadow-lg mb-4"
        >
          <Text className='text-white font-semibold text-lg'>Countdown Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => onNavigate('reflex-test')}
          className="bg-blue-600 px-8 py-4 rounded-lg shadow-lg mb-4"
        >
          <Text className='text-white font-semibold text-lg'>Reflex Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNavigate('about')}
          className="bg-blue-600 px-8 py-4 rounded-lg shadow-lg mb-4"
        >
          <Text className="text-white font-semibold text-lg">About</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  return (
    <SafeAreaView className="flex-1">
      {currentPage === 'home' ? (
        <HomePage onNavigate={setCurrentPage} />
      ) : currentPage === 'about' ? (
        <AboutPage onNavigate={setCurrentPage} />
      ) : currentPage === 'countdown-timer' ? (
        <CountdownTimerGame onNavigate={setCurrentPage} />
      ) : currentPage === 'reflex-test' ? (
        <ReflexTest onNavigate={setCurrentPage} />
      ) : null}
    </SafeAreaView>
  );
}