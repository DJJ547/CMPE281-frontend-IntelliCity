import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { MdSpaceDashboard } from "react-icons/md";
import { GiDeliveryDrone } from "react-icons/gi";
import { GiCctvCamera } from "react-icons/gi";
import { MdOutlineSensors } from "react-icons/md";

// ...
export default function Sidebar() {
  const handleClick = (path) => () => {
    window.location.href = path;
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[15rem] p-4 text-xl shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4"></div>
      <List className="flex flex-col space-y-11">
        <ListItem onClick={handleClick("/")}>
          <ListItemPrefix>
            <MdSpaceDashboard className="h-6 w-6" />
          </ListItemPrefix>
          Dashboard
        </ListItem>

        <ListItem onClick={handleClick("/camera")}>
          <ListItemPrefix>
            <GiCctvCamera className="h-6 w-6" />
          </ListItemPrefix>
          Camera Manager
        </ListItem>

        <ListItem onClick={handleClick("/iot")}>
          <ListItemPrefix>
            <MdOutlineSensors className="h-6 w-6" />
          </ListItemPrefix>
          IoT Manager
        </ListItem>

        <ListItem onClick={handleClick("/drone")}>
          <ListItemPrefix>
            <GiDeliveryDrone className="h-6 w-6" />
          </ListItemPrefix>
          Drone Manager
        </ListItem>
      </List>
    </Card>
  );
}
