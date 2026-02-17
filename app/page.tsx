'use client'

import { useState } from 'react'
import HomeScreen from '@/components/screens/home-screen'
import BiomarkerSelectionScreen from '@/components/screens/biomarker-selection-screen'
import ScanUploadScreen from '@/components/screens/scan-upload-screen'
import ProcessingScreen from '@/components/screens/processing-screen'
import ResultScreen from '@/components/screens/result-screen'
import HistoryScreen from '@/components/screens/history-screen'
import SettingsScreen from '@/components/screens/settings-screen'

type Screen = 'home' | 'biomarker-selection' | 'scan-upload' | 'processing' | 'result' | 'history' | 'settings'

interface TestResult {
  id: string
  timestamp: Date
  biomarkers: {
    pH?: number
    glucose?: string
    lactate?: string
    uricAcid?: string
  }
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [selectedBiomarkers, setSelectedBiomarkers] = useState<string[]>([])
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 86400000),
      biomarkers: { pH: 6.8, glucose: 'Normal', lactate: 'Normal', uricAcid: 'High' }
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 172800000),
      biomarkers: { pH: 7.2, glucose: 'Elevated', lactate: 'Slightly elevated', uricAcid: 'Normal' }
    }
  ])
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null)

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const handleSelectBiomarkers = (biomarkers: string[]) => {
    setSelectedBiomarkers(biomarkers)
    handleNavigate('scan-upload')
  }

  const handleProcessing = () => {
    setCurrentScreen('processing')
    setTimeout(() => {
      const newResult: TestResult = {
        id: String(testResults.length + 1),
        timestamp: new Date(),
        biomarkers: {
          pH: 6.2,
          glucose: 'Normal',
          lactate: 'Slightly elevated',
          uricAcid: 'High'
        }
      }
      setCurrentResult(newResult)
      setTestResults([newResult, ...testResults])
      setCurrentScreen('result')
    }, 2500)
  }

  const handleViewResult = (result: TestResult) => {
    setCurrentResult(result)
    setCurrentScreen('result')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}
      {currentScreen === 'biomarker-selection' && <BiomarkerSelectionScreen onNavigate={handleSelectBiomarkers} />}
      {currentScreen === 'scan-upload' && <ScanUploadScreen onNavigate={handleNavigate} onProcess={handleProcessing} />}
      {currentScreen === 'processing' && <ProcessingScreen />}
      {currentScreen === 'result' && currentResult && (
        <ResultScreen result={currentResult} onNavigate={handleNavigate} />
      )}
      {currentScreen === 'history' && (
        <HistoryScreen results={testResults} onNavigate={handleNavigate} onViewResult={handleViewResult} />
      )}
      {currentScreen === 'settings' && <SettingsScreen onNavigate={handleNavigate} />}
    </main>
  )
}
