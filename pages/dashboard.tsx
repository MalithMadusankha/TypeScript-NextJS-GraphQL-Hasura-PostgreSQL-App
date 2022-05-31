import { useState } from 'react'
import { useRouter } from 'next/router'
import Tasks, { CreateTask } from '../src/service/TaskService'
import { withProtected } from '../src/hook/route'
import { VscLoading } from 'react-icons/vsc'
import { TaskType } from '../src/util/customTypes'

function Dashboard({ tasks }: any) {
  const [taskName, setTaskName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const router = useRouter()
  const handleSubmite = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      let results = await CreateTask(taskName, description)
      if (results) {
        setLoading(false)
        setIsError(false)
      } else {
        setLoading(false)
        setIsError(true)
      }

      router.push('/dashboard')
    } catch (error) {
      setLoading(false)
      setIsError(true)
    }
  }

  return (
    <>
      {isError ? (
        <div
          id="alert-2"
          className="mx-28 my-10 flex rounded-lg bg-red-100 p-4 dark:bg-red-200"
          role="alert"
        >
          <svg
            className="h-5 w-5 flex-shrink-0 text-red-700 dark:text-red-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
            Sorry cannot fetch tasks from server
          </div>
          <button
            type="button"
            className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-red-100 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
            data-dismiss-target="#alert-2"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <div>
          <div className="mx-5 mt-5">
            <h2 className="text-2xl font-semibold text-blue-500">Dashboard</h2>
            <div className="ml-9 mb-2 inline-block w-10 border-2 border-blue-500"></div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="m-5 max-w-sm rounded-2xl border border-gray-200 bg-blue-500 p-4 shadow-md dark:border-gray-700 sm:p-6 lg:p-8">
                <form className="space-y-6" onSubmit={handleSubmite}>
                  <h5 className="text-xl font-medium text-white dark:text-white">
                    Create Your Task
                  </h5>
                  <div>
                    <label
                      htmlFor="taskName"
                      className="mb-2 block text-sm font-medium text-white dark:text-gray-300"
                    >
                      Task name
                    </label>
                    <input
                      type="text"
                      name="task-name"
                      id="task-name"
                      className="block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-black outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      placeholder="Type here your task"
                      onChange={(e) => setTaskName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-white dark:text-gray-300"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-black outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Brefly describe your task . . ."
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    {loading ? (
                      <div className="inline-block rounded-full border-2 border-white py-2 px-12 font-semibold text-white hover:bg-white hover:text-blue-500">
                        <VscLoading className="mr-3 animate-spin text-2xl" />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="inline-block rounded-full border-2 border-white py-2 px-12 font-semibold text-white hover:bg-white hover:text-blue-500"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className=" md:col-span-2 md:mt-0">
              <div className="mt-5">
                <h5 className="text-2xl font-medium text-blue-500 ">
                  Task List
                </h5>
                <div className="ml-7 mb-2 inline-block w-10 border-2 border-blue-500"></div>
              </div>
              <div className="flex flex-wrap">
                {tasks &&
                  tasks.tasks.length > 0 &&
                  tasks.tasks.map((task: TaskType, key: any) => {
                    return (
                      <a
                        key={key}
                        href="#"
                        className="m-3 block w-60 max-w-sm rounded-lg border border-blue-300 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          {task.task_name}
                        </h5>
                        <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                          {task.description.slice(0, 60)}
                          {task.description && task.description.length > 60 && (
                            <span className="text-blue-500">
                              {' '}
                              read more . . .
                            </span>
                          )}
                        </p>
                      </a>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export async function getStaticProps() {
  let tasks = await Tasks()
  if (tasks) {
    return {
      props: {
        tasks: tasks.data,
      },
    }
  } else {
    return {
      props: {
        tasks: null,
      },
    }
  }
}

export default withProtected(Dashboard)
