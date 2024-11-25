# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
### Setting up Firebase and Adding Credentials

To set up Firebase and add credentials for your project, follow these steps:

1. **Create a Firebase project**: Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.
2. **Install the Firebase CLI**: Run `npm install -g firebase-tools` or `yarn global add firebase-tools` to install the Firebase CLI.
3. **Initialize Firebase in your project**: Run `firebase init` in your project directory to initialize Firebase.
4. **Create a Firebase configuration file**: Create a new file named `firebaseConfig.js` with the following content:



<!-- Total overview of the website -->
This website is a task management application built with React and Vite. Here is a total overview of the website's features and functionality:

* **Task Management**: The website allows users to create, read, update, and delete (CRUD) tasks.
* **Real-time Data Storage**: The application is connected to a Firebase backend, enabling real-time data storage and retrieval.
* **User-friendly Interface**: The website features a simple and intuitive interface, with a search bar for finding specific tasks.
* **Task Creation**: Users can add new tasks using a form.
* **Task Display**: All tasks are displayed in a grid format, making it easy to view and manage tasks.
* **Task Editing**: Each task can be edited with a single click, allowing users to update task details.
* **Task Deletion**: Each task can be deleted with a single click, allowing users to remove unwanted tasks.
* **Responsive Design**: The website is designed to be responsive, making it accessible on various devices and screen sizes.

Overall, the website is designed to be efficient, user-friendly, and easy to use, making it an ideal tool for managing tasks and staying organized.




### Using the App

#### Logging In

To use the task management app, follow these steps:

1. **Go to the login page**: Open the https://task-manager-two-ashy.vercel.app/login website and click on the "Login" button.
2. **Choose a login method**: You can log in using your email and password or login with Google.
3. **Enter your credentials**: If you choose to log in with email and password, enter your registered email address and password. If you choose to log in with Google, click on the "Login with Google" button and follow the prompts to authenticate with your Google account.
4. **Click the "Login" button**: Once you've entered your credentials, click the "Login" button to proceed.

#### After Logging In

Once you've successfully logged in, you will be redirected to the task management dashboard. From here, you can:

1. **Create a new task**: Click on the "Add Task" button and enter the task details in the form.
2. **View tasks**: All tasks are displayed in a grid format. You can scroll through the tasks to view their details.
3. **Edit a task**: Click on the "Edit" button next to a task to update its details.
4. **Delete a task**: Click on the "Delete" button next to a task to remove it from the list.
5. **Search for tasks**: Use the search bar to find specific tasks by keyword.

#### What to Expect

After logging in, you can expect the following:

* Your tasks will be synced with the Firebase backend, allowing you to access them from anywhere.
* You will receive real-time updates when tasks are added, edited, or deleted.
* You can use the app to manage your daily tasks and stay organized.





