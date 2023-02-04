import GetCostEstimate from './CostEstimate'

describe('when you pay as you go', () => {
    it('and the quantity is more than 0, then the cost is calculated successfully', () => {
        expect(GetCostEstimate(1, 2)).toBe(2);
    })
    it('and the quantity is 0, then the cost must be 0', () => {
        expect(GetCostEstimate(0, 2)).toBe(0);
    })
});
