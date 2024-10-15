"use client"
import { Searcher } from "@/components/Searcher";
import { TiSelect } from "@/components/Select";
import { ResultCard } from "@/components/ResultCard";
import Image from "next/image";
import Background from "@/assets/bg.png";
import { Trash2 } from "react-feather";
import Logo from "@/assets/ShaioLogo.png";
import { useDiagnosis } from "@/core/hooks/useDiagnosis";
import { useDiagnosisStore } from "@/store/Diagnosis.store";
import { ArrowUp } from "react-feather";

export default function Home() {
  const systemsOptions = useDiagnosisStore(state => state.systemsOptions);
  const servicesOptions = useDiagnosisStore(state => state.servicesOptions);

  const { filteredDiagnosis, setSelectedService, setSelectedSystem, handleResetFilters, selectedSystem, selectedService } = useDiagnosis();

  return (
    <main className={"w-full h-full min-h-screen grid grid-cols-12 pt-12 pb-24"}>
      <div style={{ zIndex: 2 }} className={"col-start-2 col-span-10 lg:col-start-4 lg:col-span-6 w-full"}>
        <div className={'w-full flex justify-center flex-col items-center'}>
          <Image src={Logo as any} className={"max-w-[100px] mb-12"} style={{ mixBlendMode: "multiply" }} alt={"Logo"}/>

          <Searcher/>

          <aside className={"w-full flex flex-wrap items-end flex-row gap-4 my-10"}>
            <TiSelect
              value={selectedSystem}
              onChange={setSelectedSystem}
              label={"Sistema"}
              options={systemsOptions}
              placeholder={"Seleccionar"}
            />
            <TiSelect
              value={selectedService}
              onChange={setSelectedService}
              label={"Servicio"}
              options={servicesOptions}
              placeholder={"Seleccionar"}
            />

            {(selectedSystem || selectedService) &&
              <button
                onClick={handleResetFilters}
                className={"btn btn-primary rounded-full flex-1 md:max-w-[200px] min-w-[180px] border-none bg-red-500 hover:bg-red-300 text-white"}
              >
                <Trash2 size={16}/>
                Limpiar filtros
              </button>
            }
          </aside>
        </div>

        <div className={"w-full flex flex-col gap-4 pt-12"}>
          <p className={"text-gray-500 text-md"}>{filteredDiagnosis.length} Diagnósticos</p>

          {filteredDiagnosis && !!filteredDiagnosis.length && filteredDiagnosis.map((item, index) => (
            <ResultCard
              code={item.code}
              service={item.service.name}
              system={item.system.name}
              name={item.name}
              definition={item.definition}
              key={index}
            />
          ))}

          {!filteredDiagnosis.length &&
            <p className={"text-gray-500 text-md text-center"}>No se encontraron resultados.</p>
          }
        </div>

        <div className={"text-gray-500 flex flex-col gap-2 text-center w-full pt-24"}>
          <p>Shaio Nurse 2024</p>
          <p>Desarrollado por <a href={"https://www.imterra.site/"} target={"_blank"} className={"text-red-500"}>Angel Lopez</a></p>
        </div>
      </div>

      {window && !!window.scrollY &&
        <button
          className={"btn fixed bg-red-500 border-none cursor-pointer text-white bottom-12 z-30 rounded-full right-12"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={24}/>
        </button>
      }

      <Image
        src={Background as any}
        style={{ width: "100%", position: "fixed", bottom: 0, mixBlendMode: "multiply", opacity: 0.05, zIndex: 1 }}
        alt={"Background layer"}
      />
    </main>
  );
}
