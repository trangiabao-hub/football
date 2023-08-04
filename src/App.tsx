
import { useEffect } from 'react';
import api from './config/axios';
import MainScreen from './page/main'
import { setStatistic } from './redux/features/statistic';
import { useDispatch } from 'react-redux';
import { setX } from './redux/features/x';
import { setUnderdog } from './redux/features/underdog';

function App() {
  const dispatch = useDispatch();

  const fetch = async () =>{
    const response = await api.get('/statistic')
    const responseX = await api.get('/x')
    const responseUnderdog = await api.get('/underrafter')
    console.log(response.data);

    dispatch(setStatistic(response.data))
    dispatch(setX(responseX.data.value))
    dispatch(setUnderdog(responseUnderdog.data))
  }

  useEffect(()=>{
    fetch();
  },[])

  return <MainScreen/>
}

export default App
