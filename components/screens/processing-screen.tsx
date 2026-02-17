export default function ProcessingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm text-center">
        {/* Loading Animation */}
        <div className="mb-8">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-blue-50 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Strip</h1>
        <p className="text-gray-600 mb-8">Extracting biomarker color intensities...</p>

        {/* Progress Steps */}
        <div className="space-y-3">
          {[
            { label: 'Detecting colors', active: true },
            { label: 'Calculating values', active: false },
            { label: 'Generating report', active: false }
          ].map((step, i) => (
            <div key={i} className="flex items-center px-4 py-3 rounded-lg bg-blue-50">
              <div className={`w-2 h-2 rounded-full mr-3 ${step.active ? 'bg-blue-600 animate-pulse' : 'bg-gray-300'}`}></div>
              <p className={`text-sm ${step.active ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
