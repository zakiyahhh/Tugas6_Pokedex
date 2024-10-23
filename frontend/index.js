let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    // fetch ke mock server yang berjalan di localhost:3000
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("HTTP call failed");
    }
    // Parse data menjadi format JSON
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component with Tailwind styling
function PokemonCard(props) {
  return React.createElement(
    "div", {
      // Tambahkan styling menggunakan Tailwind CSS 
      className: "bg-white shadow-lg rounded-lg p-6 m-4 w-64 flex flex-col items-center transform transition-transform hover:scale-105",
    },
    // gambar pokemon
    React.createElement("img", {
      src: props.image, //gambar dari props
      alt: props.name, //diisi dengan nama pokemon
      className: "w-32 h-32 object-contain mb-4", //styling tailwind
    }),
    // nama pokemon
    React.createElement(
      "h2", {
        className: "text-xl font-bold text-gray-700 mb-2 capitalize"
      },
      props.name //tampil nama pokemon
    ),
    //tipe pokemon
    React.createElement(
      "p", {
        className: "text-gray-600"
      },
      `Type: ${props.types}` //tampil tipe pokemon
    )
  );
}

// List component with Tailwind styling
function PokemonList() {
  // jika pokemon data masih kosong
  if (pokemonData.length === 0) {
    return React.createElement(
      "p", {
        className: "text-center text-lg text-gray-700"
      }, // styling pesan loading
      "Loading Pokemon data..."
    );
  }

  // jika data pokemon terisi
  return React.createElement(
    "div", {
      // grid layout style tailwind
      className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center p-6",
    },
    // untuk daftar card pokemon
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div", {
      className: "min-h-screen bg-blue-900 p-8"
    },
    React.createElement(
      "header", {
        className: "mb-12"
      },
      React.createElement(
        "h1", {
          className: "text-4xl text-center font-bold text-white",
        },
        "Pokedex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();