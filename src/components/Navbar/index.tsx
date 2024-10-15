export const Navbar = () => {
  return (
    <div className={"w-full bg-transparent px-24 py-12 flex flex-col lg:flex-row items-center justify-between"}>
      <h1 className={"text-3xl font-bold text-red-400 text-center font-cinzel"}>Shaio Nurse</h1>
      <div className={"flex text-gray-700 gap-12 mt-6 lg:mt-0"}>
        <p className={"hover:opacity-45 transition cursor-pointer"}>Inicio</p>
        <p className={"hover:opacity-45 transition cursor-pointer"}>Nosotros</p>
      </div>
    </div>
  )
}
