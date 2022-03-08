import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';

function App() {
  const [trendList, setTrendList] = useState({})
  const [filters, setFilters] = useState({
    geozone: "eu",
    gender: "female",
    sortBy: "",
    pageSize: 20
  })

  const updateState = (object) => {
    setFilters({
      ...filters,
      ...object,
    });
  };

  const getTrend = async () => {
    try {
      const responseFromApi = await axios.get(`api/trends?gender=${filters.gender}&geozone=${filters.geozone}&sort_by=${filters.sortBy}&page_size=${filters.pageSize}`, {
        auth: {
          username: process.env.REACT_APP_API_AUTH_USERNAME,
          password: process.env.REACT_APP_API_AUTH_PASSWORD
        }
      });
      setTrendList(responseFromApi.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePage = () => {
    const pageSize = filters.pageSize < trendList.total - 20 ? filters.pageSize + 20 : trendList.total;
    setFilters({
      ...filters,
      pageSize: pageSize
    })
  }

  useEffect(() => {
    getTrend();
  }, [filters])

  return (
    <div className="App">
      <Header state={filters} updateState={updateState} getTrend={getTrend} />
      <div className="trend-list">
        {
          trendList.trends?.length === 0 ?
            <p>Loading...</p> :
            trendList.trends?.map(el => (<div key={el.id} className="trend">
              <img alt="" src={`https://images.heuritech.com/${el.image}`} />
              <p className='trend-name'>{el.name}</p>
              <div>
                <p>Growth Of Fall 2020</p>
                <p>{(el.growth * 100).toFixed(2)}%</p>
              </div>
            </div>))
        }
      </div>
      {
        filters.pageSize < trendList.total && <div className='button'>
          <p onClick={handlePage}>See more trends</p>
          {/* <hr /> */}
        </div>
      }

    </div>
  );
}

export default App;
