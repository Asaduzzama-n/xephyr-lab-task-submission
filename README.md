# Xephyr Lab Task Submission

This project is a starter template for a task submission system using TypeScript, Express.js, and MongoDB. It features user management, file uploads, and a modular structure for scalable development.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [License](#license)

### Features

- REST API with Express.js and TypeScript
- MongoDB database integration
- Authentication and authorization
- File upload handling
- Modular structure for scalability
- Pre-configured ESLint and Prettier for code linting and formatting
- Husky and lint-staged for pre-commit checks

### Technologies Used

- Node.js
- Next.js
- Tailwind.css
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Socket.IO
- Winston (logging)
- Cloudinary (file storage)
- JSON Web Tokens (JWT) for authentication
- Zod (data validation)

### Setup and Installation Backend

### Prerequisites

- **Node.js**: Make sure you have **Node.js** (v14 or above) installed. You can download it from [here](https://nodejs.org/).

1. Clone the repository:

   ```bash
   git clone git@github.com:Asaduzzama-n/xephyr-lab-task-submission.git
   cd xephyr-lab-task-submission
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   NODE_ENV=development
   database_url=mongodb://localhost:27017/crud-app
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000/`.

### Environment Variables

| Variable       | Description                                        |
| -------------- | -------------------------------------------------- |
| `NODE_ENV`     | Set the environment mode (development/production). |
| `database_url` | MongoDB connection string.                         |

### Scripts

| Command                  | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `npm start`              | Starts the server in development mode.           |
| `npm run lint:check`     | Runs ESLint to check for linting errors.         |
| `npm run lint:fix`       | Fixes linting issues automatically.              |
| `npm run prettier:check` | Checks code formatting with Prettier.            |
| `npm run prettier:fix`   | Formats code using Prettier.                     |
| `npm run lint-prettier`  | Runs both linting and Prettier checks.           |
| `npm test`               | Runs tests (currently not configured).           |
| `npm run create-module`  | Generates a new module using the script `gm.ts`. |

### Setup and Installation Fronted

1. Change directory:

   ```bash
   cd task-manager-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000/`.

## API Endpoints

Base URL `http://localhost:5000/api/v1/`.

Here is a list of the available API endpoints:

### Tasks

```
GET /tasks: Get all tasks.
Returns: [ { "id": "1", "title": "Task 1", "status": "in-progress" }, { "id": "2", "title": "Task 2", "status": "completed" } ]
```

```
POST /tasks: Create a new task.
Body: { "title": "New Task", "status": "pending" }
Returns: { "id": "3", "title": "New Task", "status": "pending" }
```

      ```

GET /tasks/:id: Get a specific task by ID.

Returns: { "id": "1", "title": "Task 1", "status": "in-progress" }

```

```

PATCH /tasks/:id: Update a specific task by ID.

Body: { "title": "Updated Task", "status": "completed" }
Returns: { "id": "1", "title": "Updated Task", "status": "completed" }

```

```

DELETE /tasks/:id: Delete a specific task by ID.

Returns: { "message": "Task deleted successfully" }

```




### Project Structure


xephyr-lab-task-submission/
├── src/
│ ├── app/ # Core application logic
│ │ ├── middlewares/ # Custom middleware
│ │ ├── modules/ # Feature-specific modules
│ │ ├── services/ # Business logic services
│ │ ├── controllers/ # Route controllers
│ │ ├── models/ # Mongoose models
│ │ ├── interfaces/ # TypeScript interfaces for models
│ │ ├── routes/ # API route definitions
│ │ ├── constants/ # Enums and constants
│ │ └── validation/ # Zod schemas for validation
│ ├── routes/ # API route entry points
│ ├── utils/ # Utility functions
│ ├── server.ts # Main server entry point
│ └── gm.ts # Module generator script
├── task-manager-frontend # Frontend part
├── .env # Environment variables
├── .eslintrc.json # ESLint configuration
├── .prettierrc # Prettier configuration
├── package.json # NPM dependencies and scripts
└── README.md # Project documentation



### License

This project is licensed under the ISC License.


```
