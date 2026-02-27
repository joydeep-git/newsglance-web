

const TitleStarter = ({ height = 20, width = 4 }: { height?: number; width?: number; }) => {

  return (
    <div style={{ height: `${height}px`, width: `${width}px` }} className="bg-project flex-shrink-0 mt-1" ></div>
  )
}

export default TitleStarter;