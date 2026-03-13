"use client"

import { Bell, MessageSquare } from "lucide-react"

type HeaderProps = {
  isLoading?: boolean
}

export function Header({ isLoading = false }: HeaderProps) {

  if (isLoading) {
    return (
      <div className="flex items-center justify-between mb-6 animate-pulse">

        {/* Left */}
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-96 bg-gray-200 rounded mt-2" />
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">

          <div className="w-5 h-5 bg-gray-200 rounded" />
          <div className="w-5 h-5 bg-gray-200 rounded" />

          <div className="flex items-center gap-3 border-l pl-6">

            <div className="text-right space-y-1">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>

            <div className="w-9 h-9 rounded-full bg-gray-200" />

          </div>

        </div>

      </div>
    )
  }

  return (
    <div className="flex items-center justify-between mb-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Your Benefits Overview
        </h1>

        <p className="text-gray-500 mt-1">
          Comprehensive management and tracking of your corporate advantages.
        </p>
      </div>

      <div className="flex items-center gap-6">

        <Bell className="w-5 h-5 text-gray-500" />
        <MessageSquare className="w-5 h-5 text-gray-500" />

        <div className="flex items-center gap-3 border-l pl-6">

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              Alex Rivera
            </p>
            <p className="text-xs text-gray-500">
              Senior Engineer
            </p>
          </div>

          <img
            src="/avatar.png"
            className="w-9 h-9 rounded-full"
            alt="avatar"
          />

        </div>

      </div>

    </div>
  )
}