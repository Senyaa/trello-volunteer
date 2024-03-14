"use client";

import React from "react";
import { updateSettings } from "@/actions/updateSettings";
import SaveSettingsButton from "@/app/components/SaveSettingsButton";
import Toggle from "@/app/components/ui/Toggle";
import { FormEventHandler, useState } from "react";
import { selectShiftId, useDispatch, userSlice } from "@/lib/redux";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import { useSelector } from "react-redux";

export type SettingsFormType = {
  testsEnabled: boolean;
  medsEnabled: boolean;
  statusEnabled: boolean;
  personalityEnabled: boolean;
  castrationEnabled: boolean;
  dogInteractionEnabled: boolean;
  catInteractionEnabled: boolean;
  childrenInteractionEnabled: boolean;
  dewormingEnabled: boolean;
  healthEnabled: boolean;
  storyEnabled: boolean;
  infoForCarerEnabled: boolean;
  userId?: string;
};

export const initialSettingsForm = {
  testsEnabled: false,
  medsEnabled: false,
  statusEnabled: false,
  personalityEnabled: false,
  castrationEnabled: false,
  dogInteractionEnabled: false,
  catInteractionEnabled: false,
  childrenInteractionEnabled: false,
  dewormingEnabled: false,
  healthEnabled: false,
  storyEnabled: false,
  infoForCarerEnabled: false,
};

export const SettingsForm: React.FC<{ initialValues: SettingsFormType }> = ({
  initialValues,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const shiftId = useSelector(selectShiftId);

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
          label="🩸 Testy (tylko koty)"
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
        <Toggle
          name="dogInteractionEnabled"
          label="🐶 Stosunek do kotów"
          checked={state.dogInteractionEnabled}
          onChange={handleStateChange("dogInteractionEnabled")}
        />
        <Toggle
          name="catInteractionEnabled"
          label="🐱 Stosunek do kotów"
          checked={state.catInteractionEnabled}
          onChange={handleStateChange("catInteractionEnabled")}
        />
        <Toggle
          name="childrenInteractionEnabled"
          label="👶🏻 Stosunek do dzieci"
          checked={state.childrenInteractionEnabled}
          onChange={handleStateChange("childrenInteractionEnabled")}
        />
        <Toggle
          name="dewormingEnabled"
          label="🐛 Odrobaczanie"
          checked={state.dewormingEnabled}
          onChange={handleStateChange("dewormingEnabled")}
        />
        <Toggle
          name="healthEnabled"
          label="👨🏻‍⚕️ Leczenie"
          checked={state.healthEnabled}
          onChange={handleStateChange("healthEnabled")}
        />
        <Toggle
          name="storyEnabled"
          label="👩🏼‍🏫 Historia"
          checked={state.storyEnabled}
          onChange={handleStateChange("storyEnabled")}
        />
        <Toggle
          name="infoForCarerEnabled"
          label="Info dla właścicieli/opiekunów (tylko koty)"
          checked={state.infoForCarerEnabled}
          onChange={handleStateChange("infoForCarerEnabled")}
        />
      </section>
      <div className={`flex flex-col gap-2 ${shiftId ? "mb-8" : ""}`}>
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
