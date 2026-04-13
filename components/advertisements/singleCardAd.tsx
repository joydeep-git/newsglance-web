import { useAppSelector } from "@/redux/store";
import AdContainer from "./adContainer";


const SingleCardAd = () => {

  const { user } = useAppSelector(s => s.auth);


  if (user && user?.isPremium) return null;

  return (
    <AdContainer>
      <div dangerouslySetInnerHTML={{
        __html: `<script type="text/javascript">aclib.runBanner({zoneId: '11188954' })</script>`
      }} />
    </AdContainer>
  )

};

export default SingleCardAd;