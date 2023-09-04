import { useEffect, useState } from "react";
import { MENU_URL } from "./url";

const useRestaurantMenu = (resId) => {
  const [menuItems, setMenuItems] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();
    setMenuItems(json.data);
  };

  return menuItems;
};

export default useRestaurantMenu;
