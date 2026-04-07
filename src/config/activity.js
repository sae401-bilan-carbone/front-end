export default {
  categories: ['journey', 'food', 'shopping'],
  totalSteps: 3,

  form: {
    journey: {
      steps: [
        {
          types: ['voiture', 'transport en commun', 'covoiturage']
        },
        {
          options: ['km', 'time']
        },
        {
          energy: ['carburant', 'électrique', 'gaz naturel']
        }
      ]
    },
    food: {
      steps: [
        {
          meals: ['végétarien', 'viande', 'poisson']
        }
      ]
    },
    buys: {
      steps: [
        {
          items: ['vêtements', 'electronique', 'courses']
        }
      ]
    }
  }
}