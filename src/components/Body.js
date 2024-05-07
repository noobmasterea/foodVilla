import { useEffect, useState } from "react";
import { restaurantList } from "../config";
import RestaurantCard from "./RestaurantCard";
import { swiggy_api_URL } from "../config";
import Shimmer from './Shimmer';

function filterData(searchText, restaurants){
    const filterData = restaurants.filter((restaurant) => 
        restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filterData;
}

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredrestaurants, setFilteredRestaurants] = useState(restaurantList);
    const [searchText, setSearchText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    //using useEffect for one time call getRestaurants using empty dependency array
    useEffect(()=>{
        getRestaurants();
    },[])

    async function getRestaurants(){
        try {
            const response = await fetch(swiggy_api_URL);
            const json = await response.json();
            async function checkJsonData(jsonData){
                for(let i=0;i<jsonData?.data?.cards.length;i++)
                {
                    //initiate checkData for Swiggy Restaurant data
                    let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                    if(checkData !== undefined){
                        return checkData;
                    } 
                }
            }
            //calling the checkJsonData() function which returns Swiggy Restaurant data
            const resData = await checkJsonData(json);
            setAllRestaurants(resData);
            setFilteredRestaurants(resData);
        } catch (error) {
            console.error(error);
        }
    
    }

    //using searchData() and set condition if data is empty show error message
    const searchData = (searchText,restaurants) => {
        if(searchText !== ""){
            const filteredData = filterData(searchText,restaurants);
            setFilteredRestaurants(filteredData);
            setErrorMessage("");
            if(filteredData?.length === 0){
                setErrorMessage("No matched restaurant found");
            }
        }else{
            setErrorMessage("");
            setFilteredRestaurants(restaurants);
        }
    };

    // if allRestaurants is empty then don't render restaurant cards
    if(!allRestaurants) return null;
    return(
        <>
            <div className="search-container">
                <input 
                    type="text" 
                    className="search-inpuut" 
                    placeholder="Search a restaurant " 
                    value={searchText} 
                    onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}
                />
                <button 
                    className="search-btn"
                    onClick={()=>{
                        searchData(searchText,allRestaurants);
                    }}
                >
                    Search
                </button>
            </div>
            {errorMessage && <div className="error-container">{errorMessage}</div>}
            {
                allRestaurants?.length === 0 ? (<Shimmer/>) : (
                    <div className="restaurant-list">
                    {
                        filteredrestaurants.map((restaurant) => {
                            return (
                                <   
                                    RestaurantCard 
                                    key={restaurant?.info?.id} 
                                    {...restaurant?.info}  
                                />
                            );
                        })
                    }
                    </div>
                )
            }
        </>
        
    );
}

export default Body;