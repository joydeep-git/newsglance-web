import { useAppSelector } from "@/redux/store";
import AdContainer from "./adContainer";


const BannerAd = () => {

  const { user } = useAppSelector(s => s.auth);


  if (user && user?.isPremium) return null;


  return (
    <AdContainer className="h-[90px] max-w-[728px]">
      <div
        dangerouslySetInnerHTML={{
          __html: `<script type="text/javascript">aclib.runBanner({zoneId: '11188918'})</script>`
        }}
      />
    </AdContainer>
  )

};

export default BannerAd;