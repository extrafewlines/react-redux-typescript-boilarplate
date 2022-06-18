import { Suspense } from 'react';
import { MainLayout } from 'app/layouts/MainLayout';

const AppRoutes = () => {
  return (
    <MainLayout>
      <Suspense fallback={<h1>Loading</h1>}>
        {/* <Routes> */}
        {/* 
            Define Public Routes. Example: 
            <Route path="auth">
              <Route path="signup" element={...} />
            </Route>
          */}

        {/* 
            Define Private Routes. Example: 
            <Route path="home" element={...} />
          */}

        {/* 
            Define 404 Route Redirect/Component. Example: 
            <Route path="*" element={}...} />
          */}
        {/* </Routes> */}
      </Suspense>
    </MainLayout>
  );
};

export default AppRoutes;
