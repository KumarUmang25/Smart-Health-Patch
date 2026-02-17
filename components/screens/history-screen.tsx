import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

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

interface HistoryScreenProps {
  results: TestResult[]
  onNavigate: (screen: string) => void
  onViewResult: (result: TestResult) => void
}

export default function HistoryScreen({ results, onNavigate, onViewResult }: HistoryScreenProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
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
          <h1 className="text-3xl font-bold text-gray-900">Test History</h1>
          <p className="text-gray-600 mt-2">{results.length} previous tests</p>
        </div>

        {/* Results List */}
        <div className="space-y-3 mb-8">
          {results.length > 0 ? (
            results.map(result => (
              <button
                key={result.id}
                onClick={() => onViewResult(result)}
                className="w-full text-left bg-white rounded-xl p-4 border border-blue-100 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-900">Biomarker Test</p>
                  <p className="text-sm text-gray-600">{formatDate(result.timestamp)}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {result.biomarkers.pH !== undefined && (
                    <span className="text-blue-600">pH: {result.biomarkers.pH}</span>
                  )}
                  {result.biomarkers.glucose && (
                    <span className="text-green-600">Glucose: {result.biomarkers.glucose}</span>
                  )}
                  {result.biomarkers.lactate && (
                    <span className="text-yellow-600">Lactate: {result.biomarkers.lactate}</span>
                  )}
                  {result.biomarkers.uricAcid && (
                    <span className="text-red-600">Uric Acid: {result.biomarkers.uricAcid}</span>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="bg-blue-50 rounded-xl p-8 text-center border border-blue-100">
              <p className="text-gray-600">No test history yet</p>
            </div>
          )}
        </div>

        <Button
          onClick={() => onNavigate('home')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-lg font-semibold"
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}
