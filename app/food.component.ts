import { Component } from 'angular2/core';
import { Food } from './food.model';

@Component({
  selector: 'food-display',
  inputs: ['foods'],
  template: `
    <div>
      <p class="css-food">{{ food.description }} | {{ food.details }} | {{ food.calories}} | {{food.id}}</p>
    </div>
  `
})

export class FoodComponent {
  public food: Food;
}
