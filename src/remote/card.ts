import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  limit,
  startAfter,
  doc,
  getDoc,
} from 'firebase/firestore'
import { store } from './firebase'

import { COLLECTIONS } from '@constants'
import { Card } from '@models/card'

// pageParam 지금 보이고있는 맨 마지막요소
export async function getCards() {
  // const cardQuery =
  //   pageParam == null
  //     ? query(collection(store, COLLECTIONS.CARD), limit(10))
  //     : query(
  //         collection(store, COLLECTIONS.CARD),
  //         startAfter(pageParam),
  //         limit(10),
  //       )

  const cardSnapshot = await getDocs(collection(store, COLLECTIONS.CARD))

  console.log('cardSnapshot', cardSnapshot)

  // const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  // return { items, lastVisible }
}

// export async function getCard(id: string) {
//   const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))

//   return {
//     id,
//     ...(snapshot.data() as Card),
//   }
// }
