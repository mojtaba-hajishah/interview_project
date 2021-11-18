import './styles.css';
import DataTable from '../../components/DataTable'
import { default as data } from './data.json'

function HomePage() {
  return (
    <main className='PageContent'>
      <DataTable rows={data} />
    </main>
  );
}

export default HomePage;
