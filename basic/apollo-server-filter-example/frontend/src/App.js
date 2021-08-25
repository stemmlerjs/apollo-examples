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
      <p>Name: </p>
      <input
        onChange={(e) => operations.updateFilter("name", e.target.value)}
        type="string"
      />

      {data.albums.map((album) => (
        <div>{JSON.stringify(album)}</div>
      ))}

      <button
        onClick={() =>
          refetch({
            // Must adhere to this shape - don't use "variables"
            albumsInput: { name: models.filters.name },
          })
        }
      >
        Search!
      </button>
    </div>
  );
}

export default App;
