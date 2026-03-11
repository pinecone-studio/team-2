import { Home, Gift, FileText, Settings } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 h-screen border-r bg-white p-4">

      <div className="flex items-center gap-2 mb-8">
        <div className="bg-blue-500 p-2 rounded-lg text-white">
          🎁
        </div>
        <div>
          <p className="font-semibold">Employee Benefits</p>
          <p className="text-xs text-gray-500">Engineering</p>
        </div>
      </div>

      <nav className="space-y-2">

        <a className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded">
          <Home size={18}/>
          Dashboard
        </a>

        <a className="flex items-center gap-3 p-2 bg-blue-50 text-blue-600 rounded">
          <Gift size={18}/>
          My Benefits
        </a>

        <a className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded">
          <FileText size={18}/>
          Requests
        </a>

        <a className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded">
          <FileText size={18}/>
          Contracts
        </a>

        <a className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded">
          <Settings size={18}/>
          Settings
        </a>

      </nav>

    </div>
  )
}