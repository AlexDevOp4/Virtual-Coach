import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
export default function ExerciseHistory() {
  const [data, setData] = useState([]);
  const [currentDay, setCurrentDay] = useState([]);

  useEffect(() => {
    getWorkouts();
  }, []);

  const handleSearch = async (e) => {
    console.log(e.target.value);

    const getExercises = await axios.get("http://localhost:5000/users");

    console.log(getExercises.data[0].workouts);

    const currentWorkout = getExercises.data[0].workouts.filter(
      (x) => x.date === e.target.value
    );

    try {
      setData(currentWorkout);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getWorkouts = async () => {
    const getExercises = await axios.get("http://localhost:5000/users");

    console.log(getExercises.data[0].workouts);

    const uniqueIds = [];

    const unique = getExercises.data[0].workouts.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.date);

      if (!isDuplicate) {
        uniqueIds.push(element.date);

        return true;
      }

      return false;
    });

    console.log(unique);

    try {
      setCurrentDay(unique);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <div className="container mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 md:mx-auto container">
            <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <div className="text-center pb-2 font-bold"></div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-bold text-gray-700 text-center"
                  >
                    Select Date
                  </label>
                  <select
                    onChange={handleSearch}
                    name="date"
                    className="mt-1  text-center block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {currentDay.map((x) => {
                      return <option className="text-center">{x.date}</option>;
                    })}
                  </select>
                </div>

                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Exercises
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Sets
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Reps
                      </th>
                      <th
                        scope="col"
                        className=" py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Weight
                      </th>
                    </tr>
                  </thead>
                  {data.map((x, i) => (
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {x.exercise}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {x.sets}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {x.reps}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {x.weight}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
