import React from 'react'
import QuestionPage from "./Questionapge"

function Question() {
    const accordionItems = [
        {
          title: 'Who can make profile?',
          content: 'Anyone students and teachers.',
        },
        {
          title: 'Who will be our  mentor? They all are from same college?',
          content: 'Anyone with good expertise in their field and they can be from any where.',
        },
        {
          title: 'How AI is useful in this?',
          content: 'Using recommend search.',
        },
      ];
  return (
    <div>
      <div className="flex items-center justify-center mt-[100px]">
      <QuestionPage items={accordionItems} />
    </div>
    </div>
  )
}

export default Question
