# Cake Lover App
The Cake Lover App is a responsive, full-stack web application for viewing and submitting favorite cakes. This project demonstrates core web development skills by implementing CRUD operations (Create, Read, Update, Delete) via a RESTful API backend and a responsive frontend. It showcases abilities in data validation, error handling, and building a maintainable, modular application across both mobile and desktop browsers.

## Key Features / User Stories 
The Cake Lover App is designed to fulfill the following core functionalities, aligned with the provided user stories:

**S1 - View All Cakes:**
* As a cake lover, I can view all cakes that have been submitted so I can drool at their awe-some tastiness.
* Implementation: Displays a simple, responsive list of cakes, showing only the image and name for a quick overview.

**S2 - Submit New Cakes:**
* As a cake lover, I can submit cakes that I like so everyone can drool at my tasty suggestions.
* Implementation: Provides a dedicated form allowing users to specify a cake's name, comment, imageUrl, and a yumFactor (1-5). The application ensures that only valid forms are submitted, displaying relevant error messages for invalid fields, and prevents the submission of cakes with duplicate names. Users are returned to the main cake list after a successful submission.

**S3 - View Cake Details:**
* As a cake lover I can view details about a single cake so that I can see the comment made against it.
* Implementation: Users can select/click any cake from the main list to navigate to a detailed view, where the full comment or review for that specific cake is displayed. A clear mechanism is provided to navigate back to the main cake list.

## How to Install & Run the Project 
**FrontEnd**
1. Install Frontend Dependencies
Navigate into the client directory (where the package.json file for the frontend resides) and install the necessary packages using npm:

```
cd client
npm install
```

2. Run the Frontend Application
After installing dependencies, you can start the React development server powered by Vite:
```
npm run dev
```

The frontend application (a React app built with Vite) will be accessible at `http://localhost:5173`. Open this URL in your web browser.

**Backend**
- LATER

## Agile/Iterative Process
For a detailed view of the task breakdown, progress tracking, and user story management, please refer to the Project Trello Board https://trello.com/b/sLJsfeym/cakes-waracle

## Technical Stack & Choices 
**Frontend**
* React (with React Router): Chosen for its component-based architecture and robust ecosystem, facilitating modular UI development and navigation.
* TypeScript: Utilized for static typing, enabling early bug detection and improved code maintainability.
* Material-UI (MUI): Employed for accelerated UI development and ensuring a responsive, consistent design.

**Backend**
* Express (Node.js): Selected for its lightweight, minimalist nature, ideal for building efficient RESTful APIs and maintaining full-stack JavaScript consistency.
* MongoDB: Chosen as a NoSQL, document-oriented database for its schema flexibility and native JSON-like data storage, suitable for rapid iteration.

**Build and Packaging**
* Vite: Preferred for its fast development server and minimal configuration for React/TypeScript, including PWA capabilities.
* npm: The standard package manager for Node.js, offering robust dependency management and broad community support.

## Resiliency & Error Handling (Briefly explain your approach).

Project Structure (High-level overview of main folders and their purpose).

API Endpoints (Brief overview of your REST API: GET /cakes, POST /cakes etc., and the Cake payload structure).

Validation Rules (List the specific validation criteria for input fields).


Known Issues (Yes, keep this! Shows self-awareness and honesty).

Future Enhancements (Shows foresight and desire to improve).

License & Versioning (Standard practice).

