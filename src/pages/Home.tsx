import AdBanners from "@/components/home/AdBanners"
import Top from "@/components/shared/Top"

function HomePage() {
  return (
    <div>
      <Top 
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
      />
      <AdBanners />
    </div>
  )
}

export default HomePage