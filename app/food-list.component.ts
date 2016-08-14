import { Component, EventEmitter } from 'angular2/core';
import { Food } from './food.model';
import { FoodComponent } from './food.component';
import { AddFoodComponent } from './add-food.component';
import { EditFoodComponent } from './edit-food.component';
import { CaloriePipe } from './calories.pipe';

@Component({
  selector: 'food-list',
  inputs: ['foods'],

  directives: [FoodComponent, AddFoodComponent, EditFoodComponent],
  pipes: [CaloriePipe],
  template: `
    <div class="">
      <add-food (onSubmit)="createFood($event)" ></add-food>
    </div>
    <div class="">
      <form class="form-inline my-form">
        <h4>Filter Options</h4>
        <label for="calorie-category">Filter by Calorie Type</label>
        <select (change)="onOperandChange($event.target.value)">
          <option value="all">Show All</option>
          <option value="less">Show Low Calorie Foods</option>
          <option value="greater">Show Hig Calorie Foods</option>
        </select>
        <label for="calorie-amount">Number of Calories</label>
        <select (change)="onCalorieChange($event.target.value)" id="calorie-amount">
          <option value="100">100 Calories</option>
          <option value="200">200 Calories</option>
          <option value="300">300 Calories</option>
          <option value="400">400 Calories</option>
          <option value="500" selected>500 Calories</option>
          <option value="600">600 Calories</option>
          <option value="700">700 Calories</option>
        </select>
      </form>
    </div>
    <div class="">
      <h4>Foods Added</h4>
      <h4>Total calories for displayed foods = {{ countCalories(foods | calorie: calorieLevelProperty: calorieOperandProperty) }}</h4>
      <food-display *ngFor="#currentFood of foods | calorie: calorieLevelProperty: calorieOperandProperty" [food]="currentFood" (click)="foodClicked(currentFood)" ></food-display>
    </div>
    <edit-food *ngIf="selectedFood" [food]="selectedFood"></edit-food>
  `
})
export class FoodListComponent {
  public foods: Food[];
  public selectedFood: Food;

  public calorieLevelProperty: number = 500;
  public calorieOperandProperty: string = "all";

  constructor(){

  }

  foodClicked(clickedFood: Food) {
    this.selectedFood = clickedFood;
  }

  createFood(args: [string, string, number]) {
    this.foods.push(
      new Food(args[0], args[1], args[2], this.foods.length)
    );
  }

  onOperandChange(filterOption: string) {
    this.calorieOperandProperty = filterOption;
    console.log(this.calorieLevelProperty);
  }

  onCalorieChange(filterOption) {
    this.calorieLevelProperty = parseInt(filterOption);
  }

  countCalories(foods: Food[]) {
    var totalCalories: number = 0;
    foods.forEach(function(item) {
      totalCalories += item.calories;
    })
    return totalCalories;
  }
}
