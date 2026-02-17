import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft } from 'lucide-react'

interface BiomarkerSelectionScreenProps {
  onNavigate: (biomarkers: string[]) => void
}

const BIOMARKERS = [
  { id: 'ph', label: 'pH Level', description: 'Measure acidity/alkalinity' },
  { id: 'glucose', label: 'Glucose', description: 'Blood sugar levels' },
  { id: 'lactate', label: 'Lactate', description: 'Muscle fatigue indicator' },
  { id: 'uricAcid', label: 'Uric Acid', description: 'Gout risk indicator' }
]

export default function BiomarkerSelectionScreen({ onNavigate }: BiomarkerSelectionScreenProps) {
  const [selected, setSelected] = useState<string[]>(['ph', 'glucose', 'lactate', 'uricAcid'])

  const toggleBiomarker = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => onNavigate([])} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Select Biomarkers</h1>
          <p className="text-gray-600 mt-2">Choose which biomarkers to analyze</p>
        </div>

        {/* Biomarker Selection */}
        <div className="space-y-3 mb-8">
          {BIOMARKERS.map(biomarker => (
            <label
              key={biomarker.id}
              className="flex items-start p-4 border-2 border-blue-100 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <Checkbox
                checked={selected.includes(biomarker.id)}
                onCheckedChange={() => toggleBiomarker(biomarker.id)}
                className="mt-1 mr-3"
              />
              <div>
                <p className="font-semibold text-gray-900">{biomarker.label}</p>
                <p className="text-sm text-gray-600">{biomarker.description}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <Button
          onClick={() => onNavigate(selected)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-lg font-semibold"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
