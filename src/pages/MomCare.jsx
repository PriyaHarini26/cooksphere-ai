import "./MomCare.css";
import { useState } from "react";

function MomCare() {
  const [selectedFood, setSelectedFood] = useState(null);

  const sections = [
    {
  title: "🤱 Pregnancy Foods",
  foods: [
    {
      name: "Avocado",
      image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad",
      calories: 160,
      protein: 2,
      iron: 0.6
    },
    {
      name: "Milk",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      calories: 103,
      protein: 8,
      iron: 0.1
    },
    {
      name: "Eggs",
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
      calories: 155,
      protein: 13,
      iron: 1.2
    }
  ]
},
    {
      title: "👶 Baby Foods",
      foods: [
        {
          name: "Banana Puree",
          image: "https://images.unsplash.com/photo-1574226516831-e1dff420e37f",
          calories: 160,
          protein: 2,
          iron: 0.6
        },
        {
          name: "Apple Puree",
          image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
          calories: 155,
          protein: 13,
          iron: 1.2
          
        },
        {
          name: "Rice Cereal",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
          calories: 103,
          protein: 8,
          iron: 0.1
        }
      ]
    },

    {
      title: "🩸 Iron Rich Foods",
      foods: [
        {
          name: "Spinach",
          image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
          calories: 103,
          protein: 8,
          iron: 0.1
        },
        {
          name: "Dates",
          image: "https://images.unsplash.com/photo-1603048719539-9ecb4c5b9c1f",
          calories: 155,
          protein: 13,
          iron: 1.2
        },
        {
          name: "Beetroot",
          image: "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887",
          calories: 160,
          protein: 2,
          iron: 0.6
        }
      ]
    },

    {
      title: "💪 Protein Foods",
      foods: [
        {
          name: "Chicken",
          image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
           calories: 160,
          protein: 2,
          iron: 0.6
        },
        {
          name: "Fish",
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
          calories: 155,
          protein: 13,
          iron: 1.2
        },
        {
          name: "Paneer",
          image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
          calories: 103,
          protein: 8,
          iron: 0.1
        }
      ]
    }
  ];

  return (
    <div className="momcare-page">

      <h1>🤱 MomCare Nutrition Hub</h1>

      {sections.map((section, index) => (
        <div key={index}>

          <h2>{section.title}</h2>

          <div className="food-grid">

            {section.foods.map((food, i) => (
              <div
                className="food-card"
                key={i}
                onClick={() => setSelectedFood(food)}
              >
                <img src={food.image} alt={food.name} />
                <h3>{food.name}</h3>
              </div>
            ))}

          </div>

        </div>
      ))}

      {/* ✅ POPUP MUST BE INSIDE COMPONENT */}
      {selectedFood && (
        <div
          className="food-popup-overlay"
          onClick={() => setSelectedFood(null)}
        >
          <div
            className="food-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedFood.image} alt={selectedFood.name} />

            <h2>{selectedFood.name}</h2>
            <p>🔥 Calories: {selectedFood.calories}</p>
            <p>💪 Protein: {selectedFood.protein}g</p>
            <p>🩸 Iron: {selectedFood.iron}mg</p>

            <p>Healthy food for pregnancy & baby care ❤️</p>

            <button onClick={() => setSelectedFood(null)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default MomCare;