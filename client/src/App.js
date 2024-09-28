import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PrivateRoute from './components/core/PrivateRoute';
import UserDefaultPage from './components/common/layout/user-default-layout';
import NoAccessPage from './components/common/pages/NoAccessPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
          {/* <Route path='/*' element={<AuthRoutes />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/manager/*' element={<PrivateRoute element={<DefaultLayoutManager />} allowedRoles={['manager']} />} />
          
          <Route path='/trainer/*' element={<PrivateRoute element={<DefaultLayoutTrainer />} allowedRoles={['trainer']} />} />
          <Route path={`${link.trainee}/*`} element={<PrivateRoute element={<DefaultLayoutTrainee />} allowedRoles={['trainee']} />} />
          */}
          <Route path='/' element={<div>h3h3</div>}/>
          <Route path='/user/*' element={<UserDefaultPage/>} />
          {/* <PrivateRoute element={<DefaultLayoutAdmin />} allowedRoles={['admin']} /> */}
          <Route path="/no-access" element={<NoAccessPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
