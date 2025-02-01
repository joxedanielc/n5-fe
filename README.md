# **React Frontend for Permissions Management**

This project is a **React-based frontend application** designed to interact with the backend API for permissions management. The current flow has:

- **Viewing existing permissions**
- **Submitting new permission requests**
- **Modifying previously granted permissions**

## **🚀 Getting Started**

### **Prerequisites**

To set up and run this project, ensure that you have installed:

- **Node.js** (Latest LTS version recommended)
- **npm**

### **Installation Steps**

Clone the repository and install all necessary dependencies:

```bash
git clone https://github.com/joxedanielc/n5-fe
cd n5-fe
npm install
```

## **▶ Running the Application**

To launch the dev environment, execute the following command:

```bash
npm start
```

This will start a local development **[http://localhost:3000](http://localhost:3000)**.

## **📌 Available Scripts**

These are the commands are available:

| Command         | Description                                       |
| --------------- | ------------------------------------------------- |
| `npm start`     | Launches the application in development mode.     |
| `npm run build` | Generates a production-ready build.               |
| `npm run lint`  | Executes ESLint to check for code quality issues. |

## **🛠 Project Structure**

```
/src
├── api/
│   ├── apiClient.js
│   ├── permissionApi.js
├── components/
│   ├── PermissionForm.js
│   ├── PermissionTable.js
├── pages/
│   ├── RequestPermission.js
│   ├── EditPermission.js
│   ├── GetPermissions.js
├── App.js
├── index.js
```

---

## **🔗 Backend Integration**

This project communicates with the backend:

```
http://localhost:5155/api
```

## **🎨 Technology Stack**

The project utilizes the following technologies:

- **React** – Component-based frontend framework
- **Axios** – HTTP client for API requests
- **MUI (Material-UI)** – UI component library for consistent design
- **React Router** – Enables client-side routing and navigation

## **💡 Additional Notes**

- **Frontend unit tests** have not been implemented at this stage.
- The application assumes the backend is fully functional before frontend interactions.

## **📜 License**

This project is distributed under the **MIT License**.
