import { useFirebase } from "@/core/hooks/useFirebase";
import { useDiagnosisStore } from "@/store/Diagnosis.store";
import { useEffect, useMemo, useState } from "react";

export const useDiagnosis = () => {
  const db = useFirebase({ collectionPath: "diagnosis" });

  const [selectedSystem, setSelectedSystem] = useState();
  const [selectedService, setSelectedService] = useState();

  const setDiagnosis = useDiagnosisStore(state => state.setDiagnosis);
  const query = useDiagnosisStore(state => state.query);
  const diagnosis = useDiagnosisStore(state => state.diagnosis);
  const servicesOptions = useDiagnosisStore(state => state.servicesOptions);
  const setServicesOptions = useDiagnosisStore(state => state.setServicesOptions);
  const systemsOptions = useDiagnosisStore(state => state.systemsOptions);
  const setSystemsOptions = useDiagnosisStore(state => state.setSystemsOptions);

  const getSystems = async () => {
    const data = await db.collectionWithIds([], "systems");
    setSystemsOptions(
      data.map((item) => ({
        label: item.name,
        value: item.id,
        }
      ))
    )
  }

  const getServices = async () => {
    const data = await db.collectionWithIds([], "services");
    setServicesOptions(
      data.map((item) => ({
        label: item.name,
        value: item.id,
        }
      ))
    )
  }

  const populateDiagnosis = async (data: any) => {
    const populatedDiagnosis = await db.populate(data, ['system', 'service']);
    setDiagnosis(populatedDiagnosis);
  }

  const handleResetFilters = () => {
    setSelectedService(null);
    setSelectedSystem(null);
  }

  const filteredDiagnosis = useMemo(() => {
    return diagnosis
      .filter((item) => !selectedSystem || item.system.id == selectedSystem.value)
      .filter((item) => !selectedService || item.service.id == selectedService.value)
      .filter((item) => !query || item.name.toLowerCase().includes(query.toLowerCase())
        || item.definition.toLowerCase().includes(query.toLowerCase())
        || item.code.toLowerCase().includes(query.toLowerCase())
      )
  }, [diagnosis, query, selectedSystem, selectedService]);

  useEffect(() => {
    if (systemsOptions && systemsOptions.length && servicesOptions && servicesOptions.length) return
    getSystems();
    getServices();
  }, [systemsOptions, servicesOptions]);

  useEffect(() => {
    if (db.docs && db.docs.length) {
      populateDiagnosis(db.docs);
    }
  }, [db.docs]);

  useEffect(() => {
    db.listenCollection([]);
  }, []);

  return {
    filteredDiagnosis,
    setSelectedService,
    setSelectedSystem,
    selectedService,
    selectedSystem,
    handleResetFilters
  }
}
