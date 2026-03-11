import { BenefitsFilter } from "./_components/benefits/Benefits-filter";
import { BenefitsGrid } from "./_components/benefits/Benefits-grid";
import { BenefitsStats } from "./_components/benefits/Benefits-stats";
import { Header } from "./_components/layout/Header";
import { Sidebar } from "./_components/layout/SideBar";

export default function Page(){

  return(

    <div className="flex">

      <Sidebar/>

      <main className="flex-1 p-8">

        <Header/>

        <BenefitsStats/>

        <BenefitsFilter/>

        <BenefitsGrid/>

      </main>

    </div>

  )
}