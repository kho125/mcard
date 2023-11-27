import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getAdBanners } from '@/remote/adBanner'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import { colors } from '@/styles/colorPalette'

function AdBanners() {
  const { data } = useQuery(['adBanners'], () => getAdBanners())

  return (
    <Container>
      {data?.map((banner) => {
        return (
          <Link to={banner.link}>
            <Flex direction="column" css={bannerContainerStyles}>
              <Text bold={true}>{banner.title}</Text>
              <Text typography="t7">{banner.description}</Text>
            </Flex>
          </Link>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

export default AdBanners
