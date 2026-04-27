export default {
  categories: ['journey', 'food', 'shopping'],
  totalSteps: 3,

  form: {
    journey: {
      steps: [
        {
          types: ['car', 'bus', 'train', 'motorbike', 'plane']
        },
        {
          options: ['km', 'time']
        },
        {
          energy: ['fuel', 'electric', 'hydrogen', 'natural gaz', 'any']
        }
      ]
    },
    food: {
      steps: [
        {
          meals: ['fish', 'red meat', 'white meat', 'vegetarian', 'vegan']
        }
      ]
    },
    shopping: {
      steps: [
        {
          items: ['courses', 'fashion', 'tech', 'furniture']
        }
      ]
    }
  }
}