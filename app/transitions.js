export default function() {
  // transition from index to game and back
  this.transition(
    this.fromRoute('index'),
    this.toRoute('game'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  // elapsed time clock
  this.transition(
    this.childOf('.game-elapsed-time'),
    this.use('toUp')
  );
}
