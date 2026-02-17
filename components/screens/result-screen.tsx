import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, RotateCw } from 'lucide-react'

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

interface ResultScreenProps {
  result: TestResult
  onNavigate: (screen: string) => void
}

export default function ResultScreen({ result, onNavigate }: ResultScreenProps) {
  const getStatusColor = (label: string, value: string | number): string => {
    if (label === 'glucose' || label === 'lactate' || label === 'uricAcid') {
      if (typeof value === 'string') {
        if (value === 'Normal') return 'green'
        if (value.includes('Elevated') || value.includes('elevated')) return 'yellow'
        if (value === 'High') return 'red'
      }
    }
    return 'blue'
  }

  const getStatusLabel = (label: string, value: string | number): string => {
    const colors = {
      green: '✓ Normal',
      yellow: '⚠ Elevated',
      red: '⚠ High',
      blue: '◆ Measured'
    }
    return colors[getStatusColor(label, value) as keyof typeof colors] || ''
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => onNavigate('home')} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Your Results</h1>
          <p className="text-gray-600 mt-2">{formatDate(result.timestamp)}</p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {result.biomarkers.pH !== undefined && (
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">pH Level</p>
              <p className="text-3xl font-bold text-blue-600">{result.biomarkers.pH}</p>
              <p className="text-xs text-gray-500 mt-2">◆ Measured</p>
            </div>
          )}
          {result.biomarkers.glucose && (
            <div className="bg-white rounded-xl p-4 border border-green-100">
              <p className="text-sm text-gray-600 mb-1">Glucose</p>
              <p className="text-lg font-bold text-green-600">{result.biomarkers.glucose}</p>
              <p className="text-xs text-green-600 mt-2">{getStatusLabel('glucose', result.biomarkers.glucose)}</p>
            </div>
          )}
          {result.biomarkers.lactate && (
            <div className="bg-white rounded-xl p-4 border border-yellow-100">
              <p className="text-sm text-gray-600 mb-1">Lactate</p>
              <p className="text-lg font-bold text-yellow-600">{result.biomarkers.lactate}</p>
              <p className="text-xs text-yellow-600 mt-2">{getStatusLabel('lactate', result.biomarkers.lactate)}</p>
            </div>
          )}
          {result.biomarkers.uricAcid && (
            <div className="bg-white rounded-xl p-4 border border-red-100">
              <p className="text-sm text-gray-600 mb-1">Uric Acid</p>
              <p className="text-lg font-bold text-red-600">{result.biomarkers.uricAcid}</p>
              <p className="text-xs text-red-600 mt-2">{getStatusLabel('uricAcid', result.biomarkers.uricAcid)}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-lg font-semibold">
            Save Result
          </Button>

          <Button
            variant="outline"
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl h-12 text-lg font-semibold"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Report
          </Button>

          <Button
            onClick={() => onNavigate('home')}
            variant="outline"
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl h-12 text-lg font-semibold"
          >
            <RotateCw className="w-5 h-5 mr-2" />
            Retake
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">📋 Disclaimer:</span> These results are for informational purposes only. Consult a healthcare professional for medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
