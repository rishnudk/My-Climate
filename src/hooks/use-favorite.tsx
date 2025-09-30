import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorege } from "./use-local-storage";
import { Search } from "lucide-react";

interface FavoriteCity {
    id: string;
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    addedAt: number;
}

export function useSearchHistory() {
   const [favorites, setFavorites] =  useLocalStorege<FavoriteCity[]>("search-history", []);

   const favoritesQuery =  useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity, 
   });


   const queryClient = useQueryClient();
   const addFavorites = useMutation( {
        mutationFn: async (
            city: Omit<FavoriteCity, "id" | "addedAt" >
        ) => {
            const newSearch: FavoriteCity = {
            ...city,
            id: `${city.lat}-${city.lon}-${Date.now()}`,
            addedAt: Date.now(),
        };

        const exits = favorites.some((fav) => fav.id === newFavorites.id)
        if (exits) return favorites;

        const newFavorites = [...favorites, newFavorites].slice(0, 10);

        setFavorites(newFavorites);
        return newFavorites;
    } ,
    onSuccess:()=> {
        queryClient.invalidateQueries({
            queryKey: ["favorites"]
        })
    },
   })

   const removeFavorite = useMutation({
    mutationFn: async (cityId:string) => {
        const newFavorites = favorites.filter((city) => city.id !== cityId)
        setFavorites(newFavorites)
        return newFavorites;
    },

onSuccess: () => {
      queryClient.invalidateQueries( {
        queryKey: ["favorites"]
      });
    },
  });


  return {
    favorites : favoritesQuery.data,
    addFavorites,
    removeFavorite,
    isFavorite:(lat:number, lon:number) => 
        favorites.some((city) => city.lat === lat && city.lon === lon )
  };
}