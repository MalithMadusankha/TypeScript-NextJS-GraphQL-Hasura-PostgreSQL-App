const hasuraAuthHeader: any = process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET 
const hasuraURL: any = process.env.NEXT_PUBLIC_HASURA_URL
export default async function Tasks() {
  try {
    let results = await fetch(hasuraURL, {
      method: 'POST',
      headers: new Headers({
        'x-hasura-admin-secret':hasuraAuthHeader,
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

export async function CreateTask(taskName: string, description: string) {
  let results = await fetch(hasuraURL, {
    method: 'POST',
    headers: new Headers({
      'x-hasura-admin-secret':hasuraAuthHeader,
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
