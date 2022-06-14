import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,sadgashrb6324t5v264y',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback with no type', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,sadgashrb6324t5v264y',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with no comment', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,sadgashrb6324t5v264y',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'invalid-screenshot.png',
    })).rejects.toThrow();
  });
});