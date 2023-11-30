import { useState } from 'react'

import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@/remote/apply'
import { APPLY_STATUS } from '@/models/apply'
import useUser from '@/hooks/auth/useUser'
import { useNavigate, useParams } from 'react-router-dom'

function ApplyPage() {
  const navigate = useNavigate()

  const [readyToPoll, setReadyToPoll] = useState(false) // 폴링 할 준비가 되었냐~

  const user = useUser()
  const { id } = useParams() as { id: string }

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        }
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        }
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll
  })

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
      console.log("카드추가!!")
      // 값이 추가되었을 때 => 폴링시작
    },
    onError: () => {
      // 실패 했을 때 => 폴링시작
      window.history.back()
    }
  })

  if (readyToPoll || 카드를신청중인가) {
    return <div>Lodding...</div>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage