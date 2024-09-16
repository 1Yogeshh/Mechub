import React from 'react';
import QuestionPage from "../Question/Questionapge";

function Question() {
  const accordionItems = [
    {
      title: 'Who can create a profile?',
      content: 'Both students and professionals.',
    },
    {
      title: 'What file formats are supported?',
      content: 'Popular formats like STL, DWG, and STEP.',
    },
    {
      title: 'Is MecHub free?',
      content: 'We offer both free and premium plans.',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center mt-[100px]">
        <QuestionPage items={accordionItems} />
      </div>
    </div>
  );
}

export default Question;
