import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { IMG_CDN_URL } from ".././config";

const RestaurantMenu = () => {
    //to read a dynamic URL params
    const { id } = useParams();

    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        getRestaurantInfo();
    },[]);

    async function getRestaurantInfo(){
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.022505&lng=72.5713621&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json?.data);
        // setRestaurant(json?.data);
        // console.log(json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        // https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65420&lng=77.23730&restaurantId=44972&catalog_qa=undefined&isMenuUx4=true&submitAction=44972
        // for(let i=0;i<6;i++)
        //     console.log(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards[i]?.card?.info);
        // setRestaurant(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards[0]?.card?.info);
    }

    return (
        <div className="menu">
            <div>
            {/* <h4>Restaurant id: 123</h4>
            <h2>{restaurant.name}</h2>
            <img src={IMG_CDN_URL + restaurant.imageId}/> */}
            {/* <h5>{restaurant.description}</h5>
            <h3>{restaurant.category}</h3> */}
            </div>
            <div>
                <h1>Menu</h1>
            </div>
        </div>
    )
}

export default RestaurantMenu;