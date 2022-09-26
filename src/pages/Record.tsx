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
  interface pomoArrayType {
    Date: string;
    TotalPomo: number;
  }
  interface recordedPomoType {
    createdAt: number;
    creatorId: string;
    pomo: Array<pomoArrayType>;
    userName: string;
  }

  const [recordedPomo, setRecordedPomo] = useState<
    recordedPomoType | undefined
  >({
    createdAt: 0,
    creatorId: '',
    pomo: [{ Date: '', TotalPomo: 0 }],
    userName: '',
  });

  const { id } = useParams();

  const pomoRef = collection(dbService, 'pomo');

  const getRecorderData = async () => {
    const recordedData = await getDoc(doc(pomoRef, id));
    const recoredeDataInfo = recordedData.data();
    setRecordedPomo(recoredeDataInfo as recordedPomoType);
  };

  const userProfile = useSelector((state: reduxState) => state.user.value);

  useEffect(() => {
    getRecorderData();
  }, []);

  const data = {
    labels: recordedPomo?.pomo.map((obj: pomoArrayType) => obj.Date), // optional (y축의 index)
    datasets: [
      {
        label: `${
          userProfile.displayName ? userProfile.displayName : '익명'
        }님의 뽀모 갯수`,
        data: recordedPomo?.pomo.map((obj: pomoArrayType) => obj.TotalPomo),
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
