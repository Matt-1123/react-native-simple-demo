// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CountdownTimerGame() {
  const [timeLeft, setTimeLeft] = useState(10000); // 10 seconds in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [finalTime, setFinalTime] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 10) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsVisible(true);
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handlePress = () => {
    if (!isRunning) {
      // Start the countdown
      setIsRunning(true);
      setIsVisible(false);
      setFinalTime(null);
      if (timeLeft === 0) {
        setTimeLeft(10000);
      }
    } else {
      // Stop the countdown and show result
      setIsRunning(false);
      setIsVisible(true);
      setFinalTime(timeLeft);
    }
  };

  const handleReset = () => {
    setTimeLeft(10000);
    setIsRunning(false);
    setIsVisible(true);
    setFinalTime(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    const seconds = totalSeconds % 60;
    return `${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  const getResultMessage = () => {
    if (finalTime === null) return '';
    if (finalTime === 0) return '🎯 PERFECT! You hit 00:00!';
    if (finalTime <= 100) return '🔥 Amazing! So close!';
    if (finalTime <= 500) return '👏 Great job!';
    if (finalTime <= 1000) return '👍 Good attempt!';
    return '💪 Keep trying!';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Countdown Challenge</Text>
      <Text style={styles.subtitle}>How close can you get to 00:00?</Text>

      <View style={styles.timerContainer}>
        {isVisible ? (
          <>
            <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
            {finalTime !== null && (
              <Text style={styles.result}>{getResultMessage()}</Text>
            )}
          </>
        ) : (
          <Text style={styles.hiddenText}>Timer Hidden...</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, isRunning && styles.buttonRunning]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>
          {isRunning ? 'STOP' : 'START'}
        </Text>
      </TouchableOpacity>

      {!isRunning && timeLeft !== 10000 && (
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      )}

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          • Press START to begin the countdown
        </Text>
        <Text style={styles.instructionText}>
          • Timer will be hidden while running
        </Text>
        <Text style={styles.instructionText}>
          • Press STOP when you think it's at 00:00
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#94a3b8',
    marginBottom: 60,
  },
  timerContainer: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#3b82f6',
    fontVariant: ['tabular-nums'],
  },
  hiddenText: {
    fontSize: 24,
    color: '#475569',
    fontStyle: 'italic',
  },
  result: {
    fontSize: 24,
    color: '#22c55e',
    marginTop: 16,
    fontWeight: '600',
  },
  button: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonRunning: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  resetButton: {
    marginTop: 30,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: '#334155',
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  instructions: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'flex-start',
  },
  instructionText: {
    fontSize: 14,
    color: '#64748b',
    marginVertical: 4,
  },
});