import React from 'react'

function FirstSection() {
  return (
    <>
      <div className='flex md:flex-row flex-col-reverse m:justify-between md:py-10 py-5 gap-5'>
        <div className="description md:pt-20 basis-1/2 relative">
            <h1 className='md:text-3xl font-bold text-xl'>Test Your Knowledge with Engaging MCQs!</h1>
            <p className='md:text-2xl text-xl md:mt-5 mt-2 md:w-[600px] md:tracking-wide'>Sharpen your mind with our curated collection of multiple-choice questions covering a wide range of General Knowledge topics — from history and science to current affairs, geography, and more. Whether you're preparing for a competitive exam or just love learning new facts, our MCQs are designed to educate, challenge, and entertain. Start quizzing and boost your brainpower today!</p>
            <button className=' w-full my-5 md:w-1/2 font-bold md:text-2xl md:absolute md:bottom-0 py-4 px-10 rounded-md shadow-md cursor-pointer bg-green-700 text-white hover:bg-green-400 hover:text-black transition-all duration-700 ease-in-out hover:w-full'>Get In Touch</button>
        </div>
        <div className="Image basis-1/2">
            <img className=' md:h-[350px] md:shadow-2xl rounded-md md:w-[700px]' src="/general-knowledge.jpg" alt="" />
        </div>
      </div>
    </>
  )
}

export default FirstSection
