import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import CharacterPage from '../CharacterPage';
import Layout from '../Layout';
import PeoplePage from '../PeoplePage';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/people" />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:peopleId" element={<CharacterPage />} />
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
