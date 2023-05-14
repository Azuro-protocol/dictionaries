const { getMarketKey, getMarketName, getMarketDescription, getSelectionName } = require('./lib')


const result = [
  getMarketKey(1) === '9-1-1',
  getMarketName({ outcomeId: 1 }) === 'Both Teams To Score',
  getMarketDescription({ outcomeId: 1 }) === 'A market where you predict whether or not both teams will score at least one goal in the game. You can bet on «yes» if you think that both teams will score or «no» if you think that one of the teams will not score.',
  getSelectionName({ outcomeId: 1 }) === 'Yes',
  getSelectionName({ outcomeId: 4, withPoint: true }) === 'Team 2 (4.5)',
]

if (result.every(Boolean)) {
  console.log('Success!')
}
else {
  console.error('Failed!')
  console.log('Output:', result)
  process.exit(1)
}
