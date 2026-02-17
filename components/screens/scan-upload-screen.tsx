import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, Upload, ArrowLeft } from 'lucide-react'

interface ScanUploadScreenProps {
  onNavigate: (screen: string) => void
  onProcess: () => void
}

export default function ScanUploadScreen({ onNavigate, onProcess }: ScanUploadScreenProps) {
  const [uploadedImage, setUploadedImage] = useState<boolean>(false)

  const handleImageUpload = () => {
    setUploadedImage(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => onNavigate('biomarker-selection')} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Capture Strip</h1>
          <p className="text-gray-600 mt-2">Place strip on flat surface with good lighting</p>
        </div>

        {/* Camera Frame */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl aspect-square flex flex-col items-center justify-center mb-6 border-2 border-blue-200">
          <Camera className="w-16 h-16 text-blue-400 mb-3" />
          <p className="text-gray-600 text-center">Camera preview will appear here</p>
        </div>

        {/* Upload Status */}
        {uploadedImage && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-700 font-semibold">Image ready for analysis ✓</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            onClick={handleImageUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-lg font-semibold flex items-center justify-center"
          >
            <Camera className="w-5 h-5 mr-2" />
            Take Photo
          </Button>

          <Button
            onClick={handleImageUpload}
            variant="outline"
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl h-12 text-lg font-semibold"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload from Gallery
          </Button>
        </div>

        {/* Process Button */}
        {uploadedImage && (
          <Button
            onClick={onProcess}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 text-lg font-semibold"
          >
            Analyze Strip
          </Button>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">📸 Tips for best results:</span>
            <br />
            • Use natural or bright lighting
            <br />
            • Keep strip flat and centered
            <br />
            • Avoid shadows and glare
          </p>
        </div>
      </div>
    </div>
  )
}
