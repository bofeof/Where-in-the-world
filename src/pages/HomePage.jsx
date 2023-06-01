import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  /*selectAllCountries, */ selectCountriesInfo,
  selectVisibleCountries,
} from '../store/countries/countries-selectors';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { loadCountries } from '../store/countries/countries-actions';
import { selectSearch, selectRegion } from '../store/controls/controls-selectors';

export const HomePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const search = useSelector(selectSearch);
  const region = useSelector(selectRegion);

  const countries = useSelector((state) => selectVisibleCountries(state, { search, region }));
  const { status, error, countriesListLenght } = useSelector(selectCountriesInfo);

  useEffect(() => {
    dispatch(loadCountries());
  }, [countriesListLenght, dispatch]);

  return (
    <>
      <Controls />

      {error && <h2>Cant fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2>}
      {status === 'received' && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: 'Population',
                  description: c.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: c.region,
                },
                {
                  title: 'Capital',
                  description: c.capital,
                },
              ],
            };

            return <Card key={c.name} onClick={() => navigate(`/country/${c.name}`)} {...countryInfo} />;
          })}
        </List>
      )}
    </>
  );
};