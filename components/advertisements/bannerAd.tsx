import { useAppSelector } from "@/redux/store";
import AdContainer from "./adContainer";


const BannerAd = () => {

  const { user } = useAppSelector(s => s.auth);


  if (user && user?.isPremium) return null;


  return (
    <AdContainer className="h-[90px] max-w-[728px]">
        <iframe
          data-aa="2431806"
          src="//ad.a-ads.com/2431806/?size=auto"
          style={{
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
    </AdContainer>
  )

};

export default BannerAd;