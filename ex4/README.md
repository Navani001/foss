Project Structure

graphql-task-api/
│
├── graphql/
│ ├── schema.js
│ └── resolvers.js
│
├── models/
│ └── Task.js
│
├── .env.example
├── server.js
├── package.json
└── README.md




npm init -y

npm install express apollo-server-express graphql mongoose dotenv

npm install

npm start

Now open your browser and visit:
http://localhost:4000/graphql


✅ Create Task
mutation {
  createTask(input: {
    title: "Finish assignment",
    description: "Write report",
    priority: HIGH
  }) {
    id
    title
    priority
    completed
  }
}




📋 Get All Tasks
query {
  tasks {
    id
    title
    description
    priority
    completed
    createdAt
  }
}

🔍 Get Single Task
query {
  task(id: "PUT_TASK_ID_HERE") {
    id
    title
    priority
    completed
  }
}

✏️ Update Task
mutation {
  updateTask(id: "PUT_TASK_ID_HERE", input: {
    completed: true,
    priority: MEDIUM,
    title: "Updated title"
  }) {
    id
    title
    priority
    completed
  }
}

🗑️ Delete Task
mutation {
  deleteTask(id: "PUT_TASK_ID_HERE")
}