export default function() {
  // elapsed round clock
  this.transition(
    this.childOf('.round-elapsed-time'),
    this.use('toUp')
  );
}
