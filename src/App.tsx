import React, { useState } from "react"
import Map from "./components/Map"
import axios from "axios"

const App: React.FC = () => {
  const [postcode, setPostcode] = useState<string>("")
  const [locations, setLocations] = useState<any[]>([])

  const handleSearch = async () => {
    try {
      const response = await axios.get("/postcodes.json")
      const nearbyLocations = response.data.filter((loc: any) =>
        loc.postcode.startsWith(postcode.slice(0, 2))
      )
      setLocations(nearbyLocations)
    } catch (error) {
      console.error("Error fetching postcodes:", error)
    }
  }

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-5">Postcode Finder</h1>
      <input
        type="text"
        placeholder="Enter UK Postcode"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        className="p-2 border rounded w-full max-w-md mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Find Nearby Postcodes
      </button>
      <div className="mt-5 w-full h-96">
        <Map locations={locations} />
      </div>
    </div>
  )
}

export default App
