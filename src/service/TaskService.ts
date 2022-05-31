import useAuth from '../hook/auth'

export default async function Tasks() {
  try {
    let results = await fetch('https://m-demo-1.hasura.app/v1/graphql', {
      method: 'POST',
      headers: new Headers({
        'x-hasura-admin-secret':
          'xXx2JTXihpVXh8O0KIkaacazZLFiRQ4jQqVhAnaMvyNr131tmuEFRjrTNhXGwH04',
        'Content-Type': 'application/json',
      }),

      body: JSON.stringify({
        query: ` {
          tasks {
            task_name
            description
          }
        }`,
      }),
    })
    let tasks = await results.json()
    return tasks
  } catch (error) {}
}

export async function CreateTask(taskName: any, description: any) {
  let results = await fetch('https://m-demo-1.hasura.app/v1/graphql', {
    method: 'POST',
    headers: new Headers({
      'x-hasura-admin-secret':
        'xXx2JTXihpVXh8O0KIkaacazZLFiRQ4jQqVhAnaMvyNr131tmuEFRjrTNhXGwH04',
      'Content-Type': 'application/json',
    }),

    body: JSON.stringify({
      query: ` mutation {
            insert_tasks(objects: {task_name: "${taskName}", description: "${description}"}) {
            affected_rows
            returning {
              id
            }
          }
        }`,
    }),
  })
  return await results.json()
}
