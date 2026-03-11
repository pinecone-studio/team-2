"use client"

import{

  BadgeCheck,
  Lock,
  Clock,
  ShieldCheck
} from "lucide-react"
import type { ComponentType, SVGProps } from "react"

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>

type Stat = {
  title: string
  value: number
  icon: IconType  
  border: string
}

export function BenefitsStats() {

  const stats: Stat[] = [
    {
      title: "Active Benefits",
      value: 8,
      icon: ShieldCheck,
      border: "border-green-500"
    },
    {
      title: "Eligible",
      value: 8,
      icon: BadgeCheck,
      border: "border-blue-500"
    },
    {
      title: "Locked",
      value: 8,
      icon: Lock,
      border: "border-gray-400"
    },
    {
      title: "Pending",
      value: 8,
      icon: Clock,
      border: "border-orange-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <div 
          key={stat.title}
          className={'bg-white border-l-4 $(stat.border) border rounded-lg px-4 py-3 shadow-sm flex justify-between items-start'}
          >

            <div >
              <div className="bg-blue-50 w-8 h-8 flex items-center justify-center rounded-md mb-2">
                <Icon size={16} className="text-blue-600"/>
              </div>
              <p className="text-xs text-gray-500">
                {stat.title}
              </p>

              {/* Value */}
              <p className="text-xl font-semibold mt-0.5">
                {stat.value}
              </p>

            </div>
             <div className="bg-green-100 text-green-700 text-[10px] px-2 py-[2px] rounded-full">
              +2%
            </div>
            </div>
        )
      })}
    </div>
  )}