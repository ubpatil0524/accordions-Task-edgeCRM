import React, { useState } from 'react';
import './App.css';

const initialQuestions = [
  { id: 'q1-1', text: 'Question 1.1', answer: 'no' },
  { id: 'q1-2', text: 'Question 1.2', answer: 'no' },
  { id: 'q1-3', text: 'Question 1.3', answer: 'no' },
  { id: 'q1-4', text: 'Question 1.4', answer: 'no' },
  { id: 'q1-5', text: 'Question 1.5', answer: 'no' },
  { id: 'q1-6', text: 'Question 1.6', answer: 'no' },
];

const initialAccordions = [
  { id: 1, questions: initialQuestions, editable: true, open: true, buttonStyle: '' },
  { id: 2, questions: initialQuestions.map(q => ({ ...q, answer: 'no' })), editable: false, open: false, buttonStyle: '' },
  { id: 3, questions: initialQuestions.map(q => ({ ...q, answer: 'no' })), editable: false, open: false, buttonStyle: '' },
  { id: 4, questions: initialQuestions.map(q => ({ ...q, answer: 'no' })), editable: false, open: false, buttonStyle: '' },
];

const App = () => {
  const [accordions, setAccordions] = useState(initialAccordions);

  const handleRadioChange = (accordionId, questionId, answer) => {
    setAccordions(prevAccordions =>
      prevAccordions.map(acc => {
        if (acc.id === accordionId) {
          return {
            ...acc,
            questions: acc.questions.map(q =>
              q.id === questionId ? { ...q, answer } : q
            ),
          };
        }
        return acc;
      })
    );
  };

  const handleSave = accordionId => {
    const currentAccordionIndex = accordions.findIndex(acc => acc.id === accordionId);
    const currentAccordion = accordions[currentAccordionIndex];
    const allYesOrNA = currentAccordion.questions.every(
      q => q.answer === 'yes' || q.answer === 'na'
    );
  
    if (!allYesOrNA) {
      alert("Please select 'Yes' or 'N/A' for all previous questions before saving.");
      return;
    }
  
    setAccordions(prevAccordions =>
      prevAccordions.map((acc, index) => {
        if (index === currentAccordionIndex + 1 && prevAccordions[index]) {
          return { ...acc, editable: true };
        } else {
          return acc;
        }
      })
    );
  };
  
  
  const handleCancel = accordionId => {
    setAccordions(prevAccordions =>
      prevAccordions.map(acc => {
        if (acc.id === accordionId) {
          return {
            ...acc,
            questions: acc.questions.map(q => ({ ...q, answer: 'no' })),
            editable: false,
          };
        }
        return acc;
      })
    );
  };
  

  const toggleAccordion = accordionId => {
    setAccordions(prevAccordions =>
      prevAccordions.map(acc => {
        if (acc.id === accordionId) {
          return { ...acc, open: !acc.open };
        }
        return acc;
      })
    );
  };

  return (
    <div className="accordion-container">
      {accordions.map(accordion => (
        <div key={accordion.id} className="accordion-item">
          <button className="accordion-header" onClick={() => toggleAccordion(accordion.id)}>
            Accordion {accordion.id}
            <span className={`arrow ${accordion.open ? 'down' : 'up'}`}></span>
          </button>
          <div className={`accordion-content ${accordion.open ? 'open' : ''}`}>
            <form>
              {accordion.questions.map(question => (
                <div className="question" key={question.id}>
                  <p>{question.text}</p>
                  <label className={`radio-button ${question.answer === 'yes' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name={question.id}
                      value="yes"
                      disabled={!accordion.editable}
                      checked={question.answer === 'yes'}
                      onChange={() => handleRadioChange(accordion.id, question.id, 'yes')}
                    />
                    Yes
                  </label>
                  <label className={`radio-button ${question.answer === 'no' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name={question.id}
                      value="no"
                      disabled={!accordion.editable}
                      checked={question.answer === 'no'}
                      onChange={() => handleRadioChange(accordion.id, question.id, 'no')}
                    />
                    No
                  </label>
                  <label className={`radio-button ${question.answer === 'na' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name={question.id}
                      value="na"
                      disabled={!accordion.editable}
                      checked={question.answer === 'na'}
                      onChange={() => handleRadioChange(accordion.id, question.id, 'na')}
                    />
                    N/A
                  </label>
                </div>
              ))}
              {accordion.editable && (
                <div className="buttons">
                  <button type="button" onClick={() => handleSave(accordion.id)}>
                    Save
                  </button>
                  <button type="button" onClick={() => handleCancel(accordion.id)}>
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
