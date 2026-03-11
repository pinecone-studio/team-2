import { BenefitCard } from "./Benefit-card"


export  function BenefitsGrid(){

  const benefits = new Array(8).fill({
    title:"Gym Membership",
    vendor:"PineFit",
    subsidy:50,
    status:"Active"
  })

  return(

    <div className="grid grid-cols-4 gap-6 mt-6">

      {benefits.map((b,i)=>(
        <BenefitCard
          key={i}
          {...b}
        />
      ))}

    </div>

  )
}