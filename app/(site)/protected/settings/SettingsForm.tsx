"use client";

import React from "react";
import { updateSettings } from "@/actions/updateSettings";
import SaveSettingsButton from "@/app/components/SaveSettingsButton";
import Toggle from "@/app/components/ui/Toggle";
import { FormEventHandler, useState } from "react";
import { useDispatch, userSlice } from "@/lib/redux";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

export type SettingsFormType = {
  testsEnabled: boolean;
  medsEnabled: boolean;
  statusEnabled: boolean;
  personalityEnabled: boolean;
  castrationEnabled: boolean;
  userId?: string;
};

export const initialSettingsForm = {
  testsEnabled: false,
  medsEnabled: false,
  statusEnabled: false,
  personalityEnabled: false,
  castrationEnabled: false,
};

export const SettingsForm: React.FC<{ initialValues: SettingsFormType }> = ({
  initialValues,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [state, setState] = useState<SettingsFormType>(initialValues);
  const [formStatus, setFormStatus] = useState<
    "LOADING" | "SAVED" | "INITIAL" | "ERROR"
  >("INITIAL");

  const handleStateChange =
    (field: keyof SettingsFormType) => (value: boolean) => {
      setState((v) => ({ ...v, [field]: value }));
      setFormStatus("INITIAL");
    };

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFormStatus("LOADING");
    try {
      await updateSettings(state);
      dispatch(userSlice.actions.changeSettings(state));
      setFormStatus("SAVED");
      router.back();
    } catch (e) {
      console.log(e);
      setFormStatus("ERROR");
    }
    setFormStatus("INITIAL");
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex grow flex-col justify-between"
    >
      <section className="flex flex-col gap-2">
        <h2>Widoczne pola</h2>
        <Toggle
          name="medsEnabled"
          label="💊 Leki"
          checked={state.medsEnabled}
          onChange={handleStateChange("medsEnabled")}
        />
        <Toggle
          name="testsEnabled"
          label="🩸 Testy"
          checked={state.testsEnabled}
          onChange={handleStateChange("testsEnabled")}
        />
        <Toggle
          name="statusEnabled"
          label="🏠 Status"
          checked={state.statusEnabled}
          onChange={handleStateChange("statusEnabled")}
        />
        <Toggle
          name="personalityEnabled"
          label="😈 Charakter"
          checked={state.personalityEnabled}
          onChange={handleStateChange("personalityEnabled")}
        />
        <Toggle
          name="castrationEnabled"
          label="✂️ Kastracja"
          checked={state.castrationEnabled}
          onChange={handleStateChange("castrationEnabled")}
        />
      </section>
      <div className="flex flex-col gap-2">
        {formStatus === "ERROR" && (
          <span className="text-red dark:text-red-200">
            Wystąpił błąd, spróbuj później
          </span>
        )}
        <SaveSettingsButton formStatus={formStatus} />
        <BackButton />
      </div>
    </form>
  );
};
