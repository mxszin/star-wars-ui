import People from '../../components/People';
import { useRecoilState, useRecoilValue } from 'recoil';
import { peoplePageAtom, peoplePageCountSelector, peopleSelector } from '../../store/people';

function PeopleContainer() {
  const [page, setPage] = useRecoilState(peoplePageAtom);
  const pageCount = useRecoilValue(peoplePageCountSelector);
  const handleChange = (page: number) => {
    setPage(page);
  };

  const people = useRecoilValue(peopleSelector);

  if (people.length === 0) {
    return <div>No items</div>;
  }

  return (
    <People people={people} currentPage={page} pageCount={pageCount} onChangePage={handleChange} />
  );
}

export default PeopleContainer;
