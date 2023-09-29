import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebase.api'

export const updateData = async (coll:string, item:string, props:{}) => {
	const washingtonRef = doc(db, coll, item)

	await updateDoc(washingtonRef, props)
}

export const getAllData = async (coll:string, callback:Function) => {
	const querySnapshot = await getDocs(collection(db, coll))
  const result:{}[] = []
	querySnapshot.forEach(doc => {
    result.push(doc.data())
	})
  callback(result)
}

export const addToData = async (coll:string, item:string, props:{}) => {
	const citiesRef = collection(db, coll)

	await setDoc(doc(citiesRef, item), props)
}

export const getData = async (coll:string, item:string, resolve:Function, reject:Function) => {
	const docRef = doc(db, coll, item)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		resolve(docSnap.data())
	} else {
		reject()
	}
}

export const subscribeColl = async (coll:string, callback:Function) => {
	const q = query(collection(db, coll))
	return onSnapshot(q, querySnapshot => {
		const result:{}[] = []
		querySnapshot.forEach(doc => {
			result.push(doc.data())
		})
		callback(result)
	})
}

export const subscribeData = async (coll:string, item:string, callback:Function) => {
	return onSnapshot(
		doc(db, coll, item),
		{ includeMetadataChanges: true },
		doc => {
			callback(doc.data())
		}
	)
}
