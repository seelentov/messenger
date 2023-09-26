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

export const updateData = async (coll, item, props) => {
	const washingtonRef = doc(db, coll, item)

	await updateDoc(washingtonRef, props)
}

export const getAllData = async (coll, callback) => {
	const querySnapshot = await getDocs(collection(db, coll))
  const result = []
	querySnapshot.forEach(doc => {
    result.push(doc.data())
	})
  callback(result)
}

export const addToData = async (coll, item, props) => {
	const citiesRef = collection(db, coll)

	await setDoc(doc(citiesRef, item), props)
}

export const getData = async (coll, item, callback) => {
	const docRef = doc(db, coll, item)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		callback(docSnap.data())
	} else {
		console.log(`Отсутствует документ - /${coll}/${item}`)
	}
}

export const subscribeColl = async (coll, callback) => {
	const q = query(collection(db, coll))
	return onSnapshot(q, querySnapshot => {
		const result = []
		querySnapshot.forEach(doc => {
			result.push(doc.data())
		})
		callback(result)
	})
}

export const subscribeData = async (coll, item, callback) => {
	return onSnapshot(
		doc(db, coll, item),
		{ includeMetadataChanges: true },
		doc => {
			callback(doc.data())
		}
	)
}
