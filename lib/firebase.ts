import { db } from '../firebase.config';
import { collection, addDoc, updateDoc, increment, setDoc, getDocs } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";


export const saveResponse = async (questionKey: string, selectedAnswer: string | null) => {
    try {
        const docRef = await addDoc(collection(db, "surveys"), {
            [questionKey]: selectedAnswer,
            createdAt: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    }
    catch (error) {
        console.error('Error saving response', error);
        return null;
    }
}

export const getData = async (questionKey: string) => {
    const docRef = doc(db, "questions", questionKey);
    const questionSnapshot = await getDoc(docRef);

    if (questionSnapshot.exists()) {
        return questionSnapshot.data();
    } else {
        console.log(`No data found for question key: ${questionKey}`);
        return null;
    }
}

export const aggregateStats = async (docId : string | null) => {
    if(docId){
        const docRef = doc(db, "surveys", docId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const surveyData = docSnap.data();
            for (const questionKey in surveyData) {
                if (surveyData.hasOwnProperty(questionKey) && questionKey !== 'createdAt'){
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
        } else {
            console.log(`No such document!`);
        }
    }
}

export const getAnswerData = async () => {
  const answersSnapshot = await getDocs(collection(db, 'questionStats'));
  const answersData = answersSnapshot.docs.map((doc) => doc.data());
  console.log(answersData);
  return answersData;
};
