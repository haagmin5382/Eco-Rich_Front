import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPomo } from 'redux/pomo';
import { Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { reduxState } from 'App';
import Stepper from './Stepper';

const day = new Date();
export const today = `${day.getFullYear()}년 ${
  day.getMonth() + 1
}월 ${day.getDate()}일`;
const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false); // 시작버튼을 눌렀는지 관리하는 state
  const [rest, setRest] = useState(false); // 공부하는 타임인지 휴식하는 타임인지 관리하는 state

  //   const secondsRef = useRef(0);
  // const data = useSelector(state => state.pomo.value);
  const pomo = useSelector((state: reduxState) => state.pomo.value.pomoNum);
  const dayPomo = useSelector((state: any) => state.pomo.value.dayPomo);

  const dispatch = useDispatch();
  const bgm = new Audio(
    'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=',
  );
  const startTimer = () => {
    setStart(true);
    bgm.play();
  };
  const stopTimer = () => {
    setStart(false);
    bgm.play();
  };
  const increasePomo = () => {
    dispatch(setPomo({ pomoNum: [...pomo, 1], dayPomo: dayPomo }));
    bgm.play();
  };
  const increaseDayPomo = () => {
    setStart(false);
    setMinutes(25);
    setSeconds(0);
    dispatch(
      setPomo({
        pomoNum: [],
      }),
    );
  };
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
              bgm.play(); // 휴식이 시작 되면 소리가 나서 휴식시간임을 알린다.
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
    }, 1000);
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
