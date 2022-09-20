import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPomo } from 'redux/pomo';
import { Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { reduxState } from 'App';
import Stepper from './Stepper';
import { addDoc, collection } from 'firebase/firestore';
import { dbService } from 'fbase';

const day = new Date();
export const today = `${day.getFullYear()}년 ${
  day.getMonth() + 1
}월 ${day.getDate()}일`;
const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false); // 시작버튼을 눌렀는지 관리하는 state
  const [rest, setRest] = useState(false); // 공부하는 타임인지 휴식하는 타임인지 관리하는 state
  const pomo = useSelector((state: reduxState) => state.pomo.value.pomoNum);
  const dayPomo = useSelector((state: reduxState) => state.pomo.value.dayPomo);
  const userProfile = useSelector((state: reduxState) => state.user.value);
  const dispatch = useDispatch();

  const startTimer = () => {
    setStart(true);
    // bgm.play();
  };
  const stopTimer = () => {
    setStart(false);
    // bgm.play();
  };
  const increasePomo = () => {
    dispatch(setPomo({ pomoNum: [...pomo, 1], dayPomo: dayPomo }));
    // bgm.play();
  };
  const increaseDayPomo = () => {
    setStart(false);
    setMinutes(25);
    setSeconds(0);
    dispatch(
      setPomo({
        pomoNum: [],
        dayPomo: [...dayPomo, { Date: today, TotalPomo: pomo.length }],
      }),
    );
  };
  useEffect(() => {
    if (dayPomo[dayPomo.length - 1]?.TotalPomo) {
      const PomoInfo = {
        userName: userProfile.displayName,
        dayPomo: dayPomo,
        createdAt: Date.now(),
        creatorId: userProfile.uid, // 로그인할 때  유저정보를 받아온다.
      };
      addDoc(collection(dbService, 'pomo'), PomoInfo);
    }
  }, [dayPomo[dayPomo.length - 1]?.TotalPomo]);
  useEffect(() => {
    const countdown = setInterval(() => {
      if (start) {
        // 타이머 시작을 누르는 경우
        if (rest) {
          // 휴식 하는 타이머로 바뀌는 경우
          if (seconds === 0) {
            // 초가 0이 되면
            if (minutes > 0) {
              // 분이 남아 있을 경우
              setSeconds(59);
              // 다음 초는 59로 바뀌고
              setMinutes(minutes - 1);
              // 분은 하나 내려간다.
            } else {
              // 휴식 끝
              setRest(false); // 휴식이 끝나면 공부하는 타이머가 되게끔 rest를 false로 바꿔주고
              setMinutes(25); // 공부하는 타이머가 되게끔 분을 25분으로 설정한다.
              increasePomo(); // 휴식이 끝나면 뽀모 갯수 증가한다. (1세트 = 1뽀모)
              clearInterval(countdown); // setInterval로 반복하고 countdown 함수를 멈추게 한다.
            }
          }
          if (seconds > 0) {
            // 초가 남아 있는 경우
            setSeconds(seconds - 1); // 초가 1씩 내려간다.
          }
        } else {
          // 공부하는 타이머로 바뀌는 경우
          if (seconds === 0) {
            // 초가 0이 되면
            if (minutes > 0) {
              // 분이 남아있을 경우
              setSeconds(59); // 초는 59가 되고
              setMinutes(minutes - 1); // 분은 1 내려간다.
            } else {
              // 휴식 시작
              // bgm.play(); // 휴식이 시작 되면 소리가 나서 휴식시간임을 알린다.
              setRest(true); // 쉬는 타이머가 되게끔 rest state를 true로 바꾼다.
              if (pomo.length !== 0 && pomo.length % 4 === 0) {
                setMinutes(30); // 4세트마다 (포모 갯수가 4개가 되면 휴식타이머는 5분이 아닌 30분씩 휴식시간을 부여한다.)
              } else {
                setMinutes(5); // 4세트때가 아닌 경우에는 5분의 휴식 타이머로 바뀐다.
              }
              clearInterval(countdown);
            }
          }
          if (seconds > 0) {
            // 초가 0이상인 경우에는
            setSeconds(seconds - 1); // 초가 1씩 내려간다.
          }
        }
      }
    }, 1);
    return () => {
      clearInterval(countdown);
    };
  }, [start, minutes, seconds, rest]);

  return (
    <main>
      <CardContent sx={{ textAlign: 'center' }}>
        <Stepper minutes={minutes} rest={rest} />
        <Typography color="text.secondary" sx={{ mb: 1.5, fontSize: '5vw' }}>
          <>
            {minutes}:{seconds === 0 ? '00' : seconds}
          </>
        </Typography>
        {start ? (
          <Button
            onClick={stopTimer}
            sx={{ background: 'green', marginLeft: '1vw', marginRight: '1vw' }}
            variant="contained"
          >
            타이머 일시정지
          </Button>
        ) : (
          <Button
            onClick={startTimer}
            sx={{ background: 'tomato', marginRight: '1vw' }}
            variant="contained"
          >
            타이머 시작
          </Button>
        )}

        <Button
          onClick={increaseDayPomo}
          sx={{ background: 'black' }}
          variant="contained"
        >
          오늘 공부 마치기
        </Button>
      </CardContent>
    </main>
  );
};

export default Timer;
