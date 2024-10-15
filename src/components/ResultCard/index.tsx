import { useDiagnosisStore } from "@/store/Diagnosis.store";
import { ArrowRightCircle, File, PlusSquare } from "react-feather";
import "./styles.css";
import useModal from "@/core/hooks/useModal";

const highlightQuery = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
  );
};

interface Props {
  code: string;
  definition: string;
  name: string;
  system: string;
  service: string;
}

export const ResultCard = ({ code, definition, name, service, system }: Props) => {
  const query = useDiagnosisStore(state => state.query);
  const { showModal } = useModal();

  const handleClick = () => {
    showModal({
      title: name,
      render: (
        <div className={"w-full flex flex-col gap-4 p-lg-12"}>
          <div className={"flex flex-col gap-1 items-start"}>
            <p className={"text-lg text-gray-400 font-bold m-0 p-0"}>#{code}</p>
            <h1 className={"text-xl font-bold text-red-500 m-0 p-0"}>{name}</h1>
          </div>

          <div>
            <p className={"text-md text-black"}>{definition}</p>
          </div>

          <div className={"flex flex-col gap-2"}>
            <div className={'flex justify-start'}>
              <p className={"text-md text-gray-500 flex gap-2 items-center py-2 px-4 border-2 border-gray-300 rounded-2xl"}>
                <File color={"gray"} size={16}/>
                {system}
              </p>
            </div>

            <div className={'flex justify-start'}>
              <p className={"text-md text-gray-500 flex gap-2 items-center py-2 px-4 border-2 border-gray-300 rounded-2xl"}>
                <PlusSquare color={"gray"} size={16}/>
                {service}
              </p>
            </div>
          </div>
        </div>
      )
    });
  }

  return (
    <div
      onClick={handleClick}
      className={"w-full hover:scale-105 min-h-[200px] cardContainer border-2 border-red-50 transition cursor-pointer bg-white hover:shadow-lg rounded-2xl flex flex-col items-center justify-center"}>
      <div className={"w-full flex flex-col gap-4 lg:py-0 p-8"}>
        <div className={"flex flex-col lg:flex-row gap-2 items-start lg:items-center"}>
          <p className={"text-lg text-gray-400 font-bold m-0 p-0 block lg:hidden"}>#{highlightQuery(code, query)}</p>
          <h1 className={"text-xl font-bold text-red-500 m-0 p-0"}>{highlightQuery(name, query)}</h1>
          <p className={"text-lg text-gray-400 font-bold m-0 p-0 hidden lg:block"}>#{highlightQuery(code, query)}</p>
        </div>

        <div className={"pe-32"}>
          <p className={"text-md text-black truncate"}>{highlightQuery(definition, query)}</p>
        </div>

        <div className={"flex flex-col lg:flex-row gap-2"}>
          <p className={"text-md text-gray-500 flex gap-2 items-center py-2 px-4 border-2 border-gray-300 rounded-2xl"}>
            <File color={"gray"} size={16}/>
            {system}
          </p>

          <p className={"text-md text-gray-500 flex gap-2 items-center py-2 px-4 border-2 border-gray-300 rounded-2xl"}>
            <PlusSquare color={"gray"} size={16}/>
            {service}
          </p>
        </div>
      </div>

      <button
        onClick={handleClick}
        style={{ zIndex: 3, position: "absolute", right: 20 }}
        className={"cardBtns bg-red-700 h-[80%] rounded-full flex items-center justify-center p-4"}
      >
        <ArrowRightCircle color={"white"} size={24}/>
      </button>
    </div>
  )
}
