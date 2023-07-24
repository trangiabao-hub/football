import { Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import React, { FC, useEffect, useState } from 'react'
import './index.scss'
import Setting from '../components/setting';
import CardList from '../components/card-list';
import api from '../config/axios.ts';
import { AxiosError, AxiosResponse } from 'axios';
const MainScreen: FC = () => {
  const [currentPage, setCurrentPage] = useState<SegmentedValue>('Tất cả trận đấu');


  const USER = "ryonco";
  const SECRET = "560c878a4fe32772eadacef33cbd979f"
  useEffect(() => {
    api.get(`/v1/football/match/diary?user=${USER}}&secret=${SECRET}&date=20230723`)
      .then((response: AxiosResponse) => {
        console.log(response.data);
      }).catch((error: AxiosError) => {
        console.log(error);
      })
  }, [])

  const generatePage = () => {

    switch (currentPage) {
      case 'Tất cả trận đấu':
        return <CardList />
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

      {generatePage()}
    </div>
  )
}

export default MainScreen;
