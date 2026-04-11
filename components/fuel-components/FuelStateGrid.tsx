import { FuelDataType } from "@/types/globalTypes";
import FuelStateCard from "./FuelStateCard";


const FuelStateGrid = ({ items }: { items: FuelDataType[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <FuelStateCard key={item.state} item={item} />
      ))}
    </div>
  );
};

export default FuelStateGrid;
