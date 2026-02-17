import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface SettingsScreenProps {
  onNavigate: (screen: string) => void
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => onNavigate('home')} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Preferences */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Preferences</h2>
            <div className="space-y-3">
              <label className="flex items-center p-4 bg-white rounded-xl border border-blue-100 cursor-pointer hover:bg-blue-50">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="ml-3 text-gray-700">Enable notifications</span>
              </label>
              <label className="flex items-center p-4 bg-white rounded-xl border border-blue-100 cursor-pointer hover:bg-blue-50">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="ml-3 text-gray-700">Dark mode</span>
              </label>
            </div>
          </div>

          {/* Units */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Units</h2>
            <div className="space-y-2 bg-white rounded-xl border border-blue-100 p-4">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="units" defaultChecked className="w-4 h-4" />
                <span className="ml-3 text-gray-700">Metric (mmol/L)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="units" className="w-4 h-4" />
                <span className="ml-3 text-gray-700">US (mg/dL)</span>
              </label>
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">About</h2>
            <div className="bg-white rounded-xl border border-blue-100 p-4">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">App Version:</span> 1.0.0
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Build:</span> 2025.11.19
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-8">
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 rounded-xl h-12 text-lg font-semibold"
          >
            Clear History
          </Button>

          <Button
            onClick={() => onNavigate('home')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-lg font-semibold"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
