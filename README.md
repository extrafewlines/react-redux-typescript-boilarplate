# Application Overview

- Explain application purpose in 200-500 words.

<br>

## Get Started

Prerequisites:

- Node 14+
- Yarn 1.22+

To set up the app execute the following commands.

```bash
git clone <repository-url>
cd <project-name>
cp .env.example .env.development.local (if running the project locally)
cp .env.example .env.development.local (if running the project in production)
cp .env.example .env.test (regardless of dev/prod environment, we have to add .env.test as well)
yarn install
```

##### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Project Structure

Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- /app/
        +-- /components         # shared layout and UI components used across the entire application
        |
        +-- /constants         # shared constants used across the entire application. e.g. application.ts, regex.ts, image.ts, lottie.ts
        |
        +-- /enums             # shared enums used across the entire application.
        |
        +-- /features          # feature based modules. e.g features/signup, features/signin, features/dashboard, features/checkout, etc.
        |
        +-- /guards            # shared route guards used across the entire application. e.g. PrivateRoute, RoleBasedRoute, PublicRoute, etc!
        |
        +-- /hooks             # shared hooks used across the entire application. e.g. useOutsideClick, useDarkMode, etc
        |
        +-- /interfaces        # shared interfaces used across the entire application. e.g. PaginatedList, etc!
        |
        +-- /layouts           # shared layout components used across the entire application. e.g. MainLayout, DrawerLayout. Each layout contains Header, Footer and dynamic { children } placeholder.
|
+-- assets            # assets folder can contain all the static files such as images, fonts, videos, lottie animation files etc.
|
+-- config            # global configuration, env variables etc. get exported from here and used in the app. e.g. config/firebase.ts, config/aws-s3.ts etc!
|
+-- environments      # global configuration, env variables etc. get exported from here and used in the app.
|
+-- libs              # re-exporting different libraries pre-configured for the application. e.g. http/axios.ts, toast.ts, date-time.ts, etc.
|
+-- store             # global state store
|
+-- utils             # shared utility functions
```

In order to scale the application in the easiest and most maintainable way, keep most of the code inside the `features` folder, which should contain different feature-based things. Every `feature` folder should contain domain specific code for a given feature. This will allow you to keep functionalities scoped to a feature and not mix its declarations with shared things. This is much easier to maintain than a flat folder structure with many files.

A feature could have the following structure:

```sh
src/app/features/auth
|
+-- routes      # route components for a specific feature pages (Required)
|
+-- state       # a stateful slice of the redux state tree (Optional). e.g. src/app/features/auth/state/index.ts exports auth actions and auth reducer
|
+-- components  # components scoped to a specific feature (Optional)
|
+-- hooks       # hooks scoped to a specific feature (Optional)
|
+-- utils       # utility functions for a specific feature (Optional)
|
+-- index.ts    # entry point for the feature, it should serve as the public API of the given feature and exports everything that should be used outside the feature
```

A feature folder could also contain other features (if used only within the parent feature) or be kept separated, it's a matter of preference.

Everything from a feature should be exported from the `index.ts` file which behaves as the public API of the feature.

You should import stuff from other features only by using:

`import {AwesomeComponent} from "src/app/features/awesome-feature"`

and not

`import {AwesomeComponent} from "src/app/features/awesome-feature/components/AwesomeComponent`
