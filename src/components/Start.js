import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner';
import { Box, Cable, ChevronRight, File, FolderUp, Gem, MoveDownRight, Shapes, Triangle, User } from 'lucide-react';
import Navbar from "./Navbar"
import { Link } from 'react-router-dom';
import { PowerIcon } from 'lucide-react';
import Startnav from './Startnav';
import Profile from "./profile.png"
import Landing1 from "./Untitled.png"
import landing4 from "./landing 4.png"
import axios from 'axios';
import Question from './Question';
const Start=()=> {
    const navigate=useNavigate();
    const token= localStorage.getItem('token')
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
      const fetchProfile = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/auth/profile', {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
              });
              setUser(response.data);
          } catch (err) {
              setError('Failed to fetch profile.');
              console.log(err);
          } finally {
              setLoading(false);
          }
      };

      if (localStorage.getItem('token')) {
          fetchProfile();
      } else {
          setLoading(false);
      }
  }, []);
    /*
    const changeScreen=()=>{
    const token=localStorage.getItem('token')
    if(token){
        setTimeout(()=>{
            navigate('/dashboard')
        },2000);
    }else{
        setTimeout(()=>{
            navigate('/login')
        },2000)
    }
    }

    useEffect(()=>{
        changeScreen();
    },[])*/
  
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#5b23d7] text-white justify-between">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Triangle className="mr-2" size={20} />
          <span className="text-xl font-bold">Mechub</span>
        </Link>
        <nav className="ml-10 flex gap-4 sm:gap-12">
          <Link href="#" className="text-sm flex gap-2 justify-center items-center font-medium hover:underline underline-offset-4" prefetch={false}>
            <Gem size={16}/>Features
          </Link>
          <Link href="#" className="text-sm flex gap-2 font-medium justify-center items-center hover:underline underline-offset-4" prefetch={false}>
            <Box size={16}/>How it Works
          </Link>
          <Link href="#" className="text-sm flex gap-2 justify-center items-center font-medium hover:underline underline-offset-4" prefetch={false}>
            <Cable size={16}/>Contact
          </Link>
          
        </nav>
        <div className=''>
        {
          localStorage.getItem('token')?(
                <div>
                <button  className=' '>Welcome back, {user?.name}</button>
                </div>                
            ):(
                <div>
                <button onClick={()=>navigate('/login')} className='bg-[#5b23d7] border-[#5b23d7] pt-3 pb-3 text-sm pl-8 pr-8 rounded-lg text-white font-medium border-[2px] hover:text-[#5b23d7] hover:bg-white'>Signin</button>
                <button onClick={()=>navigate('/register')} className='pt-3 pb-3 pl-7 text-sm pr-7 rounded-lg font-medium border-[2px] border-[#5b23d7] text-[#5b23d7] ml-6 mr-6 hover:bg-[#5b23d7] hover:text-white'>Signup</button>
                </div>
            )
        }
      </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 mt-[100px] lg:py-30 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-12">
              <div className="flex flex-col justify-center items-center">
              <div className='h-2 w-2 relative  animate-ping  flex items-center justify-center mb-2' >
                  <Triangle className='text-[#5b23d7] p-1 absolute animate-spin font-bold mb-2' size={18}/>
              </div>
                <div className="w-[900px]">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-4">
                    Unleash Your Mechanical Genius with <span className='text-[#5b23d7]'>Mechub</span>
                  </h1>
                  <p className=" text-muted-foreground md:text-xl mb-4 font-medium text-gray-600">
                    Mechub is a platform for mechanical students and engineers to showcase their designs, projects, and
                    files. Share your work, collaborate with others, and inspire the next generation of mechanical
                    innovators.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  {token?<a
                    href="/dashboard"
                    className="bg-[#5b23d7] hover:bg-white hover:text-[#5b23d7] border-[1px] border-[#5b23d7] shadow-lg text-white h-10 rounded-md w-[150px] flex justify-center items-center"
                    
                  >
                    Dashbaord
                  </a>:<Link
                    href="#"
                    className="bg-[#5b23d7] hover:bg-white hover:text-[#5b23d7] border-[1px] border-[#5b23d7] shadow-lg text-white h-10 rounded-md w-[150px] flex justify-center items-center"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>}
                  <Link
                    href="#"
                    className="bg-white shadow-lg border-[1px] h-10 rounded-md w-[150px] flex justify-center items-center"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Features That Empower Mechanical Innovators
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-600">
                  Mechub offers a suite of features designed to help mechanical students and engineers showcase their
                  work, collaborate with others, and grow their professional network.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold flex gap-2 items-center"><User size={20} className='text-[#5b23d7]'/>User Profiles</h3>
                      <p className="text-muted-foreground">
                        Create a personalized profile to showcase your mechanical projects, designs, and expertise.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold flex gap-2 items-center"><File size={20} className='text-[#5b23d7]'/>File Uploads</h3>
                      <p className="text-muted-foreground">
                        Upload and share your mechanical files, including CAD designs, 3D models, and technical
                        documentation.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold flex gap-2 items-center"><Shapes size={20} className='text-[#5b23d7]'/>Collaboration Tools</h3>
                      <p className="text-muted-foreground">
                        Collaborate with peers, instructors, and industry professionals on mechanical projects and
                        designs.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
              <img
                src={Profile}
                alt="Image"
                className=" border-[1px] rounded shadow-lg h-[200px]"
              />
              <img src={landing4} className=" border-[1px] h-[200px] ml-[150px] mt-4 rounded shadow-lg"></img>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How Mechub Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-600">
                  Mechub is designed to be intuitive and easy to use, so you can focus on showcasing your mechanical
                  expertise.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold flex gap-2 items-center"><MoveDownRight size={20} className='text-[#5b23d7]'/>Sign Up</h3>
                      <p className="text-muted-foreground">
                        Create your Mechub account and start building your professional profile.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold flex items-center gap-2"><FolderUp size={20} className='text-[#5b23d7]'/>Upload Your Work</h3>
                      <p className="text-muted-foreground">
                        Share your mechanical designs, projects, and files with the Mechub community.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold flex gap-2 items-center"><Shapes size={20} className='text-[#5b23d7]'/>Collaborate and Grow</h3>
                      <p className="text-muted-foreground">
                        Engage with other mechanical enthusiasts, get feedback, and build your professional network.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                src={Landing1}
                width="550"
                height="310"
                alt="Image"
                className=" rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Client Feedback</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-600">
                  Check out what our clients have to say about Mechub!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <div className="bg-zinc-100 h-[300px] shadow-lg rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 border bg-[#5b23d7] text-white flex justify-center items-center rounded-lg">
                    <User size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Pankaj Kumar Singh</h4>
                    <p className="text-sm text-muted-foreground">Mechanical Engineer</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Mechub has been a game-changer for my mechanical engineering career. The platform has allowed me to
                  showcase my work, collaborate with peers, and connect with industry professionals. Highly
                  recommended!"
                </p>
              </div>
              <div className="bg-zinc-100 h-[300px] shadow-lg rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border bg-[#5b23d7] text-white flex justify-center items-center rounded-lg">
                    <User size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Ashish Kumar</h4>
                    <p className="text-sm text-muted-foreground">Mechanical Designer</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I've been using Mechub for the past year, and it has been an invaluable tool for my mechanical design
                  work. The platform's user-friendly interface and collaboration features have made it easy to share my
                  projects and get feedback from the community."
                </p>
              </div>
              <div className="bg-zinc-100 h-[300px] shadow-lg rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 border bg-[#5b23d7] text-white flex justify-center items-center rounded-lg">
                    <User size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Ravi Kumar</h4>
                    <p className="text-sm text-muted-foreground">Mechanical Technician</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a mechanical technician, I've found Mechub to be an invaluable resource for staying up-to-date
                  with the latest trends and technologies in the field. The platform's educational content and community
                  discussions have helped me improve my skills and stay competitive in the job market."
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className='mb-[200px]'>
        <Question/>
        </div>
        <section className="w-full bg-[#5b23d7] py-12 md:py-24 lg:py-20 bg-muted text-white rounded-t-xl">
          <div className="container flex  flex-col items-center text-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join the Mechub Community</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and start showcasing your mechanical expertise to the world.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="#"
                className="inline-flex h-10 items-center bg-white text-[#5b23d7] justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#5b23d7] text-white">
        <p className="text-xs text-muted-foreground">&copy; 2024 Mechub. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}



export default Start
