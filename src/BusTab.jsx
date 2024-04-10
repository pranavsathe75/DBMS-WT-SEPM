import BusFounded from "./BusFounded";
import './BusTab.css'
export default function BusTab(){
    return(
        <div className="answers">
            <BusFounded busNo="10" busName="Katraj to Swargate" source="Swargate" destination="Katraj" sourceTime="10" destTime="12" fare="10"></BusFounded>
            <BusFounded busNo="10" busName="Katraj to Swargate" source="Swargate" destination="Katraj" sourceTime="10" destTime="12" fare="10"></BusFounded>
        </div>
    );
}