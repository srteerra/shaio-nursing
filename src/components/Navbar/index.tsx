import Logo from "@/assets/sabana.png";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className={"w-full bg-transparent px-24 py-12 flex flex-col lg:flex-row items-center justify-between"}>
      <h1 className={"text-3xl font-bold text-red-400 text-center font-cinzel"}>Shaio Nurse</h1>
      <div className={"flex text-gray-700 gap-12 lg:mt-0"}>
        <Image src={Logo as any} className={"max-w-[200px]"} style={{ mixBlendMode: "multiply" }} alt={"Logo"}/>
      </div>
    </div>
  )
}
