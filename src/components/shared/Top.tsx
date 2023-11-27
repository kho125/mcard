import Flex from "./Flex"
import Text from "./Text"

interface TopProps {
  title: string
  subTitle: string
}

function Top({ title, subTitle }: TopProps) {
  return(
    <Flex direction="column">
      <Text bold={true} typography="t4">{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

export default Top