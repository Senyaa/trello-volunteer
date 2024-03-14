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
import { getDetailsHeaders } from "@/app/helpers/details";

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
  bedEnabled: boolean;
  walkEnabled: boolean;
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
  bedEnabled: false,
  walkEnabled: false,
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
        {getDetailsHeaders(initialSettingsForm).map((setting) => {
          const toggleName =
            `${setting.name}Enabled` as keyof SettingsFormType;
          return (
            <Toggle
              key={toggleName}
              name={toggleName}
              label={`${setting.icon || ""} ${setting.plName}`}
              checked={Boolean(state[toggleName])}
              onChange={handleStateChange(toggleName)}
            />
          );
        })}
      </section>
      <div className={`flex flex-col gap-2 ${shiftId ? "mb-8" : ""}`}>
        {formStatus === "ERROR" && (
          <span className="text-red dark:text-red-200">
            Wystąpił błąd, spróbuj później
          </span>
        )}
        <SaveSettingsButton formStatus={formStatus}/>
        <BackButton />
      </div>
    </form>
  );
};
