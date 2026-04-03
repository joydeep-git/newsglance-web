import { Particles } from "../ui/particles";

const ContactBackground = () => {

  return (
    <>
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={60}
        ease={80}
        color="#000"
        staticity={40}
      />
      <div className="absolute top-20 left-[10%] w-80 h-80 bg-project/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none animate-pulse delay-700" />
    </>
  )
}

export default ContactBackground;