import { userAtom } from '@/atoms/user'
import { auth } from '@/remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

// 인증처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    console.log('user', user)

    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        phothURL: user.photoURL ?? '',
      })
    } else {
      setUser(null)
    }

    setInitialize(true)
  })

  if (initialize === false) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard