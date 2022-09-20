import { isCommunityResourcable } from "@ethersproject/providers";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { BMW5Regx, BMW2Regx } from "./utils";

const style = {
  searchBar: `flex flex-1 border-black items-center bg-[#faf9f7] rounded-[0.8rem]`,
  searchInput: `h-[2.6rem] border-0 bg-transparent outline-0 ring-0 px-2 pl-2 text-[#000000] placeholder:text-[#5e5d5b] placeholder:text-sm`,
};

const options = [
  { value: 0, label: "Swift" },
  { value: 1, label: "BMW" },
  { value: 2, label: "Audi" },
];

const Dynamo = (props: any) => {
  const [carMake, setCarMake] = useState(null);
  const [arr, setArr] = useState([]);
  const [formInput, updateFormInput] = useState({
    model: "",
  });

  useEffect(() => {
    setArr(
      Array.apply(null, {
        length: props.value,
      }).map(Number.call, Number)
    );
  }, []);

  const save = () => {
    var check = false;
    if (carMake.label === "BMW") {
      if (formInput.model.length === 5) {
        BMW5Regx.nonStickyTest(formInput.model)
          ? (check = true)
          : toast.error("Invalid model");
      } else if (formInput.model.length === 2) {
        BMW2Regx.nonStickyTest(formInput.model)
          ? (check = true)
          : toast.error("Invalid model");
      } else {
        toast.error("Invalid model entered");
      }
    } else {
      check = true;
    }
    check === true
      ? props.saveCar(`${carMake.label}${formInput.model}`)
      : toast.error("Invalid details entered");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {arr.map((item: any, id: any) => {
        return (
          <div className="mb-3 flex">
            <div className="mr-6 w-[100%]">
              <Select
                className="rounded-xl"
                defaultValue={carMake}
                onChange={setCarMake}
                options={options}
              />
            </div>
            <div className={style.searchBar}>
              <input
                type="text"
                className={style.searchInput}
                placeholder="Model number"
                onChange={(e) =>
                  updateFormInput((formInput) => ({
                    ...formInput,
                    model: e.target.value,
                  }))
                }
                onBlur={() => {
                  save();
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Dynamo;
