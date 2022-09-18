import React, { useEffect, useState } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

export default function ProgressMobileStepper({
  minutes,
  rest,
}: {
  minutes: number;
  rest: boolean;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const pomo = useSelector((state: any) => state.pomo.value.pomoNum);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (rest) {
      if (pomo.length !== 0 && pomo.length % 4 === 0) {
        // 4세트
        if (minutes !== 30 && minutes % 6 === 0) {
          handleBack(); // 6분마다 감소
        }
      } else {
        if (minutes !== 5) {
          handleBack(); // 1분마다 감소
        }
      }
    } else {
      if (minutes % 5 === 0 && minutes !== 25) {
        handleNext();
      }
    }
  }, [rest, minutes]);

  return (
    <>
      <MobileStepper
        activeStep={activeStep}
        backButton={
          <Button disabled={rest} size="small" sx={{ color: 'tomato' }}>
            공부
          </Button>
        }
        nextButton={
          <Button disabled={!rest} size="small">
            휴식
          </Button>
        }
        position="static"
        steps={6}
        sx={{ maxWidth: 500, flexGrow: 1, margin: '0 auto', marginTop: '30px' }}
        variant="progress"
      />
    </>
  );
}
