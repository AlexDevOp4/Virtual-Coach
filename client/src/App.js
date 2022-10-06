import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AddExercise from "./Components/Modals/AddExercise";
import ExerciseHistory from "./Components/ExerciseHistory/ExerciseHistory";

function App() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [currentDay, setCurrentDay] = useState();

  useEffect(() => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${month}/${day}/${year}`;

    console.log(currentDate)

    setCurrentDay(currentDate);

    getWorkouts();
  }, []);

  const getWorkouts = async () => {
    const getExercises = await axios.get("http://localhost:5000/users");
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${month}/${day}/${year}`;

    const todaysExercises = getExercises.data.map((x) =>
      x.workouts.filter((y) => y.date === currentDate)
    );

    try {
      setName(getExercises.data[0].first_name);
      setData(todaysExercises[0]);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const deleteExercises = async (e) => {
    try {
      await axios.delete(`http://localhost:5000/users/${name}`, {
        data: { exercise: e.target.value },
      });

      getWorkouts();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <AddExercise isOpen={showModal} toggle={toggleModal} />
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 md:mx-auto container">
            <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <div className="text-center pb-2 font-bold">{currentDay}</div>
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
                      <th
                        scope="col"
                        className="relative text-right py-3.5 sm:pr-6"
                      >
                        {" "}
                        <button type="button" onClick={toggleModal}>
                          +
                        </button>
                        <span className="sr-only">X</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((x, i) => (
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
                        <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={deleteExercises}
                            value={x.exercise}
                            className="text-red-600 hover:text-indigo-900"
                          >
                            x<span className="sr-only">, {x.exercise}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExerciseHistory />
    </div>
  );
}

export default App;
