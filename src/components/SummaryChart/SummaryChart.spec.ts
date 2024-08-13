// SummaryChart.spec.ts
import { mount } from '@vue/test-utils';
import SummaryChart from './SummaryChart.vue';

// Mock vue-chartjs
vi.mock('vue-chartjs', () => ({
  Bar: {
    render: () => {},
    methods: {
      update: () => {},
    },
  },
}));

describe('SummaryChart.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(SummaryChart, {
      props: {
        correct: 3,
        incorrect: 2,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});