import { useAppSelector } from "@/redux/store";
import AdContainer from "./adContainer";


const SingleCardAd = () => {

  const { user } = useAppSelector(s => s.auth);


  if (user && user?.isPremium) return null;

  return (
    <AdContainer>
      <script async={true} data-cfasync={false} src="https://pl27691719.profitablecpmratenetwork.com/c5de0ae8c2fc4ea4f37ad70f672a55bf/invoke.js"></script>
      <div id="container-c5de0ae8c2fc4ea4f37ad70f672a55bf"></div>
    </AdContainer>
  )

};

export default SingleCardAd;