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
        <Text className="font-press-start-2p text-4xl text-[#0000BC] mb-4 text-center">
          Welcome to Mini Game Hub!
        </Text>
        <Text className="font-press-start-2p text-lg text-gray-700 text-center mb-8">
          Choose an option below
        </Text>
        <TouchableOpacity 
          onPress={() => onNavigate('countdown-timer')}
          className="inline-block min-w-[275px] w-auto m-4 px-3 py-3 text-[2.2rem] uppercase text-white bg-[#881400] hover:bg-[#881400] focus:bg-[#881400] cursor-pointer box-border border-[6px] border-t-white/50 border-l-black/50 border-r-white/50 border-b-black/50 [border-style:inset]"
        >
          <Text className='font-press-start-2p text-white font-semibold text-lg'>Countdown Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => onNavigate('reflex-test')}
          className="inline-block min-w-[275px] w-auto m-4 px-3 py-3 text-[2.2rem] uppercase text-white bg-[#0000BC] hover:bg-[#0000BC] focus:bg-[#0000BC] cursor-pointer box-border border-[6px] border-t-white/50 border-l-black/50 border-r-white/50 border-b-black/50 [border-style:inset]"
        >
          <Text className='font-press-start-2p text-white font-semibold text-lg text-center'>Reflex Test</Text>
        </TouchableOpacity>
        {/* 0000BC */}
        <TouchableOpacity
          onPress={() => onNavigate('about')}
          className="inline-block min-w-[275px] w-auto m-4 px-3 py-3 text-[2.2rem] uppercase text-white bg-[#7C7C7C] hover:bg-[#BCBCBC] focus:bg-[#BCBCBC] cursor-pointer box-border border-[6px] border-t-white/50 border-l-black/50 border-r-white/50 border-b-black/50 [border-style:inset]"
        >
          <Text className="font-press-start-2p text-white font-semibold text-lg text-center">About</Text>
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