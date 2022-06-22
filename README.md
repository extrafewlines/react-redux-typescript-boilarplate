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
        +-- /components        # shared UI components used across the entire application
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
+-- environments      # global configuration, env variables etc. get exported from here and used in the app.
|
+-- libs              # re-exporting different libraries pre-configured for the application. e.g. http/axios.ts, firebase.ts, aws-s3.ts, toast.ts, date-time.ts, etc.
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
+-- routes      # entry point for a feature and keeps routed components for a specific feature (Required). e.g. features/auth/routes/signup, features/auth/routes/signup, features/auth/routes/signin, etc
|
+-- state       # stateful slice of the redux state tree (Optional). e.g. src/app/features/auth/state/index.ts exports auth actions, thunks and auth reducer
|
+-- components  # components scoped to the specific feature (Optional)
|
+-- hooks       # hooks scoped to the specific feature (Optional)
|
+-- utils       # utility functions for the specific feature (Optional)
```

### How to configure redux-toolkit
```ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### How to configure private routes guard
```tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store';

export const PrivateRoute = () => {
  const location = useLocation();
  // Only for demo purposes. Replace this with useSelector!
  const auth = { isLoggedIn: true };

  if (auth.isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/auth/signin" state={{ from: location }} replace />;
};
```

### How to configure application routes
```tsx
import { Suspense } from 'react';
import { MainLayout } from 'app/layouts/MainLayout';
import { LoaderComponent } 'app/components/Loader';

const AppRoutes = () => {
  return (
    <MainLayout>
      <Suspense fallback={LoaderComponent}>
          <Route path="auth">
              <Route path="signup" element={<SignupScreen />} />
              <Route path="signin" element={<SigninScreen />} />
          </Route>

          <Route path="users/:id" element={<PrivateRoute/>}>
              <Route path="profile" element={<UserProfileScreen />} />
              <Route path="settings" element={<UserSettingsScreen />} />
          </Route>

          <Route path="*" element={<NotFound/>} />
      </Suspense>
    </MainLayout>
  );
};

export default AppRoutes;
```