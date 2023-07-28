import { Segmented, Spin } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import React, { FC, useEffect, useState } from 'react'
import './index.scss'
import Setting from '../components/setting';
import CardList from '../components/card-list';
import api from '../config/axios.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { convertDateString } from '../components/utils/date-time.ts';
import { LoadingOutlined } from '@ant-design/icons';
const MainScreen: FC = () => {
  const [currentPage, setCurrentPage] = useState<SegmentedValue>('Tất cả trận đấu');
  const [matches, setMatches] = useState([]);
  const [date, setDate] = useState('');
  const antIcon = <LoadingOutlined style={{ fontSize: 70 }} spin />;
  useEffect(() => {
    api.get('http://localhost:8080/matches')
      .then((response: AxiosResponse) => {
        console.log(response.data);

        setMatches(response.data);
        // setDate(convertDateString(response.data.date));

      }).catch((error: AxiosError) => {
        console.log(error);
      })
  }, [])

  const generatePage = () => {
    if (matches.length > 0) {
      switch (currentPage) {
        case 'Tất cả trận đấu':
          return <CardList match={matches} date={date} />
        case 'Xếp hạng 5 phút':
          return <CardList />
        case 'Xếp hạng 5 phút + 1':
          return <CardList />
        case 'Xếp hạng 10 phút':
          return <CardList />
        case 'Xếp hạng 10 phút + 2':
          return <CardList />
        case 'Cài đặt':
          return <Setting />
      }
    } else {
      return <Spin indicator={antIcon} size='large' />;
    }

  }

  return (
    <div className='main'>
      <Segmented
        className='segment'
        onChange={(value: SegmentedValue) => {
          setCurrentPage(value);
        }}
        options={['Tất cả trận đấu', 'Xếp hạng 5 phút', 'Xếp hạng 5 phút + 1', 'Xếp hạng 10 phút', 'Xếp hạng 10 phút + 2', 'Cài đặt']}
      />

      <div className={`page ${matches.length > 0 ? '' : 'spin'}`}>
        {generatePage()}
      </div>
    </div>
  )
}

export default MainScreen;
