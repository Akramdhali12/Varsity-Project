import { Fieldset, MultiSelect, TextInput } from "@mantine/core";
import React from "react";
import { symptoms, tests } from "../../../Data/DropDownData";

const ApReport = () => {
  return (
    <div>
      <Fieldset className="grid gap-4 grid-cols-2" legend={<sapn className="text-xl" style={{ color: '#32b9a9' }}>Personal information</sapn>} radius="md">
        <MultiSelect className="col-span-2" withAsterisk
          label="Symptoms"
          placeholder="Pick symptoms"
          data={symptoms}
        />
        <MultiSelect className="col-span-2" withAsterisk
          label="Tests"
          placeholder="Pick tests"
          data={tests}
        />
        <TextInput label="Diagnosis" placeholder="Enter diagnosis" withAsterisk/>
        <TextInput label="Referral" placeholder="Enter referral details" withAsterisk/>

        <TextInput className="col-span-2" label="Notes" placeholder="Enter any additional notes" withAsterisk/>
      </Fieldset>
    </div>
  );
};

export default ApReport;
