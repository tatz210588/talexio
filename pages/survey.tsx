import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import Dynamo from "../components/dynamo";
import { client } from "../lib/sanityClient";

const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b from-orange-600 to-yellow-100 via-yellow-400 before:bg-cover before:bg-center before:bg-fixed before:opacity-100 before:blur`,
  contentWrapper: `flex relative flex-wrap items-center justify-center`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.2 flex-wrap`,
  details: ``,
  searchBar: `flex flex-1 w-full border-black items-center bg-[#faf9f7] rounded-[0.8rem] mt-2`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-4 text-[#000000] placeholder:text-[#5e5d5b] placeholder:text-sm`,
  button: `font-bold w-full mt-4 bg-[#43058f] text-white text-lg rounded-xl p-3  shadow-lg hover:bg-[#6f41b7] cursor-pointer`,
  glowDivBoxWal: `mt-6 mb-9 relative group w-full lg:w-[65%] ml-4 rounded-2xl justify-center items-center`,
};

const options = [
  { value: 0, label: "---Select Gender---" },
  { value: 1, label: "Male" },
  { value: 2, label: "Female" },
  { value: 3, label: "Others" },
];

const Licence = [
  { value: 0, label: "---Select---" },
  { value: 1, label: "Yes" },
  { value: 2, label: "No, I prefer using other transport" },
];

const firstCar = [
  { value: 0, label: "---Select---" },
  { value: 1, label: "Yes" },
  { value: 2, label: "No" },
];

const dTrain = [
  { value: 0, label: "---Select---" },
  { value: 1, label: "FWD" },
  { value: 2, label: "RWD" },
  { value: 3, label: "I don't know" },
];

const fEmmission = [
  { value: 0, label: "---Select---" },
  { value: 1, label: "Yes" },
  { value: 2, label: "No" },
];

const Survey = () => {
  const [gender, setGender] = useState(null);
  const [license, setLicense] = useState(null);
  const [isfirstCar, setIsFirstCar] = useState(null);
  const [driveTrain, setDriveTrain] = useState(null);
  const [fuelEmmission, setFuelEmmision] = useState(null);
  const [formInput, updateFormInput] = useState({
    age: 0,
    cars: 0,
  });
  const [arr, setArr] = useState([]);
  var cars = [];

  useEffect(() => {
    setArr(
      Array.apply(null, {
        length: formInput?.cars,
      }).map(Number.call, Number)
    );
  }, [formInput.cars]);

  const onSubmit = async () => {
    const surveyDoc = {
      _type: "survey",
      _id: 1,
      age: formInput?.age,
      gender: gender?.label,
      license: license?.label,
      isFirstCar: isfirstCar?.label,
      driveTrain: driveTrain?.label,
      fuelEmission: fuelEmmission?.label,
      noOfCars: formInput?.cars,
      cars: cars,
    };
    try {
      const result = await client.create(surveyDoc);
      isfirstCar?.label === "Yes"
        ? toast.success(
            "We are targeting more experienced clients, thank you for your interest !"
          )
        : toast.success(
            "Survey Completed !! Thank you for showing your interest !!"
          );
    } catch (e) {
      toast.error(`Data could not be saved due to ${e}`);
    }
  };

  const saveCar = (car: any) => {
    cars.push(car);
  };

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.contentWrapper}>
            <div className={style.glowDivBoxWal}>
              <div className="relative h-full w-[95%] rounded-lg bg-gradient-to-b from-purple-300 to-blue-200 px-7 py-9 align-middle leading-none lg:w-[50%]">
                <div className={style.details}>
                  <span className="flex flex-wrap justify-center space-x-5">
                    <span className="pr-6 text-xl font-bold text-black lg:text-3xl">
                      Survey Form
                    </span>
                  </span>
                  <span className="flex flex-wrap items-center justify-center space-x-5">
                    <span className="mt-4 mb-3 justify-center text-center font-sans text-base not-italic leading-5 text-[#111111]">
                      Please provide the following information to help us know
                      you better
                    </span>
                  </span>
                </div>
                <div className="font-bold drop-shadow-xl">
                  <div className={style.info}>
                    <div className={style.infoLeft}>
                      <div className="mt-4 text-sm font-normal text-[#000000]">
                        What is your age?
                      </div>
                    </div>
                  </div>
                  <div className={style.searchBar}>
                    <input
                      type="number"
                      className={style.searchInput}
                      placeholder="e.g: 34"
                      onChange={(e) =>
                        updateFormInput((formInput) => ({
                          ...formInput,
                          age: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className={style.info}>
                    <div className={style.infoLeft}>
                      <div className="mt-4 mb-2 text-sm font-normal text-[#000000]">
                        Gender:
                      </div>
                    </div>
                  </div>
                  <Select
                    className="rounded-xl"
                    defaultValue={gender}
                    onChange={setGender}
                    options={options}
                  />
                  {Number(formInput.age) >= 18 && (
                    <>
                      <div className={style.info}>
                        <div className={style.infoLeft}>
                          <div className="mt-4 mb-2 text-sm font-normal text-[#000000]">
                            Do you own a car driver's license?:
                          </div>
                        </div>
                      </div>
                      <Select
                        className="rounded-xl"
                        defaultValue={license}
                        onChange={setLicense}
                        options={Licence}
                      />
                      {license?.value === 1 && (
                        <>
                          {Number(formInput.age) <= 25 && (
                            <>
                              <div className={style.info}>
                                <div className={style.infoLeft}>
                                  <div className="mt-4 mb-2 text-sm font-normal text-[#000000]">
                                    Is this your first car?:
                                  </div>
                                </div>
                              </div>
                              <Select
                                className="rounded-xl"
                                defaultValue={isfirstCar}
                                onChange={setIsFirstCar}
                                options={firstCar}
                              />
                            </>
                          )}
                          {isfirstCar?.value != 1 && (
                            <>
                              <div className={style.info}>
                                <div className={style.infoLeft}>
                                  <div className="mt-4 mb-2 text-sm font-normal text-[#000000]">
                                    Which drive train do you prefer?
                                  </div>
                                </div>
                              </div>
                              <Select
                                className="rounded-xl"
                                defaultValue={driveTrain}
                                onChange={setDriveTrain}
                                options={dTrain}
                              />

                              <div className={style.info}>
                                <div className={style.infoLeft}>
                                  <div className="mt-4 mb-2 text-sm font-normal text-[#000000]">
                                    Are you worried about fuel emissions?
                                  </div>
                                </div>
                              </div>
                              <Select
                                className="rounded-xl"
                                defaultValue={fuelEmmission}
                                onChange={setFuelEmmision}
                                options={fEmmission}
                              />

                              <div className={style.info}>
                                <div className={style.infoLeft}>
                                  <div className="mt-4 text-sm font-normal text-[#000000]">
                                    How many cars do you have in your family?
                                  </div>
                                </div>
                              </div>
                              <div className={style.searchBar}>
                                <input
                                  type="number"
                                  className={style.searchInput}
                                  placeholder="e.g: 2"
                                  onChange={(e) => {
                                    setArr(
                                      Array.apply(null, {
                                        length: e.target.value,
                                      }).map(Number.call, Number)
                                    );

                                    updateFormInput((formInput) => ({
                                      ...formInput,
                                      cars: Number(e.target.value),
                                    }));
                                  }}
                                />
                              </div>
                              {Number(formInput.cars) > 0 && (
                                <>
                                  <div className={style.info}>
                                    <div className={style.infoLeft}>
                                      <div className="mt-4 text-sm font-normal text-[#000000]">
                                        Enter Model/Make of your cars?
                                      </div>
                                    </div>
                                  </div>
                                  {arr.length != 0 && (
                                    <Dynamo
                                      value={formInput.cars}
                                      saveCar={(car: any) => saveCar(car)}
                                    />
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}

                  <button
                    type="submit"
                    className={style.button}
                    onClick={() => onSubmit()}
                  >
                    Submit Survey
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
