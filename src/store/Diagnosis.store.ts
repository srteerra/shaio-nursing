import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";

interface DiagnosisState {
  diagnosis: any[];
  systemsOptions: any[];
  servicesOptions: any[];
  query: string;
}

interface DiagnosisActions {
  setDiagnosis: (diagnosis: any) => void;
  setSystemsOptions: (systemsOptions: any) => void;
  setServicesOptions: (servicesOptions: any) => void;
  setQuery: (query: string) => void;
}

export const useDiagnosisStore = create(
  persist<DiagnosisState & DiagnosisActions>((set, get) => ({
    diagnosis: [],
    query: "",
    systemsOptions: [],
    servicesOptions: [],
    setQuery: (query) => {
      set({ query });
    },
    setSystemsOptions: (items) => {
      set({ systemsOptions: items });
    },
    setServicesOptions: (items) => {
      set({ servicesOptions: items });
    },
    setDiagnosis: (items) => {
      set({ diagnosis: items });
    }
  })),
  {
    name: "diagnosis-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);
