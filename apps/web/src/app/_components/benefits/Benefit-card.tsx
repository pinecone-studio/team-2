import { StatusBadge } from "../ui/Status-badge"


type Props = {
  title:string
  vendor:string
  subsidy:number
  status:string
}

export  function BenefitCard({
  title,
  vendor,
  subsidy,
  status
}:Props){

  return(

    <div className="border rounded-xl p-5 shadow-sm">

      <div className="flex justify-between mb-3">
        <div className="bg-blue-100 p-2 rounded">
          <img src="icon.png" alt="" />
        </div>

        <StatusBadge status={status}/>
      </div>

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mb-4">
        50% subsidy for PineFit gym membership with access to all locations
      </p>

      <div className="text-sm flex justify-between mb-1">
        <span className="text-gray-500">Subsidy</span>
        <span>{subsidy}%</span>
      </div>

      <div className="text-sm flex justify-between mb-4">
        <span className="text-gray-500">Vendor</span>
        <span>{vendor}</span>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
        View Details
      </button>

    </div>

  )
}