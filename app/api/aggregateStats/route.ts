// app/api/aggregateStats/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../firebase.config';
import { collection, getDocs, doc, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  const surveySnapshot = await getDocs(collection(db, 'surveys'));

  for (const surveyDoc of surveySnapshot.docs) {
    const surveyData = surveyDoc.data();

    for (const questionKey in surveyData) {
      if (surveyData.hasOwnProperty(questionKey) && questionKey !== 'createdAt') {
        const answer = surveyData[questionKey];

        const questionStatsRef = doc(db, 'questionStats', questionKey);
        const questionStatsSnapshot = await getDoc(questionStatsRef);

        if (questionStatsSnapshot.exists()) {
          await updateDoc(questionStatsRef, {
            [answer]: increment(1),
            total: increment(1),
          });
        } else {
          await setDoc(questionStatsRef, {
            [answer]: 1,
            total: 1,
          });
        }
      }
    }
  }

  return NextResponse.json({ message: 'Stats aggregated successfully' });
}
