export default function() {

  // transition from index to add new game
  this.transition(
    this.fromRoute('index'),
    this.toRoute('game'),
    this.use('explode', {
      pick: 'button.md-fab',
      use: 'crossFade'
    }, {
      use: 'toLeft'
    })
  );

  // reverse of add new game to index
  this.transition(
    this.fromRoute('game'),
    this.toRoute('index'),
    this.use('explode', {
      pick: 'button.md-fab',
      use: 'crossFade'
    }, {
      use: 'toRight'
    })
  );
}
