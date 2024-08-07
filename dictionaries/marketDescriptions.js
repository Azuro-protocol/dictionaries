// ATTN please respect the grouping!
// Key: 'marketId-gamePeriodId-gameTypeId[-teamPlayerId]'
module.exports = {
  // Main
  '1-1-1': 'You predict the result of a match at the end of regular play. Bets can be placed by either selecting a Team 1 Win, a Draw or a Team 2 Win',
  '2-1-1': 'A market that allows you to cover two of the three possible outcomes in a game with one bet. It is similar to full time result betting but effectively you back two outcomes in 1 bet.',
  '3-1-1': 'Will Team 1 beat Team 2 in the number of goals adjusted for handicap for regular time?',
  '4-1-1': 'Will the total goals by both teams be over or under the predicted score for regular time?',
  '9-1-1': 'A market where you predict whether or not both teams will score at least one goal in the game. You can bet on «yes» if you think that both teams will score or «no» if you think that one of the teams will not score.',
  '19-1-1': 'You have to predict who will win in the match, in case of draw you will get the refund',

  '9-76-83': 'Who will score the first run in the match?',
  '25-1-1': 'You have to predict who will score next goal of the match?',
  '26-1-70': 'You have to predict who will win in the match and will both teams to score?',
  '27-1-70': 'You have to predict whether or not both teams will score at least one goal in the game and will the total goals by both teams be over or under the predicted score for regular time?',
  '18-1-1': 'Will Team 1 beat Team 2 in the number of goals adjusted for handicap?',
  '28-1-70': 'You have to predict the result of a match at the end of regular play and will the total goals by both teams be over or under the predicted score for regular time?',

  // Match winner
  '19-1-69': 'Which team will win the match?',
  '19-1-76': 'Which team will win the match?',
  '19-1-82': 'Which team will win the match?',
  '19-1-83': 'Which team will win the match?',
  '19-1-87': 'Which player will win the match?',
  '19-30-1': 'Which team will win the match?',
  '19-75-51': 'Which fighter will win? In the event of a draw, you will receive a refund.',
  '19-76-1': 'Which team will win the match including extra time and shootout?',
  '19-76-83': 'Which team will win the match?',

  '29-76-70': 'You have to predict who will win in the match and will the total count of runs be more or less than the forecasted score?',

  // Handicap
  '3-1-46': 'Will a certain team shoot more corner kicks adjusted for a handicap than the opponent in a match?',
  '3-1-54': 'Will the number of games adjusted for handicap played throughout the match exceed the stated number?',
  '3-1-69': 'Will Team 1 beat Team 2 in the number of maps adjusted for handicap?',
  '3-1-76': 'Will Team 1 beat Team 2 in the number of points adjusted for handicap?',
  '3-1-87': 'Will the number of sets adjusted for handicap played throughout the match exceed the stated number?',
  '3-76-1': 'Will Team 1 beat Team 2 in the number of goals adjusted for handicap for the whole match including OT?',
  '3-76-76': 'Will Team 1 beat Team 2 in the number of points adjusted for handicap for the whole match including OT?',
  '3-76-83': 'Will Team 1 beat Team 2 in the number of runs adjusted for handicap for the whole game?',

  // Total
  '4-1-46': 'Will the overall number of corner kicks in a match exceed the predetermined amount?',
  '4-1-54': 'How many games will it take to complete the match?',
  '4-1-60': 'Will the total kills by both teams be over or under the predicted score for all maps',
  '4-1-69': 'Will the total number of maps played be more or less than the forecasted score?',
  '4-1-76': 'Will the total points by both teams be over or under the predicted score for regular time?',
  '4-1-87': 'Will the total number of sets played be more or less than the forecasted score?',
  '4-76-1': 'Will the total goals by both teams be over or under the predicted score for the whole match including OT?',
  '4-76-76': 'Will the total points by both teams be over or under the predicted score for the whole match including OT?',
  '4-76-83': 'Will the total runs by both teams be over or under the predicted score for the whole game?',
  '4-76-102': 'Will the total number of hits plus runs plus errors only in the the match be more or less than the forecasted score?',

  // Team 1
  '7-1-1-1': 'Will the total amount of goals scored within a game by Team 1 exceed the specified number at the end of regulation time?',
  '7-1-54-1': 'How many games will Player 1 win?',
  '7-1-60-1': 'Will the total kills by first team be over or under the predicted score for all maps?',
  '7-76-1-1': 'Will the total amount of goals scored within a game by Team 1 exceed the specified number for the whole match including OT?',
  '7-76-76-1': 'Will the total points by 1st Team be over or under the predicted score for the whole match including OT?',
  '7-76-83-1': 'Will the total runs by 1st Team be over or under the predicted score for the whole game?',
  '16-1-1-1': 'Will team 1 to score at least one goal in the game?',

  // Team 2
  '7-1-1-2': 'Will the total amount of goals scored within a game by Team 2 exceed the specified number at the end of regulation time?',
  '7-1-54-2': 'How many games will Player 2 win?',
  '7-1-60-2': 'Will the total kills by second team be over or under the predicted score for all maps?',
  '7-76-1-2': 'Will the total amount of goals scored within a game by Team 2 exceed the specified number for the whole match including OT?',
  '7-76-76-2': 'Will the total points by 2nd Team be over or under the predicted score for the whole match including OT?',
  '7-76-83-2': 'Will the total runs by 2nd Team be over or under the predicted score for the whole game?',
  '16-1-1-2': 'Will team 2 to score at least one goal in the game?',

  // 1st Half
  '1-50-1': 'Which team will win the 1st half of the match?',
  '2-50-1': 'Which team will win the 1st half of the match or will there be a draw?',
  '3-50-76': 'Will Team 1 beat Team 2 in the number of points adjusted for handicap in the first half of the game?',
  '3-50-83': 'Will the number of runs that have been adjusted for the handicap be higher than the opposing team\'s in the 1st Half?',
  '4-50-76': 'Will the total points only in the first half of the match be more or less than the forecasted score?',
  '4-50-46': 'Will the overall number of corner kicks exceed the predetermined amount in the first half of the match?',
  '4-50-83': 'Will the total number of runs only in the first half of the match be more or less than the forecasted score?',
  '7-50-1-1': 'Will the total number of goals scored by Team 1 only in the first half of the match be more or less than the forecasted score?',
  '7-50-1-2': 'Will the total number of goals scored by Team 2 only in the first half of the match be more or less than the forecasted score?',
  '7-50-76-1': 'Will the total number of points scored by Team 1 only in the first half of the match be more or less than the forecasted score?',
  '7-50-76-2': 'Will the total number of points scored by Team 2 only in the first half of the match be more or less than the forecasted score?',
  '7-50-83-1': 'Will the total number of runs scored by Team 1 only in the first half of the match be more or less than the forecasted score?',
  '7-50-83-2': 'Will the total number of runs scored by Team 2 only in the first half of the match be more or less than the forecasted score?',
  '16-50-1-1': 'Will team 1 to score at least one goal in the 1st half of the game?',
  '16-50-1-2': 'Will team 2 to score at least one goal in the 1st half of the game?',
  '9-50-1': 'Will both teams score at least one goal in the first half of the game?',
  '11-50-1': 'Will any of the teams score at least one goal in the first half of the match?',
  '19-50-76': 'During 1st Half, which team will win?',

  '1-51-83': 'Which team will win the 1st Inning?',
  '3-51-83': 'Will the number of runs that have been adjusted for the handicap be higher than the opposing team\'s in the 1st Inning?',
  '4-51-83': 'Will the total number of runs only in the first Inning of the match be more or less than the forecasted score?',
  '19-53-76': 'During 1st Quarter, which team will win?',
  '4-53-76': 'Will the total points only in the first quarter of the match be more or less than the forecasted score?',

  // Map 1
  '3-78-60': 'Will the number of kills that have been adjusted for the handicap be higher than the opposing team\'s on this map?',
  '3-78-82': 'Will the amount of rounds adjusted for handicap in the 1nd map be more than that of the opposing team?',
  '4-78-60': 'Will the total kills by both teams be over or under the predicted score on this map',
  '4-78-82': 'Will the total number of rounds scored by both sides in the 1st map be more or less than the forecasted score?',
  '7-78-82-1': 'Will the total number of rounds scored by Team 1 in the 1st map be more or less than the forecasted score?',
  '7-78-82-2': 'Will the total number of rounds scored by Team 2 in the 1st map be more or less than the forecasted score?',
  '7-78-60-1': 'Will the total kills by first team be over or under the predicted score in this map?',
  '7-78-60-2': 'Will the total kills by second team be over or under the predicted score in this map?',
  '19-78-69': 'Which team will win the map?',
  '19-78-82': 'Which team will win the 1st map of the match?',
  '20-31-1': 'Which team will win the match?',
  '23-78-71': 'Will there be overtime in the 1st map?',
  '24-78-43': 'Which team will destroy the barrack first',
  '24-78-52': 'Which team will get the first kill',
  '24-78-81': 'Which team will slay the first Roshan',
  '24-78-95': 'Which team will destroy the tower first',

  // Map 2
  '3-140-60': 'Will the number of kills that have been adjusted for the handicap be higher than the opposing team\'s on this map?',
  '3-140-82': 'Will the amount of rounds adjusted for handicap in the 2nd map be more than that of the opposing team?',
  '4-140-60': 'Will the total kills by both teams be over or under the predicted score on this map',
  '4-140-82': 'Will the total number of rounds scored by both sides in the 2nd map be more or less than the forecasted score?',
  '7-140-82-1': 'Will the total number of rounds scored by Team 1 in the 2nd map be more or less than the forecasted score?',
  '7-140-82-2': 'Will the total number of rounds scored by Team 2 in the 2nd map be more or less than the forecasted score?',
  '7-140-60-1': 'Will the total kills by first team be over or under the predicted score in this map?',
  '7-140-60-2': 'Will the total kills by second team be over or under the predicted score in this map?',
  '19-140-69': 'Which team will win the map?',
  '19-140-82': 'Which team will win the 2nd map of the match?',
  '23-140-71': 'Will there be overtime in the 2nd map?',
  '24-140-43': 'Which team will destroy the barrack first',
  '24-140-52': 'Which team will get the first kill',
  '24-140-81': 'Which team will slay the first Roshan',
  '24-140-95': 'Which team will destroy the tower first',

  // Map 3
  '3-202-60': 'Will the number of kills that have been adjusted for the handicap be higher than the opposing team\'s on this map?',
  '3-202-82': 'Will the amount of rounds adjusted for handicap in the 3rd map be more than that of the opposing team?',
  '4-202-60': 'Will the total kills by both teams be over or under the predicted score on this map',
  '4-202-82': 'Will the total number of rounds scored by both sides in the 3rd map be more or less than the forecasted score?',
  '7-202-60-1': 'Will the total kills by first team be over or under the predicted score in this map?',
  '7-202-60-2': 'Will the total kills by second team be over or under the predicted score in this map?',
  '7-202-82-1': 'Will the total number of rounds scored by Team 1 in the 3rd map be more or less than the forecasted score?',
  '7-202-82-2': 'Will the total number of rounds scored by Team 2 in the 3rd map be more or less than the forecasted score?',
  '19-202-69': 'Which team will win the map?',
  '19-202-82': 'Which team will win the 3rd map of the match?',
  '21-32-1': 'Which team will win the match?',
  '23-202-71': 'Will there be overtime in the 3rd map?',
  '24-202-43': 'Which team will destroy the barrack first',
  '24-202-52': 'Which team will get the first kill',
  '24-202-81': 'Which team will slay the first Roshan',
  '24-202-95': 'Which team will destroy the tower first',

  // Map 4
  '19-264-69': 'Which team will win the map?',

  // Map 5
  '19-326-69': 'Which team will win the map?',

  // Other
  '3-1-60': 'Will the number of kills that have been adjusted for the handicap be higher than the opposing team\'s?',
  '16-1-69-1': 'Will Team 1 win at least in one map? If you bet on Yes you will win if Team 1 will win in 1 or more maps during the match.',
  '16-1-69-2': 'Will Team 2 win at least in one map? If you bet on Yes you will win if Team 2 will win in 1 or more maps during the match.',
  '19-54-54': 'Which player will win the first set?',
  '19-76-76': 'Which team will win the match?',
  '19-755-1': 'Choose which team will qualify for the next game in the tournament',
  '19-756-1': 'Choose which team will win the tournament',
  '19-757-1': 'Choose which team will take the 3rd Place',
}
