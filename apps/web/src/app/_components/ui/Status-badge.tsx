type Props = {
  status:string
}

export  function StatusBadge({status}:Props){

  const color = {
    Active:"bg-green-100 text-green-700",
    Eligible:"bg-blue-100 text-blue-700",
    Pending:"bg-yellow-100 text-yellow-700",
    Locked:"bg-red-100 text-red-700"
  }[status]

  return(

    <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
      {status}
    </span>

  )
}