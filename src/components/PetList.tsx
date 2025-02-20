import React, { useEffect, useState } from 'react';
import { Owner, Pet, Toy } from '../api/types';
import axios from 'axios';
import { useAppContext } from '../context/useAppContext';

function PetList() {

  const {userData} = useAppContext()

  const [pets, setPets] = useState<Pet[]>([]);
  const [toys, setToys] = useState<Toy[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);

  const [filter, setFilter] = useState<string>("");

  const [filteredPetsData, setFilteredPetsData] = useState<any[]>([])

  const fetchPetList = async () => {
    const response = await axios.get("/api/pets");
    setPets(response.data);
  }

  const fetchToysList = async () => {
    const response = await axios.get("/api/toys");
    setToys(response.data);
  }

  const fetchOwnersList = async () => {
    const response = await axios.get("/api/owners");
    setOwners(response.data);
  }

  useEffect(() => {
    fetchPetList();
    fetchToysList();
    fetchOwnersList();
  }, [])

 const filterPetsData = (pets: Pet[], toys: Toy[], owners: Owner[], filter: string) => {
  return pets
  .filter(pet => {
    const owner = owners.find(o => o.id === pet.ownerId);

    const ownerMatches = owner ? owner.name.toLowerCase().includes(filter.toLowerCase()) : false;
    const petMatches = pet.name.toLowerCase().includes(filter.toLowerCase());

    const isAdmin = Boolean(userData?.role === "admin")

    return (ownerMatches || petMatches) && (isAdmin || pet.checkedIn)
  })
  .map((pet) => {
    return {
      id: pet.id,
      name: pet.name,
      ownerName: owners.find(owner => owner.id === pet.ownerId)?.name ?? "",
      favoriteToys: pet.favoriteToys.map(toyId => toys.find(toy => toy.id === toyId)?.name).join(", "),
      checkedIn: pet.checkedIn
    }
  })
 }

 useEffect(() => {
  setFilteredPetsData(() => filterPetsData(pets, toys, owners, filter))
 }, [pets, toys, owners, filter])

 if(!pets.length || !owners.length || !toys.length) return null

  return (
    <div>
      <h1>Pet List</h1>
      <input 
        placeholder='Write to filter'
        value={filter}
        onChange={(e) => {setFilter(e.target.value)}}
      />
      {
        filteredPetsData.map(pet => {
          return <div key={pet.id}>
            <p>Pet: {pet.name}</p>
            <p>Owner: {pet.ownerName}</p>
            <p>Favorite Toys: {pet.favoriteToys}</p>
            <p>CheckedIn: {pet.checkedIn ? "Yes" : "No"}</p>
          </div>
        })
      }
    </div>
  );
};

export default PetList;
