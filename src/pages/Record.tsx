import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getDoc, doc, collection } from 'firebase/firestore';
import { dbService } from 'fbase';
import { useSelector } from 'react-redux';
import { reduxState } from 'App';
import PageError from './pageForError/PageForNotLogin';
import PageForNotRecording from './pageForError/PageForNotRecording';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function Record() {
  // const dayPomo = useSelector((state: reduxState) => state.pomo.value.dayPomo);
  // const totalPomo = dayPomo.slice(
  //   dayPomo.length >= 5 ? dayPomo.length - 5 : 0,
  //   dayPomo.length,
  // );

  const [recordedPomo, setRecordedPomo] = useState<any>();
  const { id } = useParams();

  const pomoRef = collection(dbService, 'pomo');

  const getRecorderData = async () => {
    const recordedData = await getDoc(doc(pomoRef, id));
    setRecordedPomo(recordedData.data());
  };

  const userProfile = useSelector((state: reduxState) => state.user.value);

  useEffect(() => {
    getRecorderData();
  }, []);
  const data = {
    labels: recordedPomo?.pomo.map((obj: any) => obj.Date), // optional (y축의 index)
    datasets: [
      {
        label: `${
          recordedPomo?.userName ? recordedPomo?.userName : '익명'
        }님의 뽀모 갯수`,
        data: recordedPomo?.pomo.map((obj: any) => obj.TotalPomo),
        borderColor: 'tomato',
        backgroundColor: 'tomato',
      },
    ],
  };
  return (
    <div>
      {userProfile.uid ? (
        id !== 'undefined' ? (
          <Line data={data} />
        ) : (
          <PageForNotRecording />
        )
      ) : (
        <PageError />
      )}
    </div>
  );
}

export default Record;
