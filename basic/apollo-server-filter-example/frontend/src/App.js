import React from 'react'
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const GET_ALBUMS = gql`
  query Albums($albumsInput: AlbumsInputFilter) {
    albums(input: $albumsInput) {
      id
      name
    }
  }
`;

function useAlbumFilters() {
  const [filters, _updateFilter] = useState({ 
    id: undefined, 
    name: undefined 
  });

  const updateFilter = (filterType, value) => {
    _updateFilter({
      [filterType]: value,
    });
  };

  return {
    models: { filters },
    operations: { updateFilter },
  };
}

function App() {
  const { operations, models } = useAlbumFilters();

  const { data, loading, error, refetch } = useQuery(GET_ALBUMS);

  if (loading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  return (
    <div className="App">
      <h1>Albums</h1>

      <div>
        <label>Search</label>
        <input
          onChange={(e) => operations.updateFilter("name", e.target.value)}
          type="string"
        />
      </div>

      <br/>

      {data.albums.map((album) => (
        <div>{JSON.stringify(album)}</div>
      ))}

      <br/>

      <button
        onClick={() =>
          refetch({
            // Must adhere to this shape - don't use "variables"
            albumsInput: { name: models.filters.name },
          })
        }
      >
        Submit!
      </button>
    </div>
  );
}

export default App;
