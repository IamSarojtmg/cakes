import { useState } from "react";

interface cakesInfo {
  name: string;
  imageURL: string;
  rating: number;
}

const cakeData: cakesInfo[] = [{
  name: "carrot cake",
  imageURL:
    "https://static01.nyt.com/images/2020/11/01/dining/Carrot-Cake-textless/Carrot-Cake-textless-jumbo.jpg?quality=75&auto=webp",
  rating: 5,
},

 {
  name: "red velvet",
  imageURL:
    "https://www.allrecipes.com/thmb/h3tLDtMD7GgjIKOqATYemkacrMg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9295_redvelvetcake_ddmfs_step3_4x3_1091-9dfdff5a4bc8404697202d166d493200.jpg",
  rating: 3,
}];



function CakeList() {

  const [cakes, setCakes] = useState<cakesInfo[]>(cakeData);

  return (
    <>
      <header>
        <h1>View all cakes</h1>
        <div>
          <button>Add cake</button>
          <button>Favourites cakes</button>
        </div>
      </header>
      <main className="cakelist-cont">

          {cakes.map((cake, i) => (
            <div className="each-cake" key={i}>
              <div>{cake.name}</div>
              <img src={cake.imageURL} alt="image of the cake" />
              <div>{"⭐".repeat(cake.rating)}</div>
              <button>Add to Fav</button>
            </div>
          ))}

      </main>
    </>
  );
}

export default CakeList;
