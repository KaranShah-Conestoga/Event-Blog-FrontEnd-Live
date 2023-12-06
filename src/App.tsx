import React from 'react';
import Routes from './Core/Components/Routes';
import routes from './Config/Routes';
import { Auth } from './Core/Services/AuthService';
import { useLocation } from 'react-router-dom';
import { Footer, Navigation } from './Component';
import { AdminNav } from './Admin';


function App() {
  const location = useLocation();
  const UserType = Auth.getUser().UserType;
  return (
    <div className="App">
      {
        (Auth.isAuthorized() && location.pathname !== '/login' && UserType === "User") ? <Navigation /> : (Auth.isAuthorized() && location.pathname !== '/login' && UserType === "Admin") ? <AdminNav /> : null
      }
      {
        (UserType === "Admin") ?
          <Routes
            location={location}
            redirect="/login"
            routes={[...routes['admin'], ...routes['comman']]}
            isAuthorized={Auth.isAuthorized()}
            // isAuthorized={true}
            notFound="/404"
          />
          : <Routes
            location={location}
            redirect="/login"
            routes={[...routes['app'], ...routes['comman']]}
            isAuthorized={Auth.isAuthorized()}
            // isAuthorized={true}
            notFound="/404"
          />
      }
     {
      (UserType === "Admin") ? null : <Footer />
     }



    </div>
  );
}

export default App;
