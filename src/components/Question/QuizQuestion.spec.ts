// Question.spec.ts
import { mount } from '@vue/test-utils';
import Question from './QuizQuestion.vue';

describe('QuizQuestion.vue', () => {
  it('renders question and answers correctly', () => {
    const question = {
      question: 'What is the capital of France?',
      correct_answer: 'Paris',
      incorrect_answers: ['Berlin', 'Madrid', 'Rome'],
    };

    const wrapper = mount(Question, {
      props: {
        question,
        questionIndex: 0,
        totalQuestions: 1,
      },
    });

    expect(wrapper.text()).toContain('1. What is the capital of France?');
    expect(wrapper.text()).toContain('Paris');
    expect(wrapper.text()).toContain('Berlin');
    expect(wrapper.text()).toContain('Madrid');
    expect(wrapper.text()).toContain('Rome');
  });

  it('emits answerSelected event when an answer is selected', async () => {
    const question = {
      question: 'What is the capital of France?',
      correct_answer: 'Paris',
      incorrect_answers: ['Berlin', 'Madrid', 'Rome'],
    };

    const wrapper = mount(Question, {
      props: {
        question,
        questionIndex: 0,
        totalQuestions: 1,
      },
    });

    // Find the radio button corresponding to the correct answer
    const correctAnswerIndex = wrapper.findAll('input[type="radio"]').findIndex(input => input.element.value === 'Paris');
    await wrapper.findAll('input[type="radio"]')[correctAnswerIndex].setValue();

    expect(wrapper.emitted().answerSelected).toBeTruthy();
    expect(wrapper.emitted().answerSelected[0]).toEqual([{ questionIndex: 0, answer: 'Paris' }]);
  });
});