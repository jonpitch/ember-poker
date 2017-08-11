export default {

  components: {
    'games-list': {
      title: 'Games',
      empty: 'No games'
    },
    'add-game': {
      title: 'Add a new Game',
      form: {
        name: 'Game Name',
        small: 'Small Blind',
        big: 'Big Blind',
        round: 'Round Time',
        ante: 'Ante',
        submit: 'Add Game'
      }
    },
    'game-dashboard': {
      round: 'Round {{round}}',
      play: 'Play',
      end: 'End Game',
      current: 'Current Blinds',
      blinds: '{{small}}/{{big}}',
      next: 'Up Next',
      noAnte: 'No Ante',
      ante: 'Ante: {{ante}}',
      clock: 'Game Clock',
      modal: {
        title: 'Are you sure?',
        description: 'You will not be able to resume this game',
        ok: 'OK',
        cancel: 'Cancel'
      }
    }
  }
};
