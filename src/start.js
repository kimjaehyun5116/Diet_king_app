// 사용자 입력 가져오기 및 결과 계산 및 출력
function calculateResults() {
  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const height = parseInt(document.getElementById("height").value);
  const weight = parseInt(document.getElementById("weight").value);
  const activityLevel = document.getElementById("activityLevel").value;
  const goal = document.getElementById("goal").value;
  const mealsPerDay = parseInt(document.getElementById("mealsPerDay").value);

  // 기초 대사량(BMR) 계산
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // 활동 대사량 계산
  let activityFactor;
  switch (activityLevel) {
    case "low":
      activityFactor = 1.2;
      break;
    case "moderate":
      activityFactor = 1.55;
      break;
    case "high":
      activityFactor = 1.9;
      break;
    default:
      activityFactor = 1.2;
      break;
  }

  // 일일 필요 칼로리 계산
  let dailyCalories;
  switch (goal) {
    case "diet":
      dailyCalories = bmr * activityFactor * 0.8;
      break;
    case "maintenance":
      dailyCalories = bmr * activityFactor;
      break;
    case "bulk":
      dailyCalories = bmr * activityFactor * 1.2;
      break;
    default:
      dailyCalories = bmr * activityFactor;
      break;
  }

  // 목표에 따른 일일 필요 영양소 계산
  let dailyProtein, dailyFat, dailyCarbs;
  switch (goal) {
    case "diet":
      dailyProtein = weight * 2.0; // 다이어트 시 단백질 섭취 증가
      dailyFat = (dailyCalories * 0.25) / 9;
      dailyCarbs = (dailyCalories - dailyProtein * 4 - dailyFat * 9) / 4;
      break;
    case "maintenance":
      dailyProtein = weight * 1.5; // 유지 시 기본 단백질 섭취량
      dailyFat = (dailyCalories * 0.25) / 9;
      dailyCarbs = (dailyCalories - dailyProtein * 4 - dailyFat * 9) / 4;
      break;
    case "bulk":
      dailyProtein = weight * 1.5; // 벌크업 시 기본 단백질 섭취량
      dailyFat = (dailyCalories * 0.3) / 9; // 벌크업 시 지방 섭취 증가
      dailyCarbs = (dailyCalories - dailyProtein * 4 - dailyFat * 9) / 4;
      break;
    default:
      dailyProtein = weight * 1.5;
      dailyFat = (dailyCalories * 0.25) / 9;
      dailyCarbs = (dailyCalories - dailyProtein * 4 - dailyFat * 9) / 4;
      break;
  }

  // 결과 출력
  document.getElementById("bmr").textContent = bmr.toFixed(2);
  document.getElementById("dailyCalories").textContent =
    dailyCalories.toFixed(2);
  document.getElementById("dailyProtein").textContent = dailyProtein.toFixed(2);
  document.getElementById("dailyCarbs").textContent = dailyCarbs.toFixed(2);
  document.getElementById("dailyFat").textContent = dailyFat.toFixed(2);

  // 식단표 생성
  generateMealPlan(7, mealsPerDay, dailyCarbs, dailyProtein, dailyFat);
}

// 식단표 생성 함수
function generateMealPlan(
  numDays,
  mealsPerDay,
  dailyCarbs,
  dailyProtein,
  dailyFat
) {
  const mealPlanContainer = document.getElementById("mealPlan");
  mealPlanContainer.innerHTML = "";

  const mealNames = [
    "1 Meal",
    "2 Meal",
    "3 Meal",
    "4 Meal",
    "5 Meal",
    "6 Meal",
  ];

  for (let day = 1; day <= numDays; day++) {
    // 각 날짜별 박스 생성
    const dayBox = document.createElement("div");
    dayBox.classList.add("day-box");

    // 날짜 제목 추가
    const dayHeading = document.createElement("h3");
    dayHeading.textContent = `Day ${day}`;
    dayBox.appendChild(dayHeading);

    // 각 식사별 박스 생성
    for (let mealIndex = 0; mealIndex < mealsPerDay; mealIndex++) {
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("meal");

      const mealTitle = document.createElement("h4");
      mealTitle.textContent = mealNames[mealIndex];
      mealDiv.appendChild(mealTitle);

      const foodList = document.createElement("ul");

      // 각 식사별 필요한 음식 종류 선택
      let carbFood = getRandomFoodWithNutrient("carbs");
      let proteinFood = getRandomFoodWithNutrient("protein");
      let fatFood = getRandomFoodWithNutrient("fat");

      // 각 식사별 음식 추가
      addFoodToList(carbFood, "Carbs", dailyCarbs / mealsPerDay, foodList);
      addFoodToList(
        proteinFood,
        "Protein",
        dailyProtein / mealsPerDay,
        foodList
      );
      addFoodToList(fatFood, "Fat", dailyFat / mealsPerDay, foodList);

      mealDiv.appendChild(foodList);
      dayBox.appendChild(mealDiv);
    }

    mealPlanContainer.appendChild(dayBox); // 날짜별 박스를 식단표 컨테이너에 추가
  }
}

// 필요한 영양소를 기준으로 랜덤으로 음식 선택 함수
function getRandomFoodWithNutrient(nutrientType) {
  let foodsInCategory;

  switch (nutrientType) {
    case "carbs":
      foodsInCategory = foodData.carbs;
      break;
    case "protein":
      foodsInCategory = foodData.protein;
      break;
    case "fat":
      foodsInCategory = foodData.fat;
      break;
    default:
      console.error(`Unsupported nutrient type: ${nutrientType}`);
      return null;
  }

  if (foodsInCategory.length === 0) {
    console.error(`${nutrientType}에 해당하는 음식이 없습니다.`);
    return null;
  }

  let randomFood =
    foodsInCategory[Math.floor(Math.random() * foodsInCategory.length)];
  recordSelectedFood(randomFood); // recordSelectedFood 함수 호출

  console.log(`Random food for ${nutrientType}:`, randomFood);

  return randomFood;
}

// recordSelectedFood 함수 정의
function recordSelectedFood(food) {
  // 여기에 선택된 음식을 기록하는 로직을 추가하세요.
  console.log("Selected food:", food);
}

// 음식을 리스트에 추가하는 함수
function addFoodToList(food, category, requiredAmount, listElement) {
  if (food) {
    // 음식이 유효한 경우에만 추가
    const listItem = document.createElement("li");

    let nutrientAmount;
    switch (category) {
      case "Carbs":
        nutrientAmount = food.carbs;
        break;
      case "Protein":
        nutrientAmount = food.protein;
        break;
      case "Fat":
        nutrientAmount = food.fat;
        break;
      default:
        nutrientAmount = 0;
        break;
    }

    if (nutrientAmount !== undefined) {
      let amountPerMeal;
      if (category === "Fat") {
        // 지방의 경우 고정된 섭취량으로 설정
        amountPerMeal = requiredAmount;
        listItem.textContent = `${food.name} (25 g)`; // 고정된 섭취량 표시
      } else {
        // 다른 영양소는 필요한 섭취량을 계산하여 표시
        amountPerMeal = (requiredAmount * 100) / nutrientAmount;
        listItem.textContent = `${food.name} (${amountPerMeal.toFixed(2)} g)`;
      }
    } else {
      listItem.textContent = `${food.name} (정보 없음)`;
    }

    listElement.appendChild(listItem);
  }
}
