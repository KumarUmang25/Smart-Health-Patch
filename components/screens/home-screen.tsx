import { Button } from '@/components/ui/button'
import { Camera, Upload, History, Settings } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string) => void
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 text-balance">Biomarker Strip Analyzer</h1>
          <p className="text-gray-600 mt-2">Fast, accurate health insights</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <Button
            size="lg"
            onClick={() => onNavigate('biomarker-selection')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-16 text-lg font-semibold"
          >
            <Camera className="w-5 h-5 mr-2" />
            Scan Strip
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate('scan-upload')}
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl h-16 text-lg font-semibold"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Image
          </Button>

          <Button
            size="lg"
            variant="ghost"
            onClick={() => onNavigate('history')}
            className="w-full text-gray-700 hover:bg-gray-100 rounded-xl h-16 text-lg font-semibold"
          >
            <History className="w-5 h-5 mr-2" />
            History
          </Button>

          <Button
            size="lg"
            variant="ghost"
            onClick={() => onNavigate('settings')}
            className="w-full text-gray-700 hover:bg-gray-100 rounded-xl h-16 text-lg font-semibold"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Button>
        </div>

        {/* Info Cards */}
        <div className="mt-12 space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-blue-100">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Quick tip:</span> Ensure good lighting and a flat surface for accurate results
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
