export default function() {

  this.transition(
    this.fromRoute('index'),
    this.toRoute('game'),
    this.useAndReverse('fade', { duration: 250 })
  );

  this.transition(
    this.matchSelector('.animated-time'),
    this.toValue(function(to, from) {
      return to < from;
    }),
    this.use('toUp')
  );
}
