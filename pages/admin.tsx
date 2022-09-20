import React, { useEffect, useState } from "react";
import CardBarChart from "../components/CardBarChart";
import { client } from "../lib/sanityClient";

const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b from-orange-600 to-yellow-100 via-yellow-400 before:bg-cover before:bg-center before:bg-fixed before:opacity-100 before:blur`,
  contentWrapper: `flex relative flex-wrap items-center`,
};

const Admin = () => {
  var labels = [
    "Adolescents",
    "Unlicensed",
    "First-timers",
    "Targetables",
    "Fuel Emission %age",
    "FWD/Dont know driveTrain %age",
    "Cars in family(Average)",
  ];
  var labelGroup = [
    "Adolescents %",
    "Unlicensed%",
    "First-timers%",
    "Targetables%",
  ];
  var masterDataArr = [];
  var [sampleData1, setSampleData1] = useState<Array<number>>([]);
  var [labelData2, setLabelData2] = useState<Array<number>>([]);
  var [sampleData2, setSampleData2] = useState<Array<number>>([]);
  var [sampleData3, setSampleData3] = useState<Array<number>>([]);
  const [surveryParticipants, setSurveyParticipants] = useState<number>(0);
  var [adolescents, setAdolescent] = useState<number>(0);
  var [license, setLicense] = useState<number>(0);
  var [firstTime, setfirstTime] = useState<number>(0);
  var [targetables, setTargetables] = useState<number>(0);
  var [fuelEmission, setFuelEmmision] = useState<number>(0);
  var [driveTrain, setDriveTrain] = useState<number>(0);
  var [carCount, setCarCount] = useState<number>(0);

  useEffect(() => {
    getData().catch((e) => console.log(e));
    console.log("sample", sampleData1);
  }, []);

  const getData = async () => {
    masterDataArr = await client.fetch(`*[_type == "survey"]`);
    const total: number = masterDataArr.length;
    console.log("master", masterDataArr[1].cars);
    setSurveyParticipants(total);
    var car = 0;
    masterDataArr.map((e) => {
      e.age < 18 && setAdolescent(adolescents++);
      e.license != "Yes" && setLicense(license++);
      e.age >= 18 &&
        e.license === "Yes" &&
        (e.isFirstCar === "Yes"
          ? setfirstTime(firstTime++)
          : setTargetables(targetables++));

      e.fuelEmission != null &&
        e.fuelEmission === "Yes" &&
        setFuelEmmision(fuelEmission++);

      e.driveTrain != null &&
        e.driveTrain != "RWD" &&
        setDriveTrain(driveTrain++);

      car += e.noOfCars;
      setCarCount(car);

      e.cars.map((item: any, index: number) => {
        var status = "";
        console.log("item", item);
        for (let i = 0; i < labelData2.length; i++) {
          if (labelData2[i] === item) {
            sampleData2[i] += 1;
            status = "done";
          }
        }
        console.log("status", status);
        if (status === "") {
          labelData2.push(item);
          sampleData2.push(1);
        }
        console.log(labelData2);
        console.log(sampleData2);
      });
    });
    console.log("label", labelData2);
    console.log("data", sampleData2);
    setLabelData2(labelData2);
    setSampleData2(sampleData2);

    setSampleData1([
      adolescents,
      license,
      firstTime,
      targetables,
      //fuelEmission,
      //driveTrain,
      Number(((Number(fuelEmission) * 100) / Number(targetables)).toFixed(3)),
      Number(((Number(driveTrain) * 100) / Number(targetables)).toFixed(3)),
      Number(car) / total,
    ]);
    setSampleData3([
      (Number(adolescents) * 100) / total,
      (Number(license) * 100) / total,
      (Number(firstTime) * 100) / total,
      (Number(targetables) * 100) / total,
    ]);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className="flex flex-wrap">
            <div className=" mt-6 w-screen px-4 ">
              <div className="mr-3 h-screen w-full">
                {sampleData1.length > 0 && (
                  <CardBarChart
                    title="Synopsis"
                    total={surveryParticipants}
                    details={sampleData1}
                    label={labels}
                    xLabel="Params"
                    yLabel="Value"
                  />
                )}
              </div>
              <div className="ml-2 h-screen w-full">
                {sampleData1.length > 0 && (
                  <CardBarChart
                    title="Car Distribution"
                    total={surveryParticipants}
                    details={sampleData2}
                    label={labelData2}
                    xLabel="Car Models"
                    yLabel="Distribution Count"
                  />
                )}
              </div>
              <div className="ml-2 h-screen w-full">
                {sampleData3.length > 0 && (
                  <CardBarChart
                    title="Respondent group %age"
                    total={surveryParticipants}
                    details={sampleData3}
                    label={labelGroup}
                    xLabel="Params"
                    yLabel="%age"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
