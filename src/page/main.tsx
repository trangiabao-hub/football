import { Segmented, Spin } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { FC, useEffect, useState } from 'react'
import './index.scss'
import Setting from '../components/setting';
import CardList from '../components/card-list';
import api from '../config/axios.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { Statistic } from '../model/statistic.ts';
import { Result } from '../components/modal/match.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
const MainScreen: FC = () => {
  const [matches, setMatches] = useState<Result[]>([]);
  const [currentPage, setCurrentPage] = useState<SegmentedValue>(0);
  const x = useSelector((store: RootState) => store.x);
  const underdog = useSelector((store: RootState) => store.underdog)
  const [tab1, setTab1] = useState<Result[]>([]);
  const [tab2, setTab2] = useState<Result[]>([]);
  const [tab3, setTab3] = useState<Result[]>([]);
  const [tab4, setTab4] = useState<Result[]>([]);
  const statistics: Statistic[] = useSelector((store: RootState) => store.statistic)
  const antIcon = <LoadingOutlined style={{ fontSize: 70 }} spin />;

  const getValueUnderDogByHandicap = (handicap: number) =>{
    if(handicap < 0) handicap *= -1;
    for(let i = 0; i < underdog.length ; i++){
      if(underdog[i].handicap === handicap) return underdog[i].value
    }
    return 1;
  }

  const generateBottomTop = (match: Result) => {
    let bottom: 'home' | 'away' = 'home';
    let top: 'home' | 'away' = 'home';
    if (match.handicap < 0) {
      bottom = 'home';
      top = 'away';
    } else if (match.handicap > 0) {
      top = 'home';
      bottom = 'away';
    }
    return [top, bottom];
  }

  const checkCondition1 = (match: Result, index: number): boolean => {
    const [top, bottom] = generateBottomTop(match);



    if (match.statisticCal[0][bottom] > match.statisticCal[0][top]) {
      return true;
    } else if (match.handicap === 0 || match.handicap === 0.25 || match.handicap === -0.25) {

      const bot = match.statisticCal[index][bottom] > 0 ? match.statisticCal[index][bottom] : 0.00001
      const tob = match.statisticCal[index][top] > 0 ? match.statisticCal[index][top] : 0.00001
      if(match.id === '8yomo4h3ez9jq0j') console.log(tob / bot);
      if (Number((bot / tob).toFixed(2)) > x || Number((tob / bot).toFixed(2)) > x) {


        return true;
      }
    }
    return false;
  }

  const checkCondition2 = (match: Result, index: number): boolean => {
    const [top, bottom] = generateBottomTop(match);
    if (match.statisticCal[index][bottom] > match.statisticCal[index][top] && match.statisticCal[index+1][bottom] > match.statisticCal[index+1][top]) {
      return true;
    } else if (match.handicap === 0 || match.handicap === 0.25 || match.handicap === -0.25) {
      if (Number((match.statisticCal[index][bottom] / match.statisticCal[index][top]).toFixed(2)) > x && Number((match.statisticCal[index+1][bottom] / match.statisticCal[index+1][top]).toFixed(2)) > x ||
      Number((match.statisticCal[index][top] / match.statisticCal[index][bottom]).toFixed(2)) > x && Number((match.statisticCal[index+1][top] / match.statisticCal[index+1][bottom]).toFixed(2)) > x)
        return true;
    }

    return false;
  }

  const generateLabel = (type: string) : string =>{
    switch(type){
      case 'FOUR_MINUTES': return 'Chỉ số 5 phút đầu'
      case 'FIVE_MINUTES': return 'Chỉ số từ phút thứ 4 đến phút thứ 5'
      case 'EIGHT_MINUTES': return 'Chỉ số 10 phút đầu'
      case 'TEN_MINUTES': return 'Chỉ số từ phút thứ 8 đến phút thứ 10'
      default: return ''
    }
  }

  // const sendMail = (match: Result, type: string) =>{
  //   api.post(`mail/${type}`, match).then((res)=>{
  //     console.log(res);
  //   })
  // }

  useEffect(() => {
    const fetch = async () => {
      api.get('/matches')
        .then((response: AxiosResponse<Result[]>) => {
          const newTab1: Result[] = [];
          const newTab2: Result[] = [];
          const newTab3: Result[] = [];
          const newTab4: Result[] = [];
          //   const list: Result[] = [{
          //     "id": "2y8m4zhwl24jql0",
          //     "season_id": "",
          //     "competition_id": "v2y8m4zhg0pql07",
          //     "home_team_id": "3glrw7h1nynqdyj",
          //     "away_team_id": "dn1m1ghnx6vmoep",
          //     "status_id": 1,
          //     "match_time": 1690659000,
          //     "venue_id": "",
          //     "referee_id": "",
          //     "neutral": 0,
          //     "note": "",
          //     "home_scores": [
          //         0,
          //         0,
          //         0,
          //         0,
          //         0,
          //         0,
          //         0
          //     ],
          //     "away_scores": [
          //         0,
          //         0,
          //         0,
          //         0,
          //         0,
          //         0,
          //         0
          //     ],
          //     "home_position": "",
          //     "away_position": "",
          //     "coverage": {
          //         "animation": 0,
          //         "lineup": 0
          //     },
          //     "round": {
          //         "stage_id": "",
          //         "group_num": 0,
          //         "round_num": 0
          //     },
          //     "related_id": '',
          //     "agg_score": '',
          //     "environment": {
          //         "weather": 1,
          //         "pressure": "761mmHg",
          //         "temperature": "23°C",
          //         "wind": "2.6m/s",
          //         "humidity": "40%"
          //     },
          //     "updated_at": -1553065,
          //     "handicap": -0.25,
          //     "homeTeam": {
          //         "id": "3glrw7h1nynqdyj",
          //         "name": "AC Colina",
          //         "logo": "https://img.thesports.com/football/team/df9dd3fe0380ba8a54627b617ddc1da3.png"
          //     },
          //     "awayTeam": {
          //         "id": "dn1m1ghnx6vmoep",
          //         "name": "Deportes Union Companias",
          //         "logo": "https://img.thesports.com/football/team/84508292aa78de5e6a518a08cae5fe5a.png"
          //     },
          //     "competition": {
          //         "id": "v2y8m4zhg0pql07",
          //         "name": "Chilean Primera C",
          //         "logo": "https://img.thesports.com/football/competition/48d72792228fe92ac46dcc01b1d3e1bb.png"
          //     },
          //     "statistics": [
          //       {
          //           "time": 1690659241,
          //           "statistics": [
          //               {
          //                   "type": "ATTACKS",
          //                   "home": 7,
          //                   "away": 2
          //               },
          //               {
          //                   "type": "BALL_POSSESSION",
          //                   "home": 49,
          //                   "away": 51
          //               },
          //               {
          //                   "type": "CORNER",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "DANGEROUS_ATTACK",
          //                   "home": 5,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "PENALTY",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "RED_CARD",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "SHOTS_OFF_TARGET",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "SHOTS_ON_TARGET",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "YELLOW_CARD",
          //                   "home": 1230,
          //                   "away": 0
          //               }
          //           ],
          //           "type": "FOUR_MINUTES"
          //       },
          //       {
          //           "time": 1690659300,
          //           "statistics": [
          //               {
          //                   "type": "ATTACKS",
          //                   "home": 8,
          //                   "away": 2
          //               },
          //               {
          //                   "type": "BALL_POSSESSION",
          //                   "home": 49,
          //                   "away": 51
          //               },
          //               {
          //                   "type": "CORNER",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "DANGEROUS_ATTACK",
          //                   "home": 5,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "PENALTY",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "RED_CARD",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "SHOTS_OFF_TARGET",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "SHOTS_ON_TARGET",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "YELLOW_CARD",
          //                   "home": 1230,
          //                   "away": 20
          //               }
          //           ],
          //           "type": "FIVE_MINUTES"
          //       },
          //       {
          //           "time": 1690659480,
          //           "statistics": [
          //               {
          //                   "type": "ATTACKS",
          //                   "home": 9,
          //                   "away": 2
          //               },
          //               {
          //                   "type": "BALL_POSSESSION",
          //                   "home": 49,
          //                   "away": 51
          //               },
          //               {
          //                   "type": "CORNER",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "DANGEROUS_ATTACK",
          //                   "home": 5,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "PENALTY",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "RED_CARD",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "SHOTS_OFF_TARGET",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "SHOTS_ON_TARGET",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "YELLOW_CARD",
          //                   "home": 1230,
          //                   "away": 20
          //               }
          //           ],
          //           "type": "EIGHT_MINUTES"
          //       },
          //       {
          //           "time": 1690659602,
          //           "statistics": [
          //               {
          //                   "type": "ATTACKS",
          //                   "home": 10,
          //                   "away": 2
          //               },
          //               {
          //                   "type": "BALL_POSSESSION",
          //                   "home": 49,
          //                   "away": 51
          //               },
          //               {
          //                   "type": "CORNER",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "DANGEROUS_ATTACK",
          //                   "home": 5,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "PENALTY",
          //                   "home": 0,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "RED_CARD",
          //                   "home": 123,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "SHOTS_OFF_TARGET",
          //                   "home": 123,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "SHOTS_ON_TARGET",
          //                   "home": 123,
          //                   "away": 0
          //               },
          //               {
          //                   "type": "YELLOW_CARD",
          //                   "home": 1230,
          //                   "away": 30
          //               }
          //           ],
          //           "type": "TEN_MINUTES"
          //       }
          //   ],
          //   statisticCal: [
          //     {
          //         "label": "FOUR_MINUTES",
          //         "home": 559.4,
          //         "away": 488.6
          //     },
          //     {
          //         "label": "FIVE_MINUTES",
          //         "home": 24,
          //         "away": -24
          //     },
          //     {
          //         "label": "EIGHT_MINUTES",
          //         "home": 641.8,
          //         "away": 521.2
          //     },
          //     {
          //         "label": "TEN_MINUTES",
          //         "home": 18.6,
          //         "away": 132.8
          //     }
          // ]
          // }]
          response.data.forEach((item) => {
            try {
              if (item.statistics) {
                for (let i = 0; i < 4; i++) {
                  if(!item.statistics || !item.statistics[i]) break;
                  if (item.statistics && item.statistics[i] && item.statistics[i].statistics)
                    item.statistics[i].statistics = item.statistics[i]?.statistics.sort((a, b) => a.type.localeCompare(b.type))


                    if(!item.statisticCal){
                      item.statisticCal = []
                    }

                  item.statisticCal[i] = {
                    label: generateLabel(item.statistics[i]?.type),
                    home: 0,
                    away: 0
                  }


                  const [top, bottom] = generateBottomTop(item)
                  console.log(top);

                  const value = getValueUnderDogByHandicap(item.handicap)

                  for (let j = 0; j < 9; j++) {
                    if (i === 1 || i === 3) {
                      item.statisticCal[i].home += Number((((item.statistics[i]?.statistics[j]?.home - (item.statistics[i - 1]?.statistics[j]?.home)) * statistics[j]?.value).toFixed(1))) * (bottom == 'home' ? value : 1)
                      item.statisticCal[i].away += Number((((item.statistics[i]?.statistics[j]?.away - (item.statistics[i - 1]?.statistics[j]?.away)) * statistics[j]?.value).toFixed(1))) * (bottom == 'away' ? value : 1)
                    } else {
                      item.statisticCal[i].home += Number((item.statistics[i]?.statistics[j]?.home * statistics[j]?.value).toFixed(1)) * (bottom == 'home' ? value : 1)
                      item.statisticCal[i].away += Number((item.statistics[i]?.statistics[j]?.away * statistics[j]?.value).toFixed(1)) * (bottom == 'away' ? value : 1)
                    }
                  }

                  if(i === 0 && checkCondition1(item, 0)){
                    // sendMail(item, "5_Minutes",);
                    newTab1.push(item)
                    setTab1([...newTab1])
                  }

                  if(i === 1 && checkCondition2(item, 0)){
                    // sendMail(item, "5-4_Minutes",);
                    newTab2.push(item)
                    setTab2([...newTab2])
                  }
                  if(i === 2 && checkCondition1(item, 2)){
                    // sendMail(item, "10_Minutes",);
                    newTab3.push(item)
                    setTab3([...newTab3])
                  }
                  if(i === 3 && checkCondition2(item, 2)){
                    // sendMail(item, "10-8_Minutes",);
                    newTab4.push(item)
                    setTab4([...newTab4])
                  }
                }
              }

            } catch (e) {
              console.log(e);
            }
          });

          setMatches(response.data);


          // setDate(convertDateString(response.data.date));

        }).catch((error: AxiosError) => {
          console.log(error);
        })
    }

    statistics && fetch();
  }, [statistics, underdog])



  const generatePage = () => {
    if (matches.length > 0) {
      switch (currentPage) {
        case 0:
          return <CardList match={matches} isShowButton={false}/>
        case 1:
          return <CardList match={tab1} isShowButton/>
        case 2:
          return <CardList match={tab2} isShowButton/>
        case 3:
          return <CardList match={tab3} isShowButton/>
        case 4:
          return <CardList match={tab4} isShowButton/>
        case 5:
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
          if(value.toLocaleString().includes('Tất cả trận đấu')) setCurrentPage(0);
          if(value.toLocaleString().includes('Xếp hạng 5 phút')) setCurrentPage(1);
          if(value.toLocaleString().includes('Xếp hạng 5 phút + 1')) setCurrentPage(2);
          if(value.toLocaleString().includes('Xếp hạng 10 phút')) setCurrentPage(3);
          if(value.toLocaleString().includes('Xếp hạng 10 phút + 2')) setCurrentPage(4);
          if(value.toLocaleString().includes('Cài đặt')) setCurrentPage(5);
        }}
        options={[`Tất cả trận đấu (${matches.length})`, `Xếp hạng 5 phút (${tab1.length})`, `Xếp hạng 5 phút + 1 (${tab2.length})`, `Xếp hạng 10 phút (${tab3.length})`, `Xếp hạng 10 phút + 2 (${tab4.length})`, `Cài đặt`]}
      />

      <div className={`page ${matches.length > 0 ? '' : 'spin'}`}>
        {generatePage()}
      </div>
    </div>
  )
}

export default MainScreen;
