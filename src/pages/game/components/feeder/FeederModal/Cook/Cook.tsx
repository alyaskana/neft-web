import { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";

import { $crops, $userRecipes } from "@/pages/game/model";
import { cookRecipeFx } from "@/api/games";
import {
  Button,
  Card,
  LeftPanel,
  MiniCard,
  RightPanel,
} from "@/share/components";

import s from "./Cook.module.scss";
import { TUserRecipe } from "@/types/game";
import { secondFromNow } from "@/utils/secondFromNow";
import { secondToTimeString } from "@/utils/secondToTimeString";

const ActiveCookingRecipe: FC<{ userRecipe: TUserRecipe }> = ({
  userRecipe,
}) => {
  const defaultTimer = secondFromNow(new Date(userRecipe.final_cook_time));
  const [growSeconds, setGrowSeconds] = useState(defaultTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      if (growSeconds <= 1) {
        clearInterval(interval);
      }
      setGrowSeconds((growSeconds) => growSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <LeftPanel>
        <div className={s.activeCooking}>
          <div className={s.activeCookingText}>
            <span>{userRecipe.recipe.name}</span> сейчас в процессе
            <br />
            приготовления, он будет готов через:
          </div>
          <div className={s.activeCookingTime}>
            {secondToTimeString(growSeconds)} мин
          </div>
        </div>
      </LeftPanel>
      <RightPanel>
        <>
          <Card
            name={userRecipe.recipe.name}
            image={userRecipe.recipe.image}
            description={userRecipe.recipe.description}
            experience={userRecipe.recipe.experience}
            growingTime={userRecipe.recipe.cooking_time}
            ingredients={userRecipe.recipe.recipe_plants}
          />
          <Button disabled={true}>Приготовить</Button>
        </>
      </RightPanel>
    </>
  );
};

export const Cook = () => {
  const userRecipes = useStore($userRecipes);
  const crops = useStore($crops);
  const [activeUserRecipe, setActiveuserRecipe] = useState<TUserRecipe>(
    userRecipes[0]
  );
  const [cookingRecipe, setCookingRecipe] = useState<TUserRecipe>();

  useEffect(() => {
    setActiveuserRecipe(activeUserRecipe || userRecipes[0]);
    const recipeInCooking = userRecipes.find(
      (user_recipe) => user_recipe.stage == "cooking"
    );
    setCookingRecipe(recipeInCooking);
  }, [userRecipes]);

  const handleClick = (userRecipe: TUserRecipe) => {
    cookRecipeFx({ user_recipe_id: userRecipe.id });
  };

  const isActive = () => {
    return activeUserRecipe.recipe.recipe_plants.some((recipePlant) => {
      return (
        recipePlant.count <=
        crops.find((crop) => crop.plant.id == recipePlant.plant.id)!.count
      );
    });
  };

  if (cookingRecipe) {
    return <ActiveCookingRecipe userRecipe={cookingRecipe} />;
  }

  return (
    <>
      <LeftPanel>
        {userRecipes.map((userRecipe) => (
          <MiniCard
            active={userRecipe.id == activeUserRecipe.id}
            image={userRecipe.recipe.image}
            onClick={() => setActiveuserRecipe(userRecipe)}
            key={`user-recipe-${userRecipe.id}`}
          />
        ))}
      </LeftPanel>
      <RightPanel>
        {activeUserRecipe && (
          <>
            <Card
              name={activeUserRecipe.recipe.name}
              image={activeUserRecipe.recipe.image}
              description={activeUserRecipe.recipe.description}
              experience={activeUserRecipe.recipe.experience}
              growingTime={activeUserRecipe.recipe.cooking_time}
              ingredients={activeUserRecipe.recipe.recipe_plants}
            />
            <Button
              onClick={() => {
                handleClick(activeUserRecipe);
              }}
              disabled={!isActive()}
            >
              Приготовить
            </Button>
          </>
        )}
      </RightPanel>
    </>
  );
};
