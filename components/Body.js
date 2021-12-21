import Search from './Search';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

function Body({spotifyApi}) {
  const {data:session}=useSession()
  const { accessToken } = session;
  const [search, setsearch] = useState("");
  const [searchResults,setSearchResults]=useState([]);
  const [newRelease,setNewRelease]=useState([]);

useEffect(() => {
  if(!accessToken) return
  spotifyApi.setAccessToken(accessToken);
}, [accessToken])


//search


useEffect(() => {
  if(!search) return setSearchResults([]);
  if(!accessToken) return;
  spotifyApi.searchTracks(search).then((res)=>{
    setSearchResults(res.Body.tracks.items.map((track)=>{
      return {
        id: track.id,
        artist: track.artist[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: track.album.images[0].url,
        popularity: track.popularity,
      }
    }))
  })
}, [search,accessToken])

console.log(searchResults);

    return (
        <section className="bg-black ml-24 py-3 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
         <Search search={search} setSearch={setsearch} />
         <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid:-cols-4 gap-x-4 gap-y-8 p-4">

         </div>
        </section>
    )
}

export default Body
