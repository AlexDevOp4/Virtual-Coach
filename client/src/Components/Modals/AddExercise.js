import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const exercises = {
  exercise: "",
  sets: "",
  reps: "",
  weight: "",
  date: "10/05/2022",
};
export default function AddExercise(props) {
  const [open, setOpen] = useState(props.isOpen);
  const [workout, setWorkout] = useState(exercises);
  const [currentDay, setCurrentDay] = useState();

  useEffect(() => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${month}/${day}/${year}`;

    setCurrentDay(currentDate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setWorkout({
      ...workout,
      [name]: value,
    });
  };

  const submitForm = async () => {
    try {
      const createExercise = await axios.post(
        "http://localhost:5000/users/addWorkout",
        {
          first_name: "Alex",
          exercise: workout.exercise,
          sets: workout.sets,
          reps: workout.reps,
          weight: workout.weight,
          date: currentDay,
        }
      );

      return createExercise;
    } catch (error) {
      return;
    }
  };

  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <form onSubmit={submitForm}>
                  <div
                    onClick={props.toggle}
                    className="text-right text-red-600"
                  >
                    <button type="button">X</button>
                  </div>
                  <div>
                    <label
                      htmlFor="exercise"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Exercise
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleSubmit}
                        required
                        type="text"
                        name="exercise"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="sets"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sets
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleSubmit}
                        required
                        type="text"
                        name="sets"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="reps"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reps
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleSubmit}
                        required
                        type="reps"
                        name="reps"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Weight
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleSubmit}
                        required
                        type="weight"
                        name="weight"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={props.toggle}
                    >
                      Add Exercise
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
