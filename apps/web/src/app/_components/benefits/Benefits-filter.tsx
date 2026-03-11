export  function BenefitsFilter(){

  const filters = [
    "All",
    "Active",
    "Eligible",
    "Pending",
    "Locked"
  ]

  return(

    <div className="flex gap-3 mt-6">

      {filters.map((f)=>(
        <button
          key={f}
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white"
        >
          {f}
        </button>
      ))}

    </div>

  )
}