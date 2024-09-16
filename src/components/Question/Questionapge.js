import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';

function QuestionPage({items}) {
    const [activeIndex, setActiveIndex] = useState(null);
    const contentRefs = useRef([]);

    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  return (
    <div className="w-[600px]">
      <div className='flex flex-col justify-center items-center mb-[50px]'>
        <h1 className='font-medium text-5xl'>FAQs</h1>
        <p className='font-medium text-gray-600 text-xl'>Get answers of your queries</p>
      </div>
      {items.map((item, index) => (
        <div key={index} className="">
          <button
            className="w-full text-left py-4 px-6 focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between items-center hover:underline">
              <span className="font-medium">{item.title}</span>
              <span>{activeIndex === index ? <ChevronUp/> : <ChevronDown/>}</span>
            </div>
          </button>
          <div
            ref={(el) => (contentRefs.current[index] = el)}
            style={{
              maxHeight: activeIndex === index ? `${contentRefs.current[index].scrollHeight}px` : '0',
            }}
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
          >
            <div className="px-6 py-4 font-medium">
              <p>{item.content}</p>
            </div>
          </div>
          <div className='h-[1.5px] rounded ml-6 bg-gray-200 w-[560px]'></div>
        </div>
      ))}
    </div>
  )
}

export default QuestionPage