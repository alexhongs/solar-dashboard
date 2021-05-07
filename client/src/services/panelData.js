export default class PanelData {
  constructor() {
    this.data = {};
  }

  compareMoneySaved() {
    const mid = Math.ceil(this.data.length / 2);
    const firstHalf = this.data.splice(0, mid);
    const secondHalf = this.data.splice(-mid);
    const firstHalfSum = firstHalf.reduce((a, b) => a + (b.money || 0), 0);
    const secondHalfSum = secondHalf.reduce((a, b) => a + (b.money || 0), 0);

    return secondHalfSum - firstHalfSum;
  }
}
