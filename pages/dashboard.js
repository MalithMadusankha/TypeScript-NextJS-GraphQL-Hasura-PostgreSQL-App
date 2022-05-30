import { useState } from 'react'
import { useRouter } from 'next/router'
import Tasks, { CreateTask } from '../src/service/TaskService'
import { withProtected } from '../src/hook/route'
import { VscLoading } from 'react-icons/vsc'

function Dashboard({ tasks }) {
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleSubmite = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let results = await CreateTask(taskName, description)
      setLoading(false)
      router.push('/dashboard')
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <div className="mx-5 mt-5">
          <h2 className="text-2xl font-semibold text-blue-500" href="/">
            Dashboard
          </h2>
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
                    rows="4"
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
              <h5 className="text-2xl font-medium text-blue-500 ">Task List</h5>
              <div className="ml-7 mb-2 inline-block w-10 border-2 border-blue-500"></div>
            </div>
            <div className="flex flex-wrap">
              {tasks &&
                tasks.tasks.length > 0 &&
                tasks.tasks.map((task, key) => {
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
