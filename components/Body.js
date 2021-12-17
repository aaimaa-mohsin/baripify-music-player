import Search from './Search';
import { useState } from 'react';

function Body() {
  const [search, setsearch] = useState("");
    return (
        <section className="bg-black ml-24 py-3 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
         <Search search={search} setSearch={setsearch} />
        </section>
    )
}

export default Body
