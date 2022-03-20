import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import PeopleContainer from '../../containers/PeopleContainer';
import Film from '../Film';
import Films from '../Films';
import Layout from '../Layout';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/films" />} />
            <Route path="/people" element={<PeopleContainer />} />
            <Route path="/people/:peopleId" element={<Film />} />
            <Route path="/films" element={<Films />} />
            <Route path="/films/:filmId" element={<Film />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

// TODO: Move to separate component.
function NotFound() {
  return <div>404 Not found</div>;
}

export default App;
