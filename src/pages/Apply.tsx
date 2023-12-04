import { useState } from 'react'

import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@/remote/apply'
import { APPLY_STATUS } from '@/models/apply'
import useUser from '@/hooks/auth/useUser'
import { useNavigate, useParams } from 'react-router-dom'
import useAppliedCard from '@/components/apply/hooks/useAppliendCard'
import { useAlertContext } from '@/contexts/AlertContext'
import FillPageLoader from '@shared/FullPageLoader'

function ApplyPage() {
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const [readyToPoll, setReadyToPoll] = useState(false) // 폴링 할 준비가 되었냐~

  const user = useUser()
  const { id } = useParams() as { id: string }

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다',
            onButtonClick: () => {
              window.history.back()
            }
          })

          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true
    }
  })

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

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null // 이미 발급이 된 카드라면 Alert이 나오면서 빈 화면을 나타낸다
  }

  if (readyToPoll || 카드를신청중인가) {
    return <FillPageLoader message="카드를 신청중입니다" />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage