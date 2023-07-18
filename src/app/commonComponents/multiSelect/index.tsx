import { Flex, IconButton, Select, SelectProps, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export type LabelAndValue = { label: string; value: string };

export type MultiSelectProps = Omit<SelectProps, "onChange"> & {
  options: LabelAndValue[];
  values: string[];
  onChange: (values: string[]) => void;
};
const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  values,
  onChange,
  placeholder,
  ...rest
}) => {
  const { selectedOptions, availableOptions } = useMemo(
    () =>
      !values.length
        ? { selectedOptions: [], availableOptions: options }
        : options.reduce(
            (reducer, option) => {
              if (!values.includes(option.value)) {
                reducer.availableOptions.push(option);
                return reducer;
              } else {
                reducer.selectedOptions.push(option);
              }
              return reducer;
            },
            {
              selectedOptions: [] as LabelAndValue[],
              availableOptions: [] as LabelAndValue[],
            }
          ),
    [options, values]
  );
  const handleChange = (e) => {
    if (!values.length) {
      onChange([e.target.value]);
    } else {
      onChange([...values, e.target.value]);
    }
  };

  return (
    <>
      {values?.length ? (
        <Flex align="center" flexWrap={"wrap"}>
          {selectedOptions.map((option, index) => (
            <Flex boxShadow={"sm"} borderWidth="1px" m="4px" key={option.value}>
              <Text>{option.label}</Text>
              <IconButton
                alignSelf={"center"}
                boxSize={"12px"}
                p="0px"
                m="0px"
                mb="0px"
                aria-label="remove-item"
                _hover={{ color: "blue.500" }}
                style={{ backgroundColor: "inherit" }}
                icon={<AiOutlineCloseCircle />}
                onClick={() => {
                  const copyValues = values?.length ? [...values] : [];
                  delete copyValues[index];
                  onChange(values?.filter((id) => id !== option.value) ?? []);
                }}
              >
                X
              </IconButton>
            </Flex>
          ))}
        </Flex>
      ) : null}
      <Select onChange={handleChange} {...rest}>
        <option hidden value="">
          {placeholder}
        </option>
        {availableOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </>
  );
};

export default MultiSelect;
