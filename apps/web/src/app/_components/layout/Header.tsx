import { Bell, MessageCircle } from "lucide-react"

export function Header(){

  return(

    <div className="flex justify-between items-center py-6">

      <div>
        <h1 className="text-2xl font-bold">
          Your Benefits Overview
        </h1>

        <p className="text-gray-500">
          Comprehensive management and tracking of your corporate advantages.
        </p>
      </div>

      <div className="flex items-center gap-6">

        <Bell size={20}/>
        <MessageCircle size={20}/>

        <div className="flex items-center gap-2">

          <img
            src="/Avatar.png"
            className="w-8 h-8 rounded-full"
          />

          <div>
            <p className="text-sm font-semibold">
              Alex Rivera
            </p>
            <p className="text-xs text-gray-500">
              Senior Engineer
            </p>
          </div>

        </div>

      </div>

    </div>

  )
}